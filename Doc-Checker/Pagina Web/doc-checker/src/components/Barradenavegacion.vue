<template>

    <div class="Barradenavegacion">
    
    <nav class="navbar navbar-light bg-light">
        <Pestania v-for="image in images"
                :key="image.name"
                :dir="image.name"
                :imagen="image.url" />
    </nav>
    <!--
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <Pestania imagen="../assets/paciente.png"/>
            </a>
            <a class="navbar-brand" href="#">
                <Pestania imagen="../assets/informe-medico.png" />
            </a>
            <a class="navbar-brand" href="#">
                <Pestania imagen="../assets/seguir.png" />
            </a>
            <a class="navbar-brand" href="#">
                <Pestania imagen="../assets/configuracion.png" />
            </a>
        </nav> -->
    </div>
</template>

<script>
import Pestania from '@/components/Pestania.vue'

export default {
    name: 'Barradenavegacion',
    components: {
        Pestania
    },
    props: {
        sel: String
    },
    data: function(){
        return {
            images: [
                { name: "pacientes", url: require("@/assets/paciente.png") },
                { name: "informe", url: require("@/assets/informe-medico.png") },
                { name: "aniadir", url: require("@/assets/seguir.png") },
                { name: "configuracion", url: require("@/assets/configuracion.png") }
            ]
        }
    },
    setup() {
    }

}
</script>