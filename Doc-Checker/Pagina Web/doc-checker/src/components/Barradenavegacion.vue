<template>

    <div class="Barradenavegacion">
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
                <Pestania imagen="../assets/paciente.png"/>
                <Pestania imagen="../assets/informe-medico.png" />
                <Pestania imagen="../assets/seguir.png" />
                <Pestania imagen="../assets/configuracion.png" />
    </div>
</template>

<script>
import Pestania from '@/components/Pestania.vue'
export default {
    name: 'Barradenavegacion',
    components: {
        Pestania
    },
    setup() {
        
    }
}
</script>