<template>
    <div class="Registropaciientes">
        <form action="/my-handling-form-page" method="post">
        <h1>Crear nuevo paciente</h1>
            <ul>
            
            <li>
                <label for="name">Nombre(s):</label>
                <input type="text" id="name" name="user_name">
            </li>
            <li>
                <label for="name">Apellidos:</label>
                <input type="text" id="name" name="user_last_name">
            </li>

            <li>
                <label for="name">Fecha de nacimiento:</label>
                <input type="text" id="name" name="user_name">
            </li>
            <li>
                <select v-model="selSexo">
                <option disabled value=" ">Sexo</option>
                <option>Masculino</option>
                <option>Femenino</option>
                </select>
            </li>
            <li>
                <label for="name">CURP:</label>
                <input type="text" id="name" name="user_name">
            </li>
            <li>
                <label for="name">Correo electronico:</label>
                <input type="text" id="name" name="user_last_name">
            </li>
            <li>
                <label for="mail">Teléfono 1:</label>
                <input type="email" id="mail" name="user_mail">
            </li>
            <li>
                <label for="name">Teléfono 2:</label>
                <input type="text" id="password" name="user_password">
            </li>
            <li>
                <label for="name">Dirección:</label>
                <input type="text" id="name" name="user_name">
            </li>
            <li>
                <select v-model="selEstado">
                <option disabled value=" ">Estado</option>
                <option>Estado de México</option>
                <option>Ciudad de México</option>
                </select>
            </li>
            <li>
                <label for="mail">Número de placa:</label>
                <input type="email" id="mail" name="user_mail">
            </li>
            <router-link to="/registropacientes2">
                <input type="submit" class="fadeIn fourth" value="Continuar">
            </router-link>
            </ul>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Registropacientes',
    data: function(){
        return{
            selSexo: " ",
            selEstado: " "
        }
    },
    setup() {
        
    }
}
</script>