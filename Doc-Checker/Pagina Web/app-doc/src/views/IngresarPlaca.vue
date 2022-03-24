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
                <div class="row mb-4">
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
      clave: ""
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
    },
  },
  created: function(){
  }
};
</script>

<style>

</style>