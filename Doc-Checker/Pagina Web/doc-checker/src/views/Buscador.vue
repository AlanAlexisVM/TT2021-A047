<template>
    <div class="Buscador">
        <label for="mail">Buscar paciente:</label>
        <input type="email" id="mail" name="user_mail">
        <Tabla tipoTabla="buscadorPacientes" />
    </div>
</template>

<script>
import Tabla from '@/components/Tabla.vue'

export default {
    name: 'Buscador',
    components: {
        Tabla
    },
    setup() {

    }
}
</script>