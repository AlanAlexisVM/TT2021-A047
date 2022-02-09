<template>
    <div class="Home">
        <Barradenavegacion> </Barradenavegacion>
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