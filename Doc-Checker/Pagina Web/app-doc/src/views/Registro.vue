<template>
  <div class="Registro">
    <img src="@/assets/doc.png" height="200" width="200" />
    <div id="cuerpo" class="d-flex justify-content-around">
      <form action="/" id="formulario" >
        <!-- 2 column grid layout with text inputs for the first and last names -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                id="form6Example1"
                class="form-control"
                v-model="nombre"
                required
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
                required
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
                required
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
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Sexo
                </label>
              </div>
              <select v-model="sexo" class="custom-select p-2 flex-fill" id="inputGroupSelect01" required>
                <option selected>Opciones...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>

          <div class="col">
            <div class="form-outline">
              <input
                type="date"
                id="form6Example4"
                class="form-control"
                v-model="fechaNacimiento"
                required
              />
              <label class="form-label" for="form6Example4"
                >Fecha de Nacimiento</label
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
                id="form6Example6"
                class="form-control"
                v-model="direccion"
                required
              />
              <label class="form-label" for="form6Example6">Dirección</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="email"
                id="form6Example4"
                class="form-control"
                v-model="correo"
                required
              />
              <label class="form-label" for="form6Example4">Correo</label>
            </div>
          </div>

          <div class="col">
            <div class="form-outline">
              <input
                type="password"
                id="form6Example4"
                class="form-control"
                v-model="contrasenia"
                required
              />
              <label class="form-label" for="form6Example4">Contraseña</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                minlength="7" maxlength="8"
                id="form6Example6"
                class="form-control"
                v-model="cedula"
                required
              />
              <label class="form-label" for="form6Example6">
                Cédula Profesional
              </label>
            </div>
          </div>

          <!-- Text input -->
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect02">
                  Especialidad
                </label>
              </div>
              <select v-model="especialidad" class="custom-select p-2 flex-fill" id="inputGroupSelect02" required>
                <option selected>Opciones...</option>
                <option value="Medicina Familiar">Medicina Familiar</option>
                <option value="Medicina Intera">Medicina Interna</option>
                <option value="Pediatria">Pediatria</option>
                <option value="Gineco Obstetrica">Gineco Obstetrica</option>
                <option value="Cirujia">Cirujia</option>
                <option value="Psiquiatria">Psiquiatria</option>
                <option value="Cardiologia">Cardiologia</option>
                <option value="Dermatologia">Dermatologia</option>
                <option value="Endocronologia">Endocronologia</option>
                <option value="Gastroenterologia">Gastroenterologia</option>
                <option value="Infectologia">Infectologia</option>
                <option value="Nefrologia">Nefrologia</option>
                <option value="Oftalmologia">Oftalmologia</option>
                <option value="Otorrinolaringología">Otorrinolaringología</option>
                <option value="Neumologia">Neumologia</option>
                <option value="Neurologia">Neurologia</option>
                <option value="Radiologia">Radiologia</option>
                <option value="Anestesiologia">Anestesiologia</option>
                <option value="Oncologia">Oncologia</option>
                <option value="Patologia">Patologia</option>
                <option value="Urologia">Urologia</option>
                <option value="Medicina física y rehabilitación">Med.física y rehabilitación</option>
                <option value="Medicina Intensiva">Medicina Intensiva</option>
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
                minlength="10" maxlength="10"
                id="form6Example13"
                class="form-control"
                v-model="tel1"
                required
              />
              <label class="form-label" for="form6Example13">Telefono 1</label>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input
                type="text"
                minlength="10" maxlength="10"
                id="form6Example14"
                class="form-control"
                v-model="tel2"
                required
              />
              <label class="form-label" for="form6Example14">Telefono 2</label>
            </div>
          </div>
        </div>

        <!-- <div class="d-flex justify-content-evenly"> -->
        <div class="row mb-4">
          <div class="col">
            <button type="reset" class="btn btn-primary btn-block mb-4">
              Limpiar
            </button>
          </div>
          <div class="col">
            
            <button
              type="submit"
              class="btn btn-primary btn-block mb-4"
              v-on:click="registrar"
            >
              Registrarse
            </button>
            
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global"
export default {
  name: "Registro",
  components: {},
  data: function () {
    return {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      sexo: "",
      fechaNacimiento: "",
      direccion: "",
      correo: "",
      contrasenia: "",
      cedula: "",
      especialidad: "",
      tel1: "",
      tel2: ""
    };
  },
  setup() {},
  methods: {
    registrar: function () {
      if(document.getElementById('formulario').checkValidity()){
        const params = new URLSearchParams();
        params.append("cedula", this.cedula);
        params.append("nombre", this.nombre);
        params.append("apellidoPaterno", this.apellidoPaterno);
        params.append("apellidoMaterno", this.apellidoMaterno);
        params.append("correo", this.correo);
        params.append("contrasenia", this.contrasenia);
        params.append("sexo", this.sexo);
        params.append("fechaNacimiento", this.fechaNacimiento);
        params.append("especialidad", this.especialidad);
        params.append("direccion", this.direccion);
        params.append("tel1", this.tel1);
        params.append("tel2", this.tel2);
        axios
          .post("http://" + global_.server + ":"+global_.port_node+"/registrar", params, {
            withCredentials: true,
          })
          .then((result) => {
            console.log(result);
            this.$router.push({ path: result.data });
          });
      }
    },
  },
  created: function(){
  }
};
</script>

<style>
:root {
  --color-green: #00a878;
  --color-red: #fe5e41;
  --color-button: #fdffff;
  --color-black: #000;
}
.switch-button {
  display: inline-block;
}
.switch-button .switch-button__checkbox {
  display: none;
}
.switch-button .switch-button__label {
  background-color: var(--color-red);
  width: 5rem;
  height: 3rem;
  border-radius: 3rem;
  display: inline-block;
  position: relative;
}
.switch-button .switch-button__label:before {
  transition: 0.2s;
  display: block;
  position: absolute;
  width: 3rem;
  height: 3rem;
  background-color: var(--color-button);
  content: "";
  border-radius: 50%;
  box-shadow: inset 0px 0px 0px 1px var(--color-black);
}
.switch-button .switch-button__checkbox:checked + .switch-button__label {
  background-color: var(--color-green);
}
.switch-button .switch-button__checkbox:checked + .switch-button__label:before {
  transform: translateX(2rem);
}
</style>