<template>
    <div id="Registropacientes2" class="d-flex justify-content-around">
        <form action="/my-handling-form-page" method="post">
            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text"  for="name">Actividad física:</label>
                    </div>
                    <select v-model="selActividadFisica" >
                        <option disabled value=" ">Actividad física</option>
                        <option v-for="nivel in niveles" :key=nivel :label=nivel />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Adicciones:</label>
                    </div>
                    <select v-model="selAdicciones" v-on:click="agregar(selAdicciones2,selAdicciones)" >
                        <option disabled value=" " >Adicciones</option>
                        <option v-for="adiccion in adicciones" :key=adiccion :label=adiccion :value=adiccion />
                    </select>
                </div>
                <ul v-if="selAdicciones2.length">
                    <li v-for="adiccion in selAdicciones2"
                        v-bind:key="adiccion" >
                        {{adiccion}} <div v-on:click="selAdicciones2 = eliminar(selAdicciones2,adiccion)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Antecedentes familiares:</label>
                    </div>
                    <select v-model="selAntecedentes" v-on:click="agregar(selAntecedentes2,selAntecedentes)" >
                        <option disabled value=" ">Antecedentes familiares</option>
                        <option v-for="enfermedad in enfermedades" :key=enfermedad :label=enfermedad :value=enfermedad />
                    </select>
                </div>
                <ul v-if="selAntecedentes2.length">
                    <li v-for="antecedente in selAntecedentes2"
                        v-bind:key="antecedente" >
                        {{antecedente}} <div v-on:click="selAntecedentes2 = eliminar(selAntecedentes2,antecedente)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">¿Consume farmacos?: </label>
                    </div>
                    <select v-model="selFarmacos">
                        <option>Si</option>
                        <option>No</option>
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Máximo grado de estudios:</label>
                    </div>
                    <select v-model="selGrado">
                        <option disabled value=" ">Máximo grado de estudios</option>
                        <option v-for="grado in grados" :key=grado :label=grado />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Estado civil:</label>
                    </div>
                    <select v-model="selEstadoCivil">
                        <option disabled value=" ">Estado civil</option>
                        <option v-for="estadoCivil in estadosCiviles" :key=estadoCivil :label=estadoCivil />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Exposición al ruido:</label>
                    </div>
                    <select v-model="selExposicionRuido">
                        <option disabled value=" ">Exposición al ruido</option>
                        <option v-for="nivel in niveles" :key=nivel :label=nivel />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Exposición solar:</label>
                </div>
                <select v-model="selExposicionSolar">
                    <option disabled value=" ">Exposición solar</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Horas de sueño:</label>
                </div>
                <select v-model="selHorasSuenio">
                    <option disabled value=" ">Horas de sueño</option>
                    <option v-for="horasSuenio in horariosSuenio" :key=horasSuenio :label=horasSuenio />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Padecimientos:</label>
                </div>
                <select v-model="selPadecimientos" v-on:click="agregar(selPadecimientos2,selPadecimientos)" >
                    <option disabled value=" ">Padecimientos</option>
                    <option v-for="enfermedad in enfermedades" :key=enfermedad :label=enfermedad :value=enfermedad />
                </select>
                </div>
                <ul v-if="selPadecimientos2.length">
                    <li v-for="padecimiento in selPadecimientos2"
                        v-bind:key="padecimiento" >
                        {{padecimiento}} <div v-on:click="selPadecimientos2 = eliminar(selPadecimientos2,padecimiento)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Personas dependientes:</label>
                </div>
                <select v-model="selPersonasDependientes">
                    <option disabled value=" ">Personas dependientes</option>
                    <option v-for="numero in numeros" :key=numero :label=numero />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Trabajo:</label>
                </div>
                <select v-model="selTrabajo">
                    <option disabled value=" ">Trabajo</option>
                    <option v-for="trabajo in trabajos" :key=trabajo :label=trabajo />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Variaciones de humedad:</label>
                </div>
                <select v-model="selVariacionesHumedad">
                    <option disabled value=" ">Variaciones de humedad</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Variaciones de temperatura:</label>
                </div>
                <select v-model="selVariacionesTemperatura">
                    <option disabled value=" ">Variaciones de Temperatura</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
                </div>
            </div>

            <router-link to="/pacientes">
                <input type="submit" class="btn btn-primary btn-block mb-4" value="Crear paciente">
            </router-link>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Registropacientes2',
    data: function(){
        return{
            selActividadFisica: " ",
            selAdicciones: " ",
            selAdicciones2: [],
            selAntecedentes: " ",
            selAntecedentes2: [],
            selFarmacos: "No",
            selGrado: " ",
            selEstadoCivil: " ",
            selExposicionRuido: " ",
            selExposicionSolar: " ",
            selHorasSuenio: " ",
            selPadecimientos: " ",
            selPadecimientos2: [],
            selPersonasDependientes: " ",
            selTrabajo: " ",
            selVariacionesHumedad: " ",
            selVariacionesTemperatura: " ",
            niveles: ["1 - Nula", "2 - Poca", "3 - Media", "4 - Mucha"],
            enfermedades: ["Diabetes", "Hipertensión"],
            numeros: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
            adicciones: ["Alcoholismo", "Tabaquismo", "A las drogas", "Juegos de azar", "A la comida", "A los videojuegos"],
            grados: ["Sin estudios", "Primaria", "Secundaria", "Bachillerato", "Licenciatura", "Maestria", "Doctorado"],
            estadosCiviles: ["Soltero", "Casado", "Divorciado", "Separación en proceso judicial", "Viudo", "Concubinato"],
            horariosSuenio: ["2-3 horas", "4-5 horas", "6-7 horas", "8+ horas"],
            trabajos: ["Obrero", "Futbolista"]
        }
    },
    methods: {
        agregar: function(v1,v2){
            v1.push(v2);
        },
        eliminar: function(v1,v2){
            return v1.filter(function(a) {
                return a !== v2;
            });
        }
    },
    setup() {
    },
}
</script>