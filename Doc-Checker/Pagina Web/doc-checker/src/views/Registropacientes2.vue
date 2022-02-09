<template>
    <div class="Registropacientes">
        <form action="/my-handling-form-page" method="post">
            <ul>
            <li>
                <label for="name">Actividad Física:</label>
                <select v-model="selActividadFisica">
                <option disabled value=" ">Actividad física</option>
                <option>1 - Nula</option>
                <option>2 - Poca</option>
                <option>3 - Media</option>
                <option>5 - Mucha</option>
                </select>
            </li>
            <li>
                <label for="name">Adicciones:</label>
                <select v-model="selAdicciones">
                <option disabled value=" ">Adicciones</option>
                <option>Alcoholismo</option>
                <option>Tabaquismo</option>
                <option>A las drogas</option>
                <option>Juegos de azar</option>
                <option>A la comida</option>
                <option>A los videojuegos</option>
                </select>
            </li>
            <router-link to="/pacientes">
                <input type="submit" class="fadeIn fourth" value="Crear paciente">
            </router-link>
            </ul>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Registropacientes2',
    data: function(){
        return{
            selActividadFisica: " ",
            selAdicciones: " "
        }
    },
    setup() {
        
    },
}
</script>