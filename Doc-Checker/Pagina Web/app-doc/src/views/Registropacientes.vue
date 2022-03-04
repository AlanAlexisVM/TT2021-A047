<template>
  <div class="Registropaciientes">
    <h1>Crear nuevo paciente</h1>
    <div id="cuerpo" class="d-flex justify-content-around">
      <form action="/my-handling-form-page" method="post">
        <!-- 2 column grid layout with text inputs for the first and last names -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example1"
                class="form-control"
                v-model="nombre"
              />
              <label class="form-label" for="form6Example1">Nombre(s)</label>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example2"
                class="form-control"
                v-model="apellidoPaterno"
              />
              <label class="form-label" for="form6Example2"
                >Apellido Paterno</label
              >
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example3"
                class="form-control"
                v-model="apellidoMaterno"
              />
              <label class="form-label" for="form6Example3"
                >Apellido Materno</label
              >
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="date"
                id="form6Example4"
                class="form-control"
                v-model="fechaNacimiento"
              />
              <label class="form-label" for="form6Example4"
                >Fecha de Naciminento</label
              >
            </div>
          </div>

          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Sexo
                </label>
              </div>
              <select
                v-model="selSexo"
                class="custom-select"
                id="inputGroupSelect01"
              >
                <option selected>Opciones...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example4"
                class="form-control"
                v-model="curp"
              />
              <label class="form-label" for="form6Example4">CURP</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="email"
                id="form6Example6"
                class="form-control"
                v-model="correo"
              />
              <label class="form-label" for="form6Example6"
                >Correo Electronico</label
              >
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example13"
                class="form-control"
                v-model="tel1"
              />
              <label class="form-label" for="form6Example13">Telefono 1</label>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example14"
                class="form-control"
                v-model="tel2"
              />
              <label class="form-label" for="form6Example14">Telefono 2</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example6"
                class="form-control"
                v-model="direccion"
              />
              <label class="form-label" for="form6Example6">Direccion</label>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Estado
                </label>
              </div>
              <select
                v-model="selEstado"
                class="custom-select"
                id="inputGroupSelect01"
              >
                <option selected>Opciones...</option>
                <option value="CDMX">CDMX</option>
                <option value="Estado de Mexico">Estado de México</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example6"
                class="form-control"
                v-model="numPlaca"
              />
              <label class="form-label" for="form6Example6">N° Placa</label>
            </div>
          </div>
        </div>

        
        <div class="row mb-4">
          <div class="col">
            <button type="reset" class="btn btn-primary btn-block mb-4">
              Limpiar
            </button>
          </div>
          <div class="col">
            <router-link to="/registropacientes2">
            <input
              v-on:click="registrarPaciente"
              type="submit"
              class="btn btn-primary btn-block mb-4"
              value="Continuar"
            />
            </router-link>
          </div>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Registropacientes",
  data: function () {
    return {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      fechaNacimiento: "",
      selSexo: " ",
      curp: "",
      correo: "",
      tel1: "",
      tel2: "",
      direccion: "",
      selEstado: " ",
      numPlaca: "",
    };
  },
  setup() {},
  methods: {
    registrarPaciente: function () {
      const params = new URLSearchParams();
      params.append("nombre", this.nombre);
      params.append("apellidoPaterno", this.apellidoPaterno);
      params.append("apellidoMaterno", this.apellidoMaterno);
      params.append("fechaNacimiento", this.fechaNacimiento);
      params.append("sexo", this.selSexo);
      params.append("curp", this.curp);
      params.append("correo", this.correo);
      params.append("tel1", this.tel1);
      params.append("tel2", this.tel2);
      params.append("direccion", this.direccion);
      params.append("estado", this.selEstado);
      params.append("numPlaca", this.numPlaca);
      axios
        .post("http://localhost:8081/registrarPaciente", params, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result);
          this.$router.push({ path: result.data });
        });
    },
  },
};
</script>

<style scoped>
.button,
input[type="submit"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 10px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  border-radius: 5px 5px 5px 5px;
}
</style>