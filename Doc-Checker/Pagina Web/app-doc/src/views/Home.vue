<template>
    <div class="Home">
        <template v-if="administrador" >
            <Barradenavegacionadmin> </Barradenavegacionadmin>
        </template>
        <template v-else>
            <Barradenavegacion> </Barradenavegacion>
        </template>
        <router-view />
    </div>
</template>

<script>
import axios from 'axios'
import Barradenavegacion from '../components/Barradenavegacion.vue'
import Barradenavegacionadmin from '../components/Barradenavegacionadmin.vue'
import global_ from "@/components/Global"

export default {
    name: 'Home',
    components: {
       Barradenavegacion,
       Barradenavegacionadmin
    },
    setup() {
    },
	data () {
		return {
			administrador: false
		}
	},
    methods:{
        validar: function(){
            //{withCredentials:true, credentials:'include'}
            axios.get("http://"+global_.server+":"+global_.port_node+"/validar?ruta="+String(this.$route.name), { withCredentials: true }).then((result) => {
                this.administrador = result.data[0]
                this.$router.push({ path: result.data[1] })
            });
        }
    },
    created: function(){
        this.validar();
        //console.log(this.$route.name);
    }
}
</script>