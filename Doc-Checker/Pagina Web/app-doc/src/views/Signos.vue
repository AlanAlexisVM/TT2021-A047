<template>
  <div id="Signos">
    <div class="row mb-4">
      <div class="col">
        CURP:
        {{ curp }}
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        Nombre Paciente:
        {{ name }}
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">Frecuencia Cardiaca</div>
    </div>
    <div class="row mb-4">
      <div class="col" id="frec">
        <img src="@/assets/Heart.png" height="30" width="30" />
        {{ frec }}
        BPM
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">Temperatura Corporal</div>
    </div>
    <div class="row mb-4">
      <div class="col" id="temp">
        <img src="@/assets/Temp.png" height="30" width="30" />
        {{ temp }} °C
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">Saturación de Oxigeno</div>
    </div>
    <div class="row mb-4" id="ox">
      <div class="col">
        <img src="@/assets/Persona.png" height="30" width="20" />
        {{ ox }}
        %
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global";
//import SignosVue from '../../../Pruebas/doc-checker/src/views/Signos.vue';
export default {
  setup() {},
  data() {
    return {
      temp: "0",
      frec: "0",
      ox: "0",
      curp: "",
      name: "",
    };
  },
  methods: {
    leerSignos: function () {
      this.curp = this.$route.params.curp;
      if(this.curp!=undefined){
        const params = new URLSearchParams();
        params.append("curp", this.curp);
        axios
          .post(
            "http://" + global_.server + ":" + global_.port_node + "/placa",
            params,
            {
              withCredentials: true,
            }
          )
          .then((result) => {
            this.pedirSignos(result.data);
          });
      }
    },
    SemaforoSignos: function () {
      let temp = parseFloat(this.temp);
      if (temp < 36){
        document.getElementById("temp").style.color = 'blue';
      } else if (temp >= 36 && temp <= 37.1){ 
        document.getElementById("temp").style.color = 'green';
      } else if (temp > 37.1 && temp <= 38){ 
        document.getElementById("temp").style.color = '#c6ce00';
      } else if (temp > 38 && temp <= 38.5){
        document.getElementById("temp").style.color = 'yellow'; 
      } else if (temp > 38.5 && temp <= 39){
        document.getElementById("temp").style.color = 'orange';
      } else if (temp > 39){ 
        document.getElementById("temp").style.color = 'red';
      }

      let frec = parseFloat(this.frec);
      if (frec < 36){
        document.getElementById("frec").style.color = 'blue';
      } else if (frec <= 60){ 
        document.getElementById("frec").style.color = 'green';
      } else if (frec > 60 && temp <= 70){
        document.getElementById("frec").style.color = 'yellow'; 
      } else if (frec > 70 && temp <= 85){
        document.getElementById("frec").style.color = 'orange';
      } else if (frec > 85){ 
        document.getElementById("frec").style.color = 'red';
      }

      let ox = parseFloat(this.ox);
      if (ox <= 85){
        document.getElementById("ox").style.color = 'red';
      } else if (ox >= 86 && ox <= 90){
        document.getElementById("ox").style.color = 'orange'; 
      } else if (ox >= 91 && ox <= 94){
        document.getElementById("ox").style.color = 'yellow';
      } else if (ox >= 95){ 
        document.getElementById("ox").style.color = 'green';
      }

    }, 
    pedirSignos: function (direccion) {
      const params = new URLSearchParams();
      params.append("seg", "2");
      axios
        .post("http://" + direccion, params, {
          withCredentials: true,
        })
        .then((result) => {
          const lect = result.data.split('"');
          //Posicion 1
          this.temp = lect[1];
          //Posicion 3
          this.frec = lect[3];
          //Posicion 5
          this.ox = lect[5];
          //this.SemaforoSignos(this.temp);
          this.pedirSignos(direccion);
        });
    },
  },
  mounted () {
    this.name = this.$route.params.name;
    this.leerSignos();
  },
  watch: {
    temp(value,oldvalue){
      if(value!=oldvalue){
        this.SemaforoSignos()
        console.log(value + ' old: ' +oldvalue);
      }
    },
  }
};
</script>

<style>
/*
#temp {
  color: red;
} */
</style>
