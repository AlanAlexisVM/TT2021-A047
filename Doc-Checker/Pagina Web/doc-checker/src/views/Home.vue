<template>
    <div class="Home">
        <Barradenavegacion> </Barradenavegacion>
        <p>{{mensaje}}</p>
        <router-view />
    </div>
</template>

<script>
import Barradenavegacion from '../components/Barradenavegacion.vue'
import axios from 'axios'
export default {
    name: 'Home',
    components: {
       Barradenavegacion
    },
    setup() {

    },data(){return{mensaje: "vue"}},
    methods: {
        getMensaje(){
            const path = 'http://127.0.0.1:4000/api/guardarpaciente'
            axios.get(path).then((respuesta) =>{
                this.mensaje = respuesta.data
            }).catch((error) =>{
                console.error(error);
            })
        }
    },
    created(){
        this.getMensaje()
    }
}
</script>