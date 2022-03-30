<template>
    <div class="container-md pt-5">
        <div class="row">
            <div class="col">
                <router-link to="/Aceptardoc" >
                    <img src="@/assets/doctor.png" height="250"/>
                </router-link>
                <h3>Aceptar doctores</h3>
            </div>
            <div class="col">
                <router-link to ="/Ingresarplaca">
                    <img src="@/assets/placa.png" height="250"/>
                </router-link>
                <h3>Ingresar placas</h3>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>

</style>