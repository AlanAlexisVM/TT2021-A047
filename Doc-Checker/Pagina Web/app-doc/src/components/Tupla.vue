<template>
    <tr class="Tupla">
        <template v-if="th === true">
            <th scope="col" v-for="dato in datos"
                :key=dato >
                {{dato}}
            </th>
        </template>
        <template v-else>
            <td v-for="dato in datos"
                :key=dato>
                {{dato}}
            </td>
            <td v-if="informe === true" >
                <router-link :to="informe2">
                    <img src="@/assets/notas.png"
                            v-bind:height="alto"
                            v-bind:width="ancho" />
                </router-link>
            </td>
            <td v-if="signos === true" >
                <!--<router-link :to="signos2">-->
                    <img src="@/assets/latido-del-corazon.png"
                        v-bind:height="alto"
                        v-bind:width="ancho"
                        v-on:click="fsignos" />
                <!--</router-link>-->
            </td>
            <td v-if="edicion === true" >
                <!--<router-link :to="edicion2">-->
                    <img src="@/assets/editar.png"
                        v-bind:height="alto"
                        v-bind:width="ancho"
                        v-on:click="dirEdicion" />
                <!--</router-link>-->
            </td>
            <td v-if="agregar === true" >
                <!--<router-link to="pacientes">-->
                    <img v-on:click="fagregar"
                        src="@/assets/mas.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                <!--</router-link>-->
            </td>
            <td v-if="eliminar === true" >
                <router-link to="pacientes">
                    <img src="@/assets/negativo.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                </router-link>
            </td>
            <td v-if="rechazar === true" >
                <!--<router-link to="pacientes">-->
                    <img v-on:click="frechazar" 
                        src="@/assets/eliminar.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                <!--</router-link>-->
            </td>
        </template>
    </tr>
</template>

<script>
import axios from 'axios'
import global_ from "@/components/Global"
export default {
    name: 'Tupla',
    props: {
        datos: Array,
        informe: Boolean,
        signos: Boolean,
        edicion: Boolean,
        agregar: Boolean,
        eliminar: Boolean,
        rechazar: Boolean,
        th: Boolean,
        id: String,
        name: String,
    },
    data: function(){
        return{
            ancho: 35,
            alto: 35,
            informe2: "",
            signos2: "",
        }
    },
    setup() {
    },
    methods: {
        fagregar: function(){
            const params = new URLSearchParams();
            params.append("id", this.id);
            axios.post("http://"+ global_.server +":"+global_.port_node+"/agregar", params, {
                withCredentials: true,
                })
                .then((result) => {
                    if(result.data=="aceptardoc")
                        location.reload()
                    else
                        this.$router.push({ path: result.data });
                });
        },
        dirEdicion: function(){
            this.$router.push({ name: "Registropacientes", params: { titulo: "Actualizar paciente", curp: this.id } });
        },
        frechazar: function(){
            const params = new URLSearchParams();
            params.append("id", this.id);
            axios.post("http://"+ global_.server +":"+global_.port_node+"/rechazardoc", params, {
                withCredentials: true,
                })
                .then((result) => {
                    if(result.data=="rechazardocs")
                        location.reload()
                    else
                        this.$router.push({ path: result.data });
                });
        },
        fsignos: function(){
            this.$router.push({ name: "Signos", params: { curp: this.id, name: this.name } });
        }
    },
    created: function(){
        this.informe2 = "informe?curp="+this.id;
        //this.signos2 = "signos?curp="+this.id;
        this.edicion2 = "registropacientes?curp="+this.id;
        //Boton agregar con función de agregar paciente
    }
}
</script>