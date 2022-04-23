<template>
    <div class="Gestionador">
        <input v-model="cadena" type="search" name="busqueda" placeholder="Ingrese su búsqueda...">
        <input v-on:click="buscar" type="submit" value="Buscar">
        <b-alert v-model="error" variant='warning' fade in dismissible>
            No se ha podido ejecutar la acción solicitada
        </b-alert>
        <b-alert v-model="exito" variant='success' fade in dismissible>
            Eliminación exitosa
        </b-alert>
        <div class="p-4">
            <b-tabs card vertical content-class="mt-3" v-model="tabIndex" lazy @input="actualizar"> 
                <b-tab title="Doctores" >
                    <Tabla tipoTabla="administradorDoctores" v-bind:tuplas="tuplas" @errorDel="errorTupla" />
                </b-tab>
                <b-tab title="Pacientes" >
                    <Tabla tipoTabla="eliminarPacientes" v-bind:tuplas="tuplas" @errorDel="errorTupla" />
                </b-tab>
                <b-tab title="Placas" >
                    <Tabla tipoTabla="Placas" v-bind:tuplas="tuplas" @errorDel="errorTupla" />
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
            tuplas: [],
            error: false,
            exito: false
        }
    },
    methods: {
        errorTupla: function(error){
            console.log(error)
            if(error!=undefined){
                this.error = error
                this.exito = !error
            }
            this.actualizar()
        },
        buscar (){
            this.tuplas = []
            if(this.tabIndex===0){
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarDoctoresAdmin?cad="+this.cadena
                axios.get(sol, { withCredentials: true })
                .then((result) => {
                    this.tuplas = []
                    for(var i=0;i<result.data.length;i++){
                        const nom = result.data[i].Nombre + " " + result.data[i].Apellidos
                        const cedula= result.data[i].CedulaProf
                        this.tuplas.push([nom, cedula])
                    }
                })              
            }else if(this.tabIndex===1){  
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarPacientesAdmin?cad="+this.cadena
                axios.get(sol, { withCredentials: true })
                .then((result) => {
                    for(var i=0;i<result.data.length;i++){
                        const curp = result.data[i].Curp
                        const nom = result.data[i].Nombre + " " +result.data[i].Apellidos
                        this.tuplas.push([curp, nom])
                    }
                })
            }else if(this.tabIndex===2){
                const sol = "http://"+global_.server+":"+global_.port_node+"/buscarPlacasAdmin?cad="+this.cadena
                axios.get(sol, { withCredentials: true })
                .then((result) => {
                    for(var i=0;i<result.data.length;i++){
                        const id = result.data[i].IdDCH
                        const clave = result.data[i].Clave
                        this.tuplas.push([id, clave])
                    }
                })
            }
        },
        actualizar (){
            this.tuplas = []
            if(this.tabIndex===0){
                axios.get("http://"+global_.server+":"+global_.port_node+"/buscarDoctoresAdmin?cad=*", { withCredentials: true })
                .then((result) => {
                    for(let i=0;i<result.data.length;i++){
                        this.tuplas.push([result.data[i].Nombre+" "+result.data[i].Apellidos, result.data[i].CedulaProf])
                    }
                })
            }else if(this.tabIndex===1){
                axios.get("http://"+global_.server+":"+global_.port_node+"/buscarPacientesAdmin?cad=*", { withCredentials: true })
                .then((result) => {
                    for(var i=0;i<result.data.length;i++){
                        const curp = result.data[i].Curp
                        const nom = result.data[i].Nombre+" "+result.data[i].Apellidos
                        this.tuplas.push([curp, nom])
                    }
                })
            }else if(this.tabIndex===2){
                axios.get("http://"+global_.server+":"+global_.port_node+"/buscarPlacasAdmin?cad=*", { withCredentials: true })
                .then((result) => {
                    for(var i=0;i<result.data.length;i++){
                        const id = result.data[i].IdDCH
                        const clave = result.data[i].Clave
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