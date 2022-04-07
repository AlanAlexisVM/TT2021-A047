<template>
    <div class="Gestionador">
        <input v-model="cadena" type="search" name="busqueda" placeholder="Ingrese su búsqueda...">
        <input v-on:click="buscar" type="submit" value="Buscar">

        <div class="p-4">
            <b-tabs card vertical content-class="mt-3" v-model="tabIndex" lazy> 
                <b-tab title="Doctores">
                    <Tabla tipoTabla="administradorDoctores" v-bind:tuplas="tuplas" />
                </b-tab>
                <b-tab title="Pacientes">
                    <Tabla tipoTabla="eliminarPacientes" v-bind:tuplas="tuplas" />
                </b-tab>
                <b-tab title="Placas">
                    <Tabla tipoTabla="Placas" v-bind:tuplas="tuplas" />
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import Tabla from '@/components/Tabla.vue'
import global_ from "@/components/Global"
import axios from 'axios'

export default {
    name: 'Gestion',
    components: {
        Tabla
    },
    data(){
        return {
            cadena: "",
            tabIndex: 0, 
            tuplas: []
        }
    },
    methods: {
        buscar (){
            if(this.tabIndex===0){
                console.log('0');
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarDoctoresAdmin?cad="
                axios.get(sol + String(this.cadena), { withCredentials: true })
                .then((result) => {
                    this.tuplas = []
                    const curp = result.data[i].CURP
                    const nom = result.data[i].Nombre
                    const apell = result.data[i].Apellidos
                    for(var i=0;i<result.data.length;i++){
                        this.tuplas.push([curp, `${nom} ${apell}`]);
                    }
                });
            }else if(this.tabIndex===1){
                console.log('1');
            }else if(this.tabIndex===2){
                console.log('2');
            }
        }
    }
}
</script>

<style>

</style>