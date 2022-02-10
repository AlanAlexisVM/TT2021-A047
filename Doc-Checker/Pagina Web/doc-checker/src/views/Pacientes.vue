<template>
    <div class="Pacientes">
        <router-link to="registropacientes">
            <img src="@/assets/mas.png" height="60" width="60" />
        </router-link>
        <Tabla tipoTabla="pacientes" />
    </div>    
</template>

<script>
import Tabla from '@/components/Tabla.vue'

export default {
    name: 'Pacientes',
    components: {
        Tabla
    },
    setup() {

    },
    methods:{
        getMensaje(){
            //const path = 'http://localhost:5000/api/v1'
        }
    }
}
</script>