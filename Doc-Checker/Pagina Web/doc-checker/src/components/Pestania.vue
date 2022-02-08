<template>
    <div>
        <li>
            Pestania
            <img src={{ imagen }} />
        </li>
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