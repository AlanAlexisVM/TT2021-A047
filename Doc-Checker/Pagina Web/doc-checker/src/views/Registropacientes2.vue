<template>
    <div class="Registropacientes">
        <form action="/my-handling-form-page" method="post">
            <div class="row mb-4">
                <label for="name">Actividad física:</label>
                <select v-model="selActividadFisica">
                    <option disabled value=" ">Actividad física</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
            </div>
            <div class="row mb-4">
                <label for="name">Adicciones:</label>
                <select v-model="selAdicciones">
                    <option disabled value=" ">Adicciones</option>
                    <option v-for="adiccion in adicciones" :key=adiccion :label=adiccion />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Antecedentes familiares:</label>
                <select v-model="selAntecedentes">
                    <option disabled value=" ">Antecedentes familiares</option>
                    <option v-for="enfermedad in enfermedades" :key=enfermedad :label=enfermedad />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">¿Consume farmacos?: </label>
                <select v-model="selFarmacos">
                    <option>Si</option>
                    <option>No</option>
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Máximo grado de estudios:</label>
                <select v-model="selGrado">
                    <option disabled value=" ">Máximo grado de estudios</option>
                    <option v-for="grado in grados" :key=grado :label=grado />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Estado civil:</label>
                <select v-model="selEstadoCivil">
                    <option disabled value=" ">Estado civil</option>
                    <option v-for="estadoCivil in estadosCiviles" :key=estadoCivil :label=estadoCivil />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Exposición al ruido:</label>
                <select v-model="selExposicionRuido">
                    <option disabled value=" ">Exposición al ruido</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Exposición solar:</label>
                <select v-model="selExposicionSolar">
                    <option disabled value=" ">Exposición solar</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Horas de sueño:</label>
                <select v-model="selHorasSuenio">
                    <option disabled value=" ">Horas de sueño</option>
                    <option v-for="horasSuenio in horariosSuenio" :key=horasSuenio :label=horasSuenio />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Padecimientos:</label>
                <select v-model="selPadecimientos">
                    <option disabled value=" ">Padecimientos</option>
                    <option v-for="enfermedad in enfermedades" :key=enfermedad :label=enfermedad />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Personas dependientes:</label>
                <select v-model="selPersonasDependientes">
                    <option disabled value=" ">Personas dependientes</option>
                    <option v-for="numero in numeros" :key=numero :label=numero />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Trabajo:</label>
                <select v-model="selTrabajo">
                    <option disabled value=" ">Trabajo</option>
                    <option v-for="trabajo in trabajos" :key=trabajo :label=trabajo />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Variaciones de humedad:</label>
                <select v-model="selVariacionesHumedad">
                    <option disabled value=" ">Variaciones de humedad</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
            </li>
            <div class="row mb-4">
                <label for="name">Variaciones de temperatura:</label>
                <select v-model="selVariacionesTemperatura">
                    <option disabled value=" ">Variaciones de Temperatura</option>
                    <option v-for="nivel in niveles" :key=nivel :label=nivel />
                </select>
            </li>
            
            <router-link to="/pacientes">
                <input type="submit" class="fadeIn fourth" value="Crear paciente">
            </router-link>
            </ul>
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
            selAntecedentes: " ",
            selFarmacos: "No",
            selGrado: " ",
            selEstadoCivil: " ",
            selExposicionRuido: " ",
            selExposicionSolar: " ",
            selHorasSuenio: " ",
            selPadecimientos: " ",
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
    setup() {
    },
}
</script>