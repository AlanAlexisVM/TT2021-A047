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
                            <input type="text" id="form6Example4" class="form-control"/>
                            <label class="form-label" for="form6Example4">Correo</label>
                        </div>

                        <div class="form-outline">
                            <input type="text" id="form6Example4" class="form-control"/>
                            <label class="form-label" for="form6Example4">Contraseña</label>
                        </div>
                        
                    </div>

                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example5" class="form-control" />
                            <label class="form-label" for="form6Example5">Modelo de Laptop</label>
                        </div>

                        <div class="form-outline">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Peticion" id="flexRadioDefault4">
                                <label class="form-check-label" for="flexRadioDefault4">
                                    Sustitución
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="Peticion" id="flexRadioDefault5">
                                <label class="form-check-label" for="flexRadioDefault5">
                                    Permanente
                                </label>
                                <br>
                                <label class="form-label" for="form6Example2">Tipo de Petición</label>
                            </div>
                        </div>
                    </div>
                  <!-- </div> -->

                    <div class="col">

                        <div class="form-outline">
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault6">
                            <label class="form-check-label" for="flexRadioDefault6">
                                Entregado
                            </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault7">
                                <label class="form-check-label" for="flexRadioDefault7">
                                    Disponible
                                </label>
                            </div>
                            
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault8">
                                <label class="form-check-label" for="flexRadioDefault8">
                                    En Preparación
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault9">
                                <label class="form-check-label" for="flexRadioDefault9">
                                    Nuevo
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault10">
                                <label class="form-check-label" for="flexRadioDefault10">
                                    Recuperado
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault11">
                                <label class="form-check-label" for="flexRadioDefault11">
                                    Reasignado
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="EstadoInv" id="flexRadioDefault12">
                                <label class="form-check-label" for="flexRadioDefault12">
                                    Proceso de Seguro
                                </label>
                                <br>
                                <label class="form-label" for="form6Example2">Estado de Inventario</label>
                            </div>
                        </div>
                    </div>
                </div>
                
              
                <!-- Text input -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example6" class="form-control" />
                            <label class="form-label" for="form6Example6">Equipo Recuperado</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example7" class="form-control" />
                            <label class="form-label" for="form6Example7">Dirección</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example8" class="form-control" />
                            <label class="form-label" for="form6Example8">Clave</label>
                        </div>
                    </div>
                </div>
              
                <!-- Text input -->
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example9" class="form-control" />
                            <label class="form-label" for="form6Example9">Accesorios</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example10" class="form-control" />
                            <label class="form-label" for="form6Example10">Ultima Preparación</label>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example11" class="form-control" />
                            <label class="form-label" for="form6Example11">Nombre de Usuario</label>
                        </div>
                    </div>
                    <div class="col">
                    <!--
                        <div class="form-outline">
                            <script type="text/javascript">
                                $('.datepicker').datepicker();
                            </script>
                            <div id="date-picker" class="md-form md-outline input-with-post-icon datepicker">
                                <input placeholder="Select date" type="text" id="form6Example12" class="form-control">
                                <label class="form-label" for="form6Example12">Fecha de Entrega</label>
                                <i class="fas fa-calendar input-prefix" tabindex=0></i>
                            </div>       
                        </div>
                    -->
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example13" class="form-control" />
                            <label class="form-label" for="form6Example13">Reporte</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example14" class="form-control" />
                            <label class="form-label" for="form6Example14">Fecha de Asignación</label>
                        </div>
                    </div>
                </div>
              
                <div class="row mb-4">
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example15" class="form-control" />
                            <label class="form-label" for="form6Example15">Entregados para Docking</label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form6Example16" class="form-control" />
                            <label class="form-label" for="form6Example16">Ubicacion de Visoramas</label>
                        </div>
                    </div>
                </div>

                <!-- Checkbox 
                <div class="form-check d-flex justify-content-center mb-4">
                  <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form6Example8"
                    checked
                  />
                  <label class="form-check-label" for="form6Example8"> Create an account? </label>
                </div> -->
              
                <!-- Submit button -->
                <div class="d-flex justify-content-evenly">
                <button type="button" class="btn btn-primary btn-block mb-4">Eliminar</button>
                <button type="reset" class="btn btn-primary btn-block mb-4">Limpiar</button>
                <button type="submit" class="btn btn-primary btn-block mb-4">Agregar</button>
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