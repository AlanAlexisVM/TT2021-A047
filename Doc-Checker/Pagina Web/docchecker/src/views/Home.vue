<template>
  <simple-counter />
  <hr />
  <hello-world />
</template>

<script>
import HelloWorld from "@/components/00HelloWorld"
import SimpleCounter from "@/components/01SimpleCounter";
export default{
    name: 'Home',
    components:{
        SimpleCounter,
        HelloWorld,
    }
}
</script>
