<template>
    <h2>Contador sencillo</h2>
    <h2>{{counter}}</h2>
</template>

<script>
import {ref} from "vue"
export default {
    name: "SimpleCounter",
    setup(){
        const counter = ref(value: 0)

        //const increment = () =>{
        //    counter.value
        //}
    }    
}
</script>


