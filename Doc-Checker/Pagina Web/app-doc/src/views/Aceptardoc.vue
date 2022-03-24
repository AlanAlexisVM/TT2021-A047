<template>
    <div>
        <Tabla tipoTabla="solicitudesDoctores" v-bind:tuplas="tuplas" />
    </div>
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/Tabla.vue'
import global_ from "@/components/Global"

export default {
    components:{
        Tabla
    },
    setup() {
    },
    data: function(){
        return{
            tuplas: []
        }
    },
    methods:{
        doctoresSolicitantes: function(){
            axios.get("http://"+global_.server+":"+global_.port_node+"/doctoresSolicitantes", { withCredentials: true }).then((result) => {
                for(var i=0;i<result.data.length;i++){
                    this.tuplas.push([result.data[i].Nombre + " " + result.data[i].Apellidos, result.data[i].CedulaProf]);
                }
            }); 
        }
    },
    created: function(){
        this.doctoresSolicitantes()
    }
}
</script>
