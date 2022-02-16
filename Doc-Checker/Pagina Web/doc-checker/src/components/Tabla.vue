<template>
    <table class="Tabla">
        <template v-if="tipoTabla === 'pacientes'">
            <Tupla v-bind:datos="c1" v-bind:th="true" />
            <Tupla v-bind:datos="t1" v-bind:informe="true" v-bind:signos="true" v-bind:edicion="true" />
        </template>
        <template v-else-if="tipoTabla === 'buscadorPacientes'">
            <Tupla v-bind:datos="c2" v-bind:th="true" />
            <Tupla v-bind:datos="t1" v-bind:agregar="true" />
        </template>
        <template v-else-if="tipoTabla === 'solicitudesDoctores'">
            <Tupla v-bind:datos="c3" v-bind:th="true" />
            <Tupla v-bind:datos="t2" v-bind:agregar="true" v-bind:rechazar="true" />
        </template>
        <template v-else-if="tipoTabla === 'administradorPacientes'">
            <Tupla v-bind:datos="c4" v-bind:th="true" />
            <Tupla v-bind:datos="t1" v-bind:agregar="true" />
        </template>
        <template v-else-if="tipoTabla === 'administradorDoctores'">
            <Tupla v-bind:datos="c5" v-bind:th="true" />
            <Tupla v-bind:datos="t3" v-bind:eliminar="true" />
        </template>
        <template v-else>
            <Tupla v-bind:datos="c6" v-bind:th="true" />
            <Tupla v-bind:datos="t4" v-bind:eliminar="true" />
        </template>
    </table>    
</template>

<script>
import Tupla from '@/components/Tupla.vue'

export default {
    name: 'Tabla',
    components:{
        Tupla
    },
    props: {
        tipoTabla: String
    },
    data: function(){
        return{
            ancho: 35,
            alto: 35,
            c1: ["Id", "Nombre", "Informe", "Signos vitales", "Editar"],
            c2: ["Id", "Nombre", "Agregar Paciente"],
            c3: ["Nombre", "Cédula profesional", "Agregar doctor", "Rechazar doctor"],
            c4: ["Id", "Nombre", "Agregar paciente"],
            c5: ["Id", "Nombre", "Cédula profesional", "Eliminar doctor"],
            c6: ["Id", "Hospital", "Eliminar placa"],
            t1: ["01", "Jesus"],
            t2: ["Jesus Dominguez", "123456789"],
            t3: ["A1", "Jesus Dominguez", "123456789"],
            t4: ["B1", "Hospital General"]
        }
    },
    setup() {

    }
}
</script>