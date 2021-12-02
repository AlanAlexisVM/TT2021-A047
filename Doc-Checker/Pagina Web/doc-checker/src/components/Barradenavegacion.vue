<template>
    <div>
        <ul>
            <Pestania imagen="../assets/paciente.png"/>
            <Pestania imagen="../assets/informe-medico.png" />
            <Pestania imagen="../assets/seguir.png" />
            <Pestania imagen="../assets/configuracion.png" />
        </ul>
    </div>
</template>

<script>
import 'Pestania' from '@/components/Pestania.vue'
export default {
    name: 'Barra',
    components: {
        Pestania
    },
    setup() {
        
    }
}
</script>