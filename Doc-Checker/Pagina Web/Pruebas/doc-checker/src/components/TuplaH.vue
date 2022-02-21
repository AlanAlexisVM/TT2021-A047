<template>
    <thead>
        <Tupla v-bind:datos="datos"
                v-bind:th="true" />
    </thead>
</template>

<script>
import Tupla from '@/components/Tupla.vue'

export default{
    name: 'TuplaH',
    components: {
        Tupla
    },
    props: {
        datos: Object
    },
    setup() {
    }
}
</script>
