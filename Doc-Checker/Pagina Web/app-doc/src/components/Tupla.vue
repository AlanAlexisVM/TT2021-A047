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
                <router-link :to="signos2">
                    <img src="@/assets/latido-del-corazon.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                </router-link>
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
                <router-link to="pacientes">
                    <img src="@/assets/eliminar.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                </router-link>
            </td>
        </template>
    </tr>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Tupla',
    props: {
        datos: Object,
        informe: Boolean,
        signos: Boolean,
        edicion: Boolean,
        agregar: Boolean,
        eliminar: Boolean,
        rechazar: Boolean,
        th: Boolean,
        id: String
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
            axios.post("http://localhost:8081/agregarPaciente", params, {
                withCredentials: true,
                })
                .then((result) => {
                    //console.log(result);
                    this.$router.push({ path: result.data });
                });
        },
        dirEdicion: function(){
            this.$router.push({ name: "Registropacientes", params: { titulo: "Actualizar paciente", curp: this.id } });
        }
    },
    created: function(){
        this.informe2 = "informe?curp="+this.id;
        this.signos2 = "signos?curp="+this.id;
        this.edicion2 = "registropacientes?curp="+this.id;
        //Boton agregar con función de agregar paciente
    }
}
</script>