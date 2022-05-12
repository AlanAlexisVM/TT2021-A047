#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include "Protocentral_MAX30205.h"
#include <WiFi.h>
#include "ListLib.h"
#include <HTTPClient.h>
#include "heartRate.h"

MAX30105 particleSensor2;
const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred
float beatsPerMinute;
int beatAvg;

MAX30105 particleSensor;
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
  String origen;
}cliente;


cliente docchecker;

//------------------Servidor Web en puerto 80---------------------

WiFiServer server(80);

//---------------------Credenciales de WiFi-----------------------

//const char* ssid     = "Nam-wifi";
//const char* password = "holahola";
const char* ssid     = "TP-Link_149C";
const char* password = "Admin012";
//const char* ssid     = "IZZI-3BD8";
//const char* password = "9CC8FC753BD8";
//const char* ssid     = "Internet de casa";
//const char* password = "Hil09El012021";

//---------------------VARIABLES GLOBALES-------------------------
int contconexion = 0;

const int salida = 2;

int segTrans = 0;

List<cliente> clientes = List<cliente>();

////////////////////////////

MAX30205 tempSensor;

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
void informarEncendidoServidor();
void inicializarServidor();
void leerSensores(float valores[3]);
void leerPeticion(cliente *clt);
void agregar(cliente *clt, float valores[3]);
void calcularPromedios(cliente *clt);
float calcularPromedio(float *arreglo);
void enviarPromedio(cliente *clt);
void servidor(float valores[3]);
boolean validarSignos(cliente clt);
void informarProblemaServidor();

void setup() {
  Serial.begin(115200);
  inicializarSensores();
  inicializarServidor();
  informarEncendidoServidor();
  //Inicializacion de objeto que servira para checar los signos vitales y notificar al doctor en caso de un descenso considerable
  docchecker.numLecturas = 15;
  docchecker.lecturaActual = 0;
  docchecker.promedioTemp = 0;
  docchecker.promedioOx = 0;
  docchecker.promedioFrec = 0;
  docchecker.lecturasTemp = new float[docchecker.numLecturas];
  docchecker.lecturasOx = new float[docchecker.numLecturas];
  docchecker.lecturasFrec = new float[docchecker.numLecturas];
}

void loop() {
  leerSensores(valoresLeidos);
  agregar(&docchecker,valoresLeidos);
  Serial.println("temp");
  Serial.println(docchecker.promedioTemp);
  Serial.println("ox");
  Serial.println(docchecker.promedioOx);
  Serial.println("frec");
  Serial.println(docchecker.promedioFrec);
  
  if(segTrans>=360 && segTrans%30==0 && !validarSignos(docchecker)){
    informarProblemaServidor();
  }
  servidor(valoresLeidos);
  segTrans+=2;
}

boolean validarSignos(cliente clt){
  boolean ret=true;
  if(clt.promedioTemp<36 || clt.promedioTemp>37.8){
    ret = false;
  }
  if(clt.promedioOx<92){
    ret = false;
  }
  if(clt.promedioFrec<60||clt.promedioFrec>80){
    ret = false;
  }
}

void informarProblemaServidor(){
  HTTPClient http;
  WiFiClient client;
  const String SERVER_ADDRESS = "http://192.168.1.103:8081";
  String full_url = SERVER_ADDRESS + "/problemaPaciente";
  http.begin(client, full_url);
  http.addHeader("Content-Type", "application/json");
  Serial.println("Making request to " + full_url);
  int httpCode = http.POST("{\"ip\":\""+WiFi.localIP().toString()+"\"}");
  if (httpCode > 0)
  {
    if (httpCode == HTTP_CODE_OK)
    {
      String payload = http.getString(); //Get the request response payload
      Serial.println("Request is OK! The server says: ");
      Serial.println(payload);
    }
    else
    {
      Serial.println("Error: httpCode was " + http.errorToString(httpCode));
    }
  }
  else
  {
    Serial.println("Request failed: " + http.errorToString(httpCode));
  }

  http.end();
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
    c1.origen = "";
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
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed, el mlx90614 no es compatible con  esta velocidad de 400kHz
  //if (!particleSensor.begin(Wire)) //Use default I2C port, 100kHz speed
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
  
  if (!particleSensor2.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  particleSensor2.setup(); //Configure sensor with default settings
  particleSensor2.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor2.setPulseAmplitudeGreen(0); //Turn off Green LED
  
  
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

void informarEncendidoServidor(){
  HTTPClient http;
  WiFiClient client;
  const String SERVER_ADDRESS = "http://192.168.1.103:8081";
  String full_url = SERVER_ADDRESS + "/monitorplaca";
  http.begin(client, full_url);
  http.addHeader("Content-Type", "application/json");
  Serial.println("Making request to " + full_url);
  int httpCode = http.POST("{\"ip\":\""+WiFi.localIP().toString()+"\"}");
  if (httpCode > 0)
  {
    if (httpCode == HTTP_CODE_OK)
    {
      String payload = http.getString(); //Get the request response payload
      Serial.println("Request is OK! The server says: ");
      Serial.println(payload);
    }
    else
    {
      Serial.println("Error: httpCode was " + http.errorToString(httpCode));
    }
  }
  else
  {
    Serial.println("Request failed: " + http.errorToString(httpCode));
  }

  http.end();
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
  int aux = millis();
  float temp = tempSensor.getTemperature();
  for (byte i = 25; i < 100; i++){
    redBuffer[i - 25] = redBuffer[i];
    irBuffer[i - 25] = irBuffer[i];
    long irValue = particleSensor2.getIR();
    if (checkForBeat(irValue) == true)
    {
      //We sensed a beat!
      long delta = millis() - lastBeat;
      lastBeat = millis();
      beatsPerMinute = 60 / (delta / 1000.0);
      Serial.println(delta);
      if (beatsPerMinute < 255 && beatsPerMinute > 20)
      {
        rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
        rateSpot %= RATE_SIZE; //Wrap variable
        //Take average of readings
        beatAvg = 0;
        for (byte x = 0 ; x < RATE_SIZE ; x++)
          beatAvg += rates[x];
        beatAvg /= RATE_SIZE;
      }
    }
  }
  //take 25 sets of samples before calculating the heart rate.
  for (byte i = 75; i < 100; i++){
    while (particleSensor.available() == false) //do we have new data?
      particleSensor.check(); //Check the sensor for new data
    digitalWrite(readLED, !digitalRead(readLED)); //Blink onboard LED with every data read
    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample
    //
    long irValue = particleSensor2.getIR();
    if (checkForBeat(irValue) == true)
    {
      //We sensed a beat!
      long delta = millis() - lastBeat;
      lastBeat = millis();
      beatsPerMinute = 60 / (delta / 1000.0);
      Serial.println(delta);
      if (beatsPerMinute < 255 && beatsPerMinute > 20)
      {
        rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
        rateSpot %= RATE_SIZE; //Wrap variable
        //Take average of readings
        beatAvg = 0;
        for (byte x = 0 ; x < RATE_SIZE ; x++)
          beatAvg += rates[x];
        beatAvg /= RATE_SIZE;
      }
    }
  }
  //After gathering 25 new samples recalculate HR and SP02
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
  int aux2 = millis();
  aux = aux2-aux;
  temp = temp+1.06;
  Serial.print("Tiempo de lectura:"); Serial.print(aux); Serial.println(" seg");
  Serial.print("Temperatura MAX30205: "); Serial.print(temp ,2); Serial.println("'c" );
  Serial.print(F("Frecuencia cardiaca: ")); Serial.println(beatAvg, DEC);
  Serial.print(F("Saturación de oxígeno: ")); Serial.println(spo2, DEC); Serial.println();
  valores[0] = temp; valores[1] = beatAvg; valores[2] = spo2;
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
  if(peticion.indexOf("Origin: ")>=0){
    String aux = peticion.substring(peticion.indexOf("Origin: ")+8);
    Serial.println(aux.substring(0,aux.lastIndexOf('\n')));
    clt->origen = aux.substring(0,aux.lastIndexOf('\n'));
  }else{
    clt->origen = "http://localhost";
  }
  //En la ultima linea tendremos algo como seg=5
  if(peticion.indexOf("seg=")>=0){
    clt->numLecturas=peticion.substring(peticion.indexOf("seg=")+4).toInt();
    Serial.println(clt->numLecturas);
    clt->lecturasTemp = new float[clt->numLecturas];
    clt->lecturasOx = new float[clt->numLecturas];
    clt->lecturasFrec = new float[clt->numLecturas];
  }
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
    clt->lecturaActual = 0;
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
  if(String(clt->conexion)!="0"){
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
      clt->conexion.println("Access-Control-Allow-Origin: "+clt->origen);
      clt->conexion.println("Access-Control-Allow-Credentials: true");
      clt->conexion.println("Content-Type: text/html; charset=utf-8");
      clt->conexion.println("Connection: keep-alive");
      clt->conexion.println();
      clt->conexion.println(pagina);
      clt->conexion.println();
      clt->conexion.stop();
    }else{
      clt->conexion.stop();
    }
  }
}
