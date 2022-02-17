<template>
    <div class="Home">
        <Barradenavegacion> </Barradenavegacion>
        <p>{{mensaje}}</p>
        <router-view />
    </div>
</template>

<script>
import Barradenavegacion from '../components/Barradenavegacion.vue'

export default {
    name: 'Home',
    components: {
       Barradenavegacion
    },
    setup() {

    }
}
</script>