<template>
    <div class="Gestionador">
        <input v-model="cadena" type="search" name="busqueda" placeholder="Ingrese su búsqueda...">
        <input v-on:click="buscar" type="submit" value="Buscar">

        <div class="p-4">
            <b-tabs card vertical content-class="mt-3" v-model="tabIndex" lazy @input="actualizar"> 
                <b-tab title="Doctores" >
                    <Tabla tipoTabla="administradorDoctores" v-bind:tuplas="tuplas" />
                </b-tab>
                <b-tab title="Pacientes" >
                    <Tabla tipoTabla="eliminarPacientes" v-bind:tuplas="tuplas" />
                </b-tab>
                <b-tab title="Placas" >
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
            this.tuplas = []
            if(this.tabIndex===0){
                console.log('0');
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarDoctoresAdmin"
                axios.get(sol, { withCredentials: true })
                .then((result) => {
                    this.tuplas = []
                    const nom = result.data[i].Nombre
                    const cedula= result.data[i].CedulaProf
                    for(var i=0;i<result.data.length;i++){
                        this.tuplas.push([cedula, nom])
                    }
                })
                // axios.get("http://"+global_.server+":"+global_.port_node+"/buscarDoctoresAdmin", { withCredentials: true }).then((result) => {
                //     console.log(result)
                //     for(let i=0;i<result.data.length;i++){
                //         this.tuplas.push([result.data[i].Nombre, result.data[i].CedulaProf]);
                //     }
                // }); 
            }else if(this.tabIndex===1){  
                console.log('1');
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarPacientesAdmin?cad="
                axios.get(sol + String(this.cadena), { withCredentials: true })
                .then((result) => {
                    console.log(result)                  
                    const curp = result.data[i].Curp
                    const nom = result.data[i].Nombre
                    for(var i=0;i<result.data.length;i++){
                        this.tuplas.push([curp, nom])
                    }
                })
            }else if(this.tabIndex===2){
                console.log('2')
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarPlacasAdmin?cad="
                axios.get(sol + String(this.cadena), { withCredentials: true })
                .then((result) => {
                    console.log(result)
                    const id = result.data[i].IdDCH
                    const clave = result.data[i].Clave
                    for(var i=0;i<result.data.length;i++){
                        this.tuplas.push([id, clave])
                    }
                })
            }
        },
        actualizar (){
            this.tuplas = []
            if(this.tabIndex===0){
                axios.get("http://"+global_.server+":"+global_.port_node+"/buscarDoctoresAdmin", { withCredentials: true })
                .then((result) => {
                    console.log(result)
                    for(let i=0;i<result.data.length;i++){
                        this.tuplas.push([result.data[i].Nombre, result.data[i].CedulaProf])
                    }
                })
            }else if(this.tabIndex===1){
                axios.get("http://"+global_.server+":"+global_.port_node+"/buscarPacientesAdmin", { withCredentials: true })
                .then((result) => {
                    console.log(result)
                    const curp = result.data[i].Curp
                    const nom = result.data[i].Nombre
                    for(var i=0;i<result.data.length;i++){
                        this.tuplas.push([curp, nom])
                    }
                })
            }else if(this.tabIndex===2){
                axios.get("http://"+global_.server+":"+global_.port_node+"/buscarPlacasAdmin", { withCredentials: true })
                .then((result) => {
                    console.log(result)
                    const id = result.data[i].IdDCH
                    const clave = result.data[i].Clave
                    for(var i=0;i<result.data.length;i++){
                        this.tuplas.push([id, clave])
                    }
                })
            }
        }
    },created: function(){
        this.actualizar()
    }
}
</script>

<style>

</style>