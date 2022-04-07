<template>
  <tbody>
    <Tupla
      v-bind:datos="datos"
      v-bind:informe="informe"
      v-bind:signos="signos"
      v-bind:edicion="edicion"
      v-bind:agregar="agregar"
      v-bind:eliminar="eliminar"
      v-bind:rechazar="rechazar"
      v-bind:id="id"
      v-bind:name="name"
    />
  </tbody>
</template>

<script>
import Tupla from "@/components/Tupla.vue";

export default {
  name: "TuplaB",
  components: {
    Tupla,
  },
  props: {
    datos: Array,
    informe: Boolean,
    signos: Boolean,
    edicion: Boolean,
    agregar: Boolean,
    eliminar: Boolean,
    rechazar: Boolean,
    id: String,
    name: String,
  },
  setup() {},
};
</script>
