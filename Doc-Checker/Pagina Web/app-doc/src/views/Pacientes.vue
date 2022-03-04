<template>
    <div class="Pacientes">
        <router-link to="registropacientes">
            <img src="@/assets/mas.png" height="60" width="60" />
        </router-link>
        <Tabla tipoTabla="pacientes" v-bind:tuplas="tuplas" />
        <!--<Tabla tipoTabla="buscadorPacientes" />
        <Tabla tipoTabla="solicitudesDoctores" />
        <Tabla tipoTabla="administradorPacientes" />
        <Tabla tipoTabla="administradorDoctores" />
        <Tabla tipoTabla="placas" />-->
    </div>    
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/Tabla.vue'

export default {
    name: 'Pacientes',
    components: {
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
        getMensaje(){
            //const path = 'http://localhost:5000/api/v1'
        },
        solicitarPacientes: function(){
            axios.get('http://localhost:8081/solicitarPacientes', { withCredentials: true }).then((result) => {
                //this.$router.push({ path: result.data })
                console.log("Respuesta:")
                //console.log(result.data)
                for(var i=0;i<result.data.length;i++){
                    this.tuplas.push([result.data[i].Nombre + " " + result.data[i].Apellidos, result.data[i].CURP]);
                }
                console.log(this.tuplas)
                console.log("Fin")
            });
        }
    }
    ,
    created: function(){
        this.solicitarPacientes()
    }
}
</script>