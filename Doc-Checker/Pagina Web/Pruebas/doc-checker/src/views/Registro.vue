<template>
    <div class="Registro">
        <img src="@/assets/doc.png" height="200" width="200" />
        <div id="cuerpo" class="d-flex justify-content-around">
            <form>
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
                            <label class="form-label" for="form6Example2">Apellido Paterno</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example3" class="form-control" />
                            <label class="form-label" for="form6Example3">Apellido Materno</label>
                        </div>
                    </div>
                </div>
              
                <!-- Text input -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="email" id="form6Example4" class="form-control"/>
                            <label class="form-label" for="form6Example4">Correo</label>
                        </div>
                    </div>

                    <div class="col">
                        <div class="form-outline">
                            <input type="password" id="form6Example4" class="form-control"/>
                            <label class="form-label" for="form6Example4">Contraseña</label>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <label class="form-label" for="form6Example2">Eres Médico?</label>
                        </div>
                    </div>    
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="Peticion" id="flexRadioDefault4">
                            <label class="form-check-label" for="flexRadioDefault4">
                                Si
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="Peticion" id="flexRadioDefault5">
                            <label class="form-check-label" for="flexRadioDefault5">
                                No
                            </label>
                        </div>
                    </div>
                </div>
                
              
                <!-- Text input -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example6" class="form-control" />
                            <label class="form-label" for="form6Example6">Cédula Profesional</label>
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
                <!--
                <div class="form-check d-flex justify-content-center mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form6Example8"
                    checked
                  />
                  <label class="form-check-label" for="form6Example8"> Create an account? </label>
                </div>
                 -->
                <!-- Submit button -->
                <div class="d-flex justify-content-evenly">
                <button type="reset" class="btn btn-primary btn-block mb-4">Limpiar</button>
                <button type="submit" class="btn btn-primary btn-block mb-4">Registrarse</button>
                </div>
            </form>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'Registro',
    components: {
    },
    setup() {

    }
}
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
    transition: .2s;
    display: block;
    position: absolute;
    width: 3rem;
    height: 3rem;
    background-color: var(--color-button);
    content: '';
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