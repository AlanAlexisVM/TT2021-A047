<template>
    <div class="Buscador">
        <p>
            Búsqueda de pacientes: <input type="search" name="busqueda" placeholder="Id de paciente, Nombre, ...">
            <input type="submit" value="Buscar">
        </p>
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