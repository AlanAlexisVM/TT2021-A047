<template>
  <div class="Registropacientes">
    <h1>{{titulo}}</h1>
    <div id="cuerpo" class="d-flex justify-content-around">
      <!--<form action="/my-handling-form-page" method="post">-->
      <form id="formulario1" >
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
            <div class="form-outline">
              <input
                type="date"
                id="form6Example4"
                class="form-control"
                v-model="fechaNacimiento"
                required
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
                required
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
                minlength="18" maxlength="18"
                id="form6Example4"
                class="form-control"
                v-model="curp"
                required
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
                required
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
                required
              >
                <option selected>Opciones...</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="CDMX">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
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
                required
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
            <!--<router-link to="/registropacientes2">-->
            <!--
            <button
              v-on:click="registrarPaciente"
              name="submit"
              class="btn btn-primary btn-block mb-4"
            >
            Continuar
            </button>
            -->
            <button
              v-on:click="registrarPaciente"
              type="button"
              name="submit"
              class="btn btn-primary btn-block mb-4"
            >
            Continuar
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
  name: "Registropacientes",
  data: function () {
    return {
      titulo: "Crear nuevo paciente",
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
      if(document.getElementById('formulario1').checkValidity()){
        const param = new URLSearchParams();
        param.append("nombre", this.nombre);
        param.append("apellidoPaterno", this.apellidoPaterno);
        param.append("apellidoMaterno", this.apellidoMaterno);
        param.append("fechaNacimiento", this.fechaNacimiento);
        param.append("sexo", this.selSexo);
        param.append("curp", this.curp);
        param.append("correo", this.correo);
        param.append("tel1", this.tel1);
        param.append("tel2", this.tel2);
        param.append("direccion", this.direccion);
        param.append("estado", this.selEstado);
        param.append("numPlaca", this.numPlaca);
        if(this.$route.params.titulo==undefined){
          axios.post("http://"+global_.server+":"+global_.port_node+"/registrarPaciente", param, {
              withCredentials: true,
            })         
            .then((result) => {
              console.log(result)
              this.$router.push({ name: result.data, params: { curp: this.curp } });
            });
        }else{
          axios.post("http://"+global_.server+":"+global_.port_node+"/actualizarPaciente", param, {
              withCredentials: true,
            })
            .then((result) => {
              console.log(result)
              this.$router.push({ name: result.data, params: { curp: this.curp } });
            });
        }
      }
    },
    preLlenado: function(){
      if(this.$route.params.titulo!=undefined){
        this.titulo = this.$route.params.titulo;
        const Curp = this.$route.params.curp;
        const params = new URLSearchParams();
        params.append('curp', Curp);
        axios.post("http://"+global_.server+":"+global_.port_node+"/obtenerPaciente", params, { withCredentials: true }).then((result) => {
          this.nombre = result.data[0].Nombre
          let ap = result.data[0].Apellidos.split(' ')
          this.apellidoPaterno = ap[0]
          this.apellidoMaterno = ap[1]
          this.fechaNacimiento = result.data[0].FechaNac.substring(0,10)
          this.selSexo = result.data[0].Sexo
          this.curp = result.data[0].CURP
          this.correo = result.data[0].CorreoE
          this.tel1 = result.data[0].Telefono1
          this.tel2 = result.data[0].Telefono2
          this.direccion = result.data[0].Direccion
          this.selEstado = result.data[0].Estado
          this.numPlaca = result.data[0].IdDCH
        });
      }
    }
  },
  created: function(){
    this.preLlenado()
  }
};
</script>

<style scoped>
.button,
input[type="button"] {
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