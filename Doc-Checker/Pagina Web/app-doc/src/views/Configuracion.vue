<template>
    <div class="Configuracion">
        <img src="@/assets/doc.png" height="100" width="100" />
        <div class="d-flex justify-content-around">
            <div class="col">
                <div class="row mb-4">
                <div class="change-pass">
                    <h2>Cambiar contraseña</h2>
                </div>
                </div>
                <div class="row mb-4">
                <div class="form-group">
                    <label for="contrasenia">Escribe tu contraseña actual:</label>
                    <input
                    type="password"
                    id="form6Example4"
                    class="form-control"
                    v-model="contrasenia"
                    />
                </div>
                </div>
                <div class="row mb-4">
                <div class="form-group">
                    <label for="newcontrasenia">Escribe tu nueva contraseña:</label>
                    <input
                    type="password"
                    id="form6Example4"
                    class="form-control"
                    v-model="newcontrasenia"
                    />
                </div>
                </div>
                <div class="row mb-4">
                <div class="form-group">
                    <label for="newcontrasenia2"
                    >Vuelve a escribir tu nueva constraseña:</label
                    >
                    <input
                    type="password"
                    id="form6Example4"
                    class="form-control"
                    v-model="newcontrasenia2"
                    />
                </div>
                </div>

                <div class="row mb-4">
                <!--<router-link to="/configuracion">-->
                <input
                    v-on:click="cambio"
                    type="submit"
                    class="fadeIn fourth btn btn-primary"
                    value="Restablecer"
                />
                <!--</router-link>-->
                </div>
            

                <div class="row mb-4">
                    <h2>Información</h2>
                </div>

                <div class="row mb-4">
                    <label for="name">Ayuda</label>
                </div>
                <div class="row mb-4">
                    <label for="name">Privacidad</label>
                </div>
                <div class="row mb-4">
                    <label for="name">Terminos del servicio</label>
                </div>
                <div class="row mb-4">
                    <input
                        v-on:click="cerrarSesion"
                        type="submit"
                        class="fadeIn fourth btn btn-primary btn-danger"
                        value="Cerrar sesión"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global";
export default {
  name: "Configuracion",
  setup() {},
  methods: {
    cerrarSesion: function () {
      axios
        .get("http://" + global_.server + ":" + global_.port_node + "/logout", {
          withCredentials: true,
          credentials: "include",
        })
        .then((result) => {
          this.$router.push({ path: result.data });
        });
    },
    cambio: function () {
      const params = new URLSearchParams();
      params.append("contrasenia", this.contrasenia);
      params.append("newcontrasenia", this.newcontrasenia);
      params.append("newcontrasenia2", this.newcontrasenia2);
      axios
        .post(
          "http://" +
            global_.server +
            ":" +
            global_.port_node +
            "/cambiarcontra",
          params,
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result);
          this.$router.push({ path: result.data });
        });
    },
  },
};
</script>

<style scoped>
.Configuracion {
  display: inline-block;
}

.change-pass {
  padding-bottom: 1em;
}

ul {
  list-style-type: none;
  display: inline;
}
</style>