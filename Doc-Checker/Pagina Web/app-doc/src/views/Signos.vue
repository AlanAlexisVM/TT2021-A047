<template>
    <div id="Signos">
        <div class="row mb-4">
          <div class="col">
            ID A22
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            Nombre Paciente
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            Frecuencia Cardiaca
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <img src="@/assets/Heart.png" height="30" width="30" />
            BPM
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            Temperatura Corporal
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <img src="@/assets/Temp.png" height="30" width="30" />
            °C
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            Saturación de Oxigeno
          </div>
        </div>
        <div class="row mb-4">
          <div class="col">
            <img src="@/assets/Persona.png" height="30" width="20" />
            %
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global"
export default({
    setup() {
    },
    methods: {
        leerSignos: function(){
          let curp = this.$route.params.curp;
          const params = new URLSearchParams();
          params.append("curp", curp);
          axios
            .post("http://" + global_.server + ":"+global_.port_node+"/placa", params, {
              withCredentials: true,
            })
            .then((result) => {
              const params = new URLSearchParams();
              params.append("seg", "5");
              axios
              .post("http://" + result.data, params, {
                withCredentials: true,
              })
              .then((result) => {
                console.log(result.data);
              });
            });
        }
    },
    created: function(){
      this.leerSignos();
    }
})
</script>

<style>

</style>
