<template>
    <div class="IngresarPlaca">
        <div id="cuerpo" class="d-flex justify-content-around">
            <form action class="form" id="formulario" @submit.prevent="ingresar" >
                <!-- Begin form -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input
                            type="text"
                            id="form6Example1"
                            class="form-control"
                            v-model="ip"
                            required
                            />
                            <label class="form-label" for="form6Example1">IP</label>
                        </div>
                    </div>
                </div>

                <!-- Text input -->
                <!--<div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input
                            type="text"
                            id="form6Example4"
                            class="form-control"
                            v-model="clave"
                            required
                            />
                            <label class="form-label" for="form6Example4">Clave Hospital</label>
                        </div>
                    </div> 
                </div>-->
                <div class="row mb-4">
                <div class="col">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Clave
                    </label>
                </div>
                <select
                v-model="Nclave"
                class="custom-select"
                id="inputGroupSelect01"
                required
                >
                <option selected>Opciones...</option>
                <option v-for="clave in claves" :key=clave :label=clave :value="clave" />
              </select>
            </div>
          </div>
      </div>
                <div class="col">  
                    <input 
                    class="form-submit btn btn-primary btn-block mb-4" 
                    type="submit" 
                    value="Ingresar"
                    >
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global"
export default {
  name: "IngresarPlaca",
  components: {},
  data: function () {
    return {
      ip: "",
      Nclave: "",
      claves: []
    };
  },
  setup() {},
  methods: {
    ingresar: function () {
        const params = new URLSearchParams();
        params.append("ip", this.ip);
        params.append("clave", this.clave);
        axios
          .post("http://" + global_.server + ":"+global_.port_node+"/registrarplaca", params, {
            withCredentials: true,
          })
          .then((result) => {
            console.log(result);
            this.$router.push({ path: result.data });
          });
    },obtenerClaves: function(){
      axios.get("http://"+global_.server+":"+global_.port_node+"/obtenerClaves", { withCredentials: true }).then((result) => {
        console.log(result)
        this.claves = result.data
        console.log(this.claves)
      });
    },
  },
  created: function(){
    this.obtenerClaves()
  }
};
</script>

<style>

</style>