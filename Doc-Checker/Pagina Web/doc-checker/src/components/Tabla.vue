<template>
    <div class="Tabla">
        <template v-if="tipoTabla === 'pacientes'">
            <table class="default">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Informe</th>
                    <th>Signos vitales</th>
                    <th>editar</th>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Jesús</td>
                    <td>Img01</td>
                    <td>Img02</td>
                    <td>Img03</td>
                </tr>
            </table>
        </template>
        <template v-else-if="tipoTabla === 'buscadorPacientes'">
            <table class="default">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Agregar Paciente</th>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Jesús</td>
                    <td>Img01</td>
                </tr>
            </table>
        </template>
        <template v-else-if="tipoTabla === 'solicitudesDoctores'">
            <table class="default">
                <tr>
                    <th>Nombre</th>
                    <th>Cédula profesional</th>
                    <th>Agregar doctor</th>
                    <th>Rechazar doctor</th>
                </tr>
                <tr>
                    <td>Jesús</td>
                    <td>123456789</td>
                    <td>Img01</td>
                    <td>Img02</td>
                </tr>
            </table>
        </template>
        <template v-else-if="tipoTabla === 'administradorPacientes'">
            <table class="default">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Agregar paciente</th>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Jesús</td>
                    <td>Img01</td>
                </tr>
            </table>
        </template>
        <template v-else-if="tipoTabla === 'administradorDoctores'">
            <table class="default">
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Cédula profesional</th>
                    <th>Eliminar doctor</th>
                </tr>
                <tr>
                    <td>01</td>
                    <th>Jesús</th>
                    <td>123456789</td>
                    <td>Img01</td>
                </tr>
            </table>
        </template>
        <template v-else>
            <table class="default">
                <tr>
                    <th>Id</th>
                    <th>Hospital</th>
                    <th>Eliminar placa</th>
                </tr>
                <tr>
                    <td>01</td>
                    <td>Hospital 01</td>
                    <td>Img01</td>
                </tr>
            </table>
        </template>
    </div>    
</template>

<script>
export default {
    name: 'Tabla',
    props: {
        tipoTabla: String
    },
    setup() {

    }
}
</script>