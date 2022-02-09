<template>
    <div>
        <img v-bind:src="imagen"
            height="100"
            width="100"/>
    </div>
</template>

<script>
export default {
    name: 'Pestania',
    props: {
        imagen: String
    }
}
</script>