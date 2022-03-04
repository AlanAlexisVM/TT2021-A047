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
                <router-link :to="edicion2">
                    <img src="@/assets/editar.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                </router-link>
            </td>
            <td v-if="agregar === true" >
                <router-link to="pacientes">
                    <img src="@/assets/mas.png"
                        v-bind:height="alto"
                        v-bind:width="ancho" />
                </router-link>
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
    created: function(){
        this.informe2 = "informe?curp="+this.id;
        this.signos2 = "signos?curp="+this.id;
        this.edicion2 = "registropacientes?curp="+this.id;
    }
}
</script>