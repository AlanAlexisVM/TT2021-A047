<template>
    <h2>Hola mundo</h2>
    <p>{{message}}</p>
    <label id="message">Mensaje</label><br />
    <input id = "message" v-model="message"/>
</template>

<script>
import { ref } from "vue";
export default{
    name: "HelloWorld",
    setup(){
        const message = ("hello world")
        return {message}
    }
}
</script> 