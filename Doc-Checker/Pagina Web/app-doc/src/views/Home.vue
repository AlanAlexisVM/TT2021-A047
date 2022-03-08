<template>
    <div class="Home">
        <Barradenavegacion> </Barradenavegacion>
        <router-view />
    </div>
</template>

<script>
import axios from 'axios'
import Barradenavegacion from '../components/Barradenavegacion.vue'
import global_ from "@/components/Global"

export default {
    name: 'Home',
    components: {
       Barradenavegacion
    },
    setup() {
    },
    methods:{
        validar: function(){
            //{withCredentials:true, credentials:'include'}
            axios.get("http://"+global_.server+":"+global_.port_node+"/validar?ruta="+String(this.$route.name), { withCredentials: true }).then((result) => {
                this.$router.push({ path: result.data })
            });
        }
    },
    created: function(){
        this.validar();
        //console.log(this.$route.name);
    }
}
</script>