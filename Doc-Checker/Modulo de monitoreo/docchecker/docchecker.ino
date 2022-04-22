#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include "Protocentral_MAX30205.h"
#include <WiFi.h>
#include "ListLib.h"

typedef struct clientestruct{
  WiFiClient conexion;
  float *lecturasTemp;
  float *lecturasOx;
  float *lecturasFrec;
  int numLecturas;
  int lecturaActual;
  float promedioTemp;
  float promedioOx;
  float promedioFrec;
}cliente;

//------------------Servidor Web en puerto 80---------------------

WiFiServer server(80);

//---------------------Credenciales de WiFi-----------------------

//const char* ssid     = "Nam-wifi";
//const char* password = "holahola";
//const char* ssid     = "TP-Link_149C";
//const char* password = "Admin012";
const char* ssid     = "IZZI-3BD8";
const char* password = "9CC8FC753BD8";

//---------------------VARIABLES GLOBALES-------------------------
int contconexion = 0;

const int salida = 2;

List<cliente> clientes = List<cliente>();

////////////////////////////

MAX30205 tempSensor;

MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255

uint32_t irBuffer[100]; //infrared LED sensor data
uint32_t redBuffer[100];  //red LED sensor data

int32_t bufferLength; //data length
int32_t spo2; //SPO2 value
int8_t validSPO2; //indicator to show if the SPO2 calculation is valid
int32_t heartRate; //heart rate value
int8_t validHeartRate; //indicator to show if the heart rate calculation is valid

byte pulseLED = 11; //Must be on PWM pin
byte readLED = 13; //Blinks with each data read
float valoresLeidos[3];

void inicializarSensores();
void inicializarServidor();
void leerSensores(float valores[3]);
void leerPeticion(cliente *clt);
void agregar(cliente *clt, float valores[3]);
void calcularPromedios(cliente *clt);
float calcularPromedio(float *arreglo);
void enviarPromedio(cliente *clt);
void servidor(float valores[3]);

void setup() {
  Serial.begin(115200);
  inicializarSensores();
  inicializarServidor();
}

void loop() {
  leerSensores(valoresLeidos);
  servidor(valoresLeidos);
}

void servidor(float valores[3]){
  WiFiClient client = server.available();   // Escucha a los clientes entrantes
  if (client) {                             // Si se conecta un nuevo cliente
    Serial.println("New Client.");          //
    cliente c1;
    c1.numLecturas = 0;
    c1.lecturaActual=0;
    c1.promedioTemp = 0;
    c1.promedioOx = 0;
    c1.promedioFrec = 0;
    c1.conexion = client;
    clientes.Add(c1);
    leerPeticion(&clientes[clientes.Count()-1]);
    Serial.println("Tamanio de la lista:");
    Serial.println(clientes.Count());
    Serial.println("Tamanio de la lista:");
  }
  if(clientes.Count()>0){
    int i;
    for(i=0;i<clientes.Count();i++){
      agregar(&clientes[i],valores);
      if(!clientes[i].conexion.connected()){
        //Si el cliente no esta disponible se elimina del arreglo de clientes
        clientes.Remove(i);
        i-=1;
      }
    }
  }
}

void inicializarSensores(){
  Wire.begin();

  //scan for temperature in every 30 sec untill a sensor is found. Scan for both addresses 0x48 and 0x49
  while(!tempSensor.scanAvailableSensors()){
    Serial.println("Couldn't find the temperature sensor, please connect the sensor." );
    delay(30000);
  }

  tempSensor.begin();   // set continuos mode, active mode
  
  delay(500);
  
  pinMode(pulseLED, OUTPUT);
  pinMode(readLED, OUTPUT);

  // Initialize sensor
  //if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed, el mlx90614 no es compatible con  esta velocidad de 400kHz
  if (!particleSensor.begin(Wire)) //Use default I2C port, 100kHz speed
  {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    while (1);
  }

  byte ledBrightness = 60; //Options: 0=Off to 255=50mA
  byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; //Options: 69, 118, 215, 411
  int adcRange = 4096; //Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); //Configure sensor with these settings

  delay(500);
  bufferLength = 100; //buffer length of 100 stores 4 seconds of samples running at 25sps
  //read the first 100 samples, and determine the signal range
  for (byte i = 0 ; i < bufferLength ; i++)
  {
    while (particleSensor.available() == false) //do we have new data?
      particleSensor.check(); //Check the sensor for new data

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample
  }

  //calculate heart rate and SpO2 after first 100 samples (first 4 seconds of samples)
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
}

void inicializarServidor(){
  pinMode(salida, OUTPUT); 
  digitalWrite(salida, LOW);
  // Conexión WIFI
  WiFi.begin(ssid, password);
  //Cuenta hasta 50 si no se puede conectar lo cancela
  while (WiFi.status() != WL_CONNECTED and contconexion <50) { 
    ++contconexion;
    delay(500);
    Serial.print(".");
  }
  if (contconexion <50) {
      //para usar con ip fija
      //IPAddress ip(192,168,1,180); 
      //IPAddress gateway(192,168,1,1); 
      //IPAddress subnet(255,255,255,0); 
      //WiFi.config(ip, gateway, subnet); 
      Serial.println("");
      Serial.println("WiFi conectado");
      Serial.println(WiFi.localIP());
      server.begin(); // iniciamos el servidor
  } else { 
      Serial.println("");
      Serial.println("Error de conexion");
  }
}

void leerSensores(float valores[3]){
  valores[0] = 0; valores[1] = 0; valores[2] = 0;
  //Continuously taking samples from MAX30102.  Heart rate and SpO2 are calculated every 1 second
  int aux = millis();
  float temp = tempSensor.getTemperature(); // read temperature for every 100ms
  //delay(100);
  //delay(500);
  //dumping the first 25 sets of samples in the memory and shift the last 75 sets of samples to the top
  for (byte i = 25; i < 100; i++){
    redBuffer[i - 25] = redBuffer[i];
    irBuffer[i - 25] = irBuffer[i];
  }
  //take 25 sets of samples before calculating the heart rate.
  for (byte i = 75; i < 100; i++){
    while (particleSensor.available() == false) //do we have new data?
      particleSensor.check(); //Check the sensor for new data
    digitalWrite(readLED, !digitalRead(readLED)); //Blink onboard LED with every data read
    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample
    //En este punto tenemos las lecturas del sensor
    //valores[0] = temp; valores[1] = heartRate; valores[2] = spo2;
    //servidor(valores);
  }
  //After gathering 25 new samples recalculate HR and SP02
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
  int aux2 = millis();
  Serial.println("Tiempo");
  Serial.println(aux);
  Serial.println(aux2);
  aux = aux2-aux;
  Serial.println(aux);
  Serial.println("Tiempo2");
  Serial.print("Temperatura MAX30205: "); Serial.print(temp ,2); Serial.println("'c" );
  Serial.print(F("Frecuencia cardiaca: ")); Serial.println(heartRate, DEC);
  Serial.print(F("Saturación de oxígeno: ")); Serial.println(spo2, DEC); Serial.println();
  valores[0] = temp; valores[1] = heartRate; valores[2] = spo2;
}

void leerPeticion(cliente *clt){
  String peticion; // Variable para guardar el HTTP request
  String currentLine = "";                //
  char c;
  while (clt->conexion.available()) {            // loop mientras el cliente está conectado
    c = clt->conexion.read();             // lee un byte
    Serial.write(c);                    // imprime ese byte en el monitor serial
    peticion += c;
    if (c == '\n') {
      if (currentLine.length() == 0) {
      } else { // si tenemos una nueva linea limpiamos currentLine
        currentLine = "";
      }
    } else if (c != '\r') {  // si C es distinto al caracter de retorno de carro
      currentLine += c;      // lo agrega al final de currentLine
    }
  }
  Serial.println(peticion);
  //En la ultima linea tendremos algo como seg=5
  if(peticion.indexOf("seg=")>=0){
    clt->numLecturas=peticion.substring(peticion.indexOf("seg=")+4).toInt();
    Serial.println(clt->numLecturas);
    clt->lecturasTemp = new float[clt->numLecturas];
    clt->lecturasOx = new float[clt->numLecturas];
    clt->lecturasFrec = new float[clt->numLecturas];
  }
  // Limpiamos la variable peticion
  // Cerramos la conexión
  //client.stop();
  //Serial.println("Client disconnected.");
  //Serial.println("");
}
void agregar(cliente *clt, float valores[3]){
  if(clt->numLecturas > clt->lecturaActual){
    clt->lecturasTemp[clt->lecturaActual] = valores[0];
    clt->lecturasFrec[clt->lecturaActual] = valores[1];
    clt->lecturasOx[clt->lecturaActual] = valores[2];
    clt->lecturaActual++;
  }else{
    calcularPromedio(&(*clt));
    enviarPromedio(&(*clt));
  }
}
void calcularPromedio(cliente *clt){
  int i,cont1=0,cont2=0;
  clt->promedioTemp = 0;
  clt->promedioFrec = 0;
  clt->promedioOx = 0;
  for(i=0;i<clt->numLecturas;i++){
    clt->promedioTemp+=clt->lecturasTemp[i];
    if(clt->lecturasFrec[i]!=-999){
      cont1+=1;
      clt->promedioFrec+=clt->lecturasFrec[i];
    }
    if(clt->lecturasOx[i]!=-999){
      cont2+=1;
      clt->promedioOx+=clt->lecturasOx[i];
    }
  }
  clt->promedioTemp/=clt->numLecturas;
  if(cont1>0)
    clt->promedioFrec/=cont1;
  if(cont2>0)
    clt->promedioOx/=cont2;
}
void enviarPromedio(cliente *clt){
  if (clt->conexion.connected()){
    String pagina = "Temp:\"";
    pagina.concat(clt->promedioTemp);
    pagina.concat("\",Frec:\"");
    pagina.concat(clt->promedioFrec);
    pagina.concat("\",Ox:\"");
    pagina.concat(clt->promedioOx);
    pagina.concat("\"");
    clt->conexion.println("HTTP/1.1 200 OK");
    //clt->conexion.println("Cache-Control: private, no-cache, no-store, must-revalidate");
    clt->conexion.println("Access-Control-Allow-Origin: http://localhost");
    clt->conexion.println("Access-Control-Allow-Credentials: true");
    clt->conexion.println("Content-Type: text/html; charset=utf-8");
    //clt->conexion.println("Connection: keep-alive");
    clt->conexion.println("Connection: close");
    //clt->conexion.println("Keep-Alive: timeout=5");
    clt->conexion.println();
    Serial.println(pagina);
    clt->conexion.println(pagina);
    // la respuesta HTTP temina con una linea en blanco
    clt->conexion.println();
    clt->conexion.stop();
  }else{
    clt->conexion.stop();
  }
}
