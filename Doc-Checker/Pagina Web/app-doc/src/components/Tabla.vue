<template>
    <div class="table-responsive container" >
        <table class="table table-striped table-bordered" >
            <template v-if="tipoTabla === 'pacientes'">
                <TuplaH v-bind:datos="c1"/>
                <TuplaB v-for="tupla in tuplas"
                        :key="tupla[0]"
                        :datos="tupla"
                        :id="tupla[1]"
                        v-bind:informe="true"
                        v-bind:signos="true"
                        v-bind:edicion="true" />
            </template>
            <template v-else-if="tipoTabla === 'buscadorPacientes'">
                <TuplaH v-bind:datos="c2" />
                <TuplaB v-for="tupla in tuplas"
                        :key="tupla[0]"
                        :datos="tupla"
                        :id="tupla[0]"
                        v-bind:agregar="true" />
            </template>
            <template v-else-if="tipoTabla === 'solicitudesDoctores'">
                <TuplaH v-bind:datos="c3" />
                <TuplaB v-bind:datos="t2" v-bind:agregar="true" v-bind:rechazar="true" />
            </template>
            <template v-else-if="tipoTabla === 'administradorPacientes'">
                <TuplaH v-bind:datos="c4" />
                <TuplaB v-bind:datos="t1" v-bind:agregar="true" />
            </template>
            <template v-else-if="tipoTabla === 'administradorDoctores'">
                <TuplaH v-bind:datos="c5" />
                <TuplaB v-bind:datos="t3" v-bind:eliminar="true" />
            </template>
            <template v-else>
                <TuplaH v-bind:datos="c6" />
                <TuplaB v-bind:datos="t4" v-bind:eliminar="true" />
            </template>
        </table>
    </div>
</template>

<script>
import TuplaH from '@/components/TuplaH.vue'
import TuplaB from '@/components/TuplaB.vue'

export default {
    name: 'Tabla',
    components:{
        TuplaH,
        TuplaB
    },
    props: {
        tipoTabla: String,
        tuplas: Object
    },
    data: function(){
        return{
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