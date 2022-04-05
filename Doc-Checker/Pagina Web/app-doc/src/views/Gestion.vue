<template>
    <div class="Gestionador">
        <input v-model="cadena" type="search" name="busqueda" placeholder="Ingrese su búsqueda...">
        <input v-on:click="buscar" type="submit" value="Buscar">

        <div class="p-4">
            <b-tabs card vertical content-class="mt-3" lazy> 
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

export default {
    name: 'Gestion',
    components: {
        Tabla
    },
    data(){
        return {
            cadena: "",
            tipo: ['doctores','pacientes','placas'],
            tuplas: []
        }
    },
    methods: {
        buscar (){
            
        }
    }
}
</script>

<style>

</style>