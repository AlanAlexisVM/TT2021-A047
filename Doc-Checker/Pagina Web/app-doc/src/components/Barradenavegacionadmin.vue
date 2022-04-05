<template>

    <div class="Barradenavegacionadmin">
    
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
            <a class="navbar-brand" href="#">
                <Pestania imagen="../assets/administrar.png" />
            </a>
        </nav> -->
    </div>
</template>

<script>
import Pestania from '@/components/Pestania.vue'

export default {
    name: 'Barradenavegacionadmin',
    components: {
        Pestania
    },
    props: {
        sel: String
    },
    data: function(){
        return {
            images: [
                { name: "gestion", url: require("@/assets/gestion.png") },
                { name: "buscador", url: require("@/assets/seguir.png") },
                { name: "administrador", url: require("@/assets/administrar.png") },
                { name: "configuracion", url: require("@/assets/configuracion.png") }
            ]
        }
    },
    setup() {
    }

}
</script>

<style scoped>
.Barradenavegacionadmin {
    padding-bottom: 10px;
}
</style>