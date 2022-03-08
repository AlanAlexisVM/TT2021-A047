<template>
    <div class="Buscador">
        <p>
            Búsqueda de pacientes: <input v-model="cadena" type="search" name="busqueda" placeholder="Nombre del paciente">
            <input v-on:click="buscar" type="submit" value="Buscar">
        </p>
        <Tabla tipoTabla="buscadorPacientes" v-bind:tuplas="tuplas" />
    </div>
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/Tabla.vue'
import global_ from "@/components/Global"

export default {
    name: 'Buscador',
    components: {
        Tabla
    },
    data: function(){
        return{
            cadena: "",
            tuplas: []
        }
    },
    setup() {

    },
    methods:{
        buscar: function(){
            //{withCredentials:true, credentials:'include'}
            axios.get("http://"+global_.server+":"+global_.port_node+"/buscarPacientes?cad="+String(this.cadena), { withCredentials: true }).then((result) => {
                this.tuplas = []
                for(var i=0;i<result.data.length;i++){
                    this.tuplas.push([result.data[i].CURP, result.data[i].Nombre + " " + result.data[i].Apellidos]);
                }
            });
        }
    }
}
</script>