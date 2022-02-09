<template>
    <div>
        <router-link v-bind:to="dir">
            <img v-bind:src="imagen"
                height="100"
                width="100" />
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Pestania',
    props: {
        imagen: String,
        dir: String
    }
}
</script>