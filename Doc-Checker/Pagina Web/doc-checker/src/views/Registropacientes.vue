<template>
  <div class="Registropaciientes">
    <h1>Crear nuevo paciente</h1>
    <div id="cuerpo" class="d-flex justify-content-around">
      <form action="/my-handling-form-page" method="post">
        <!-- 2 column grid layout with text inputs for the first and last names -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example1" class="form-control" />
              <label class="form-label" for="form6Example1">Nombre(s)</label>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example2" class="form-control" />
              <label class="form-label" for="form6Example2"
                >Apellido Paterno</label
              >
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example3" class="form-control" />
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
              <input type="text" id="form6Example4" class="form-control" />
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
              <select class="custom-select" id="inputGroupSelect01">
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
              <input type="text" id="form6Example4" class="form-control" />
              <label class="form-label" for="form6Example4">CURP</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input type="email" id="form6Example6" class="form-control" />
              <label class="form-label" for="form6Example6">Correo Electronico</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example13" class="form-control" />
              <label class="form-label" for="form6Example13">Telefono 1</label>
            </div>
          </div>
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example14" class="form-control" />
              <label class="form-label" for="form6Example14">Telefono 2</label>
            </div>
          </div>
        </div>

        <!-- Text input -->
        <div class="row mb-4">
          <div class="col">
            <div class="form-outline">
              <input type="text" id="form6Example6" class="form-control" />
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
              <select class="custom-select" id="inputGroupSelect01">
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
              <input type="text" id="form6Example6" class="form-control" />
              <label class="form-label" for="form6Example6">N° Placa</label>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-evenly">
          <button type="reset" class="btn btn-primary btn-block mb-4">
            Limpiar
          </button>
          <router-link to="/registropacientes2">
            <input
              type="submit"
              class="btn btn-primary btn-block mb-4"
              value="Continuar"
            />
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registropacientes",
  data: function () {
    return {
      selSexo: " ",
      selEstado: " ",
    };
  },
  setup() {},
};
</script>

<style scoped>
input[type="button"],
input[type="reset"],
input[type="submit"],
.button {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 10px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
}
</style>