<template>
    <div id="Registropacientes2" class="d-flex justify-content-around">
        <!--<form action="/my-handling-form-page" method="post">-->
        <form id="formulario2">
            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text"  for="name">Actividad física:</label>
                    </div>
                    <select v-model="selActividadFisica" required>
                        <option disabled value=" ">Actividad física</option>
                        <option v-for="(nivel,i) in niveles" :key=nivel :label=nivel :value="num[i]" />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Adicciones:</label>
                    </div>
                    <select v-model="selAdicciones" v-on:click="agregar(selAdicciones2,selAdicciones)" >
                        <option disabled value=" " >Adicciones</option>
                        <option v-for="adiccion in adicciones" :key=adiccion :label=adiccion :value=adiccion />
                    </select>
                </div>
                <ul v-if="selAdicciones2.length">
                    <li v-for="adiccion in selAdicciones2"
                        v-bind:key="adiccion" >
                        {{adiccion}} <div v-on:click="selAdicciones2 = eliminar(selAdicciones2,adiccion)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Antecedentes familiares:</label>
                    </div>
                    <select v-model="selAntecedentes" v-on:click="agregar(selAntecedentes2,selAntecedentes)" >
                        <option disabled value=" ">Antecedentes familiares</option>
                        <option v-for="enfermedad in enfermedades" :key=enfermedad :label=enfermedad :value=enfermedad />
                    </select>
                </div>
                <ul v-if="selAntecedentes2.length">
                    <li v-for="antecedente in selAntecedentes2"
                        v-bind:key="antecedente" >
                        {{antecedente}} <div v-on:click="selAntecedentes2 = eliminar(selAntecedentes2,antecedente)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">¿Consume farmacos?: </label>
                    </div>
                    <select v-model="selFarmacos" required>
                        <option disabled value=" ">Seleccione una opción</option>
                        <option value="1" >Si</option>
                        <option value="0" >No</option>
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Máximo grado de estudios:</label>
                    </div>
                    <select class="form-select" id="inputGroupSelect01" v-model="selGrado" required >
                        <option disabled value=" ">Máximo grado de estudios</option>
                        <option v-for="grado in grados" :key=grado :label=grado :value=grado />
                    </select>
                </div> 
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect02">Estado civil:</label>
                    </div>
                    <select class="form-select" id="inputGroupSelect02" v-model="selEstadoCivil" required>
                        <option disabled value=" ">Estado civil</option>
                        <option v-for="estadoCivil in estadosCiviles" :key=estadoCivil :label=estadoCivil :value=estadoCivil />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name3">Exposición al ruido:</label>
                    </div>
                    <select v-model="selExposicionRuido" required>
                        <option disabled value=" ">Exposición al ruido</option>
                        <option v-for="(nivel,i) in niveles" :key=nivel :label=nivel :value="num[i]" />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name4">Exposición solar:</label>
                </div>
                <select v-model="selExposicionSolar" required>
                    <option disabled value=" ">Exposición solar</option>
                    <option v-for="(nivel,i) in niveles" :key=nivel :label=nivel :value="num[i]" />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name5">Horas de sueño:</label>
                </div>
                <select v-model="selHorasSuenio" required>
                    <option disabled value=" ">Horas de sueño</option>
                    <option v-for="(horasSuenio,i) in horariosSuenio" :key=horasSuenio :label=horasSuenio :value=num[i] />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Padecimientos:</label>
                </div>
                <select v-model="selPadecimientos" v-on:click="agregar(selPadecimientos2,selPadecimientos)" >
                    <option disabled value=" ">Padecimientos</option>
                    <option v-for="enfermedad in enfermedades" :key=enfermedad :label=enfermedad :value=enfermedad />
                </select>
                </div>
                <ul v-if="selPadecimientos2.length">
                    <li v-for="padecimiento in selPadecimientos2"
                        v-bind:key="padecimiento" >
                        {{padecimiento}} <div v-on:click="selPadecimientos2 = eliminar(selPadecimientos2,padecimiento)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="name">Personas dependientes:</label>
                    </div>
                    <select v-model="selPersonasDependientes" required>
                        <option disabled value=" ">Personas dependientes</option>
                        <option v-for="(numero,i) in numeros" :key=numero :label=numero :value=num[i] />
                    </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name" required>Trabajo:</label>
                </div>
                <select v-model="selTrabajo" v-on:click="agregar(selTrabajo2,selTrabajo)" >
                    <option disabled value=" ">Trabajo</option>
                    <option v-for="trabajo in trabajos" :key=trabajo :label=trabajo :value=trabajo />
                </select>
                </div>
                <ul v-if="selTrabajo2.length">
                    <li v-for="trabajo in selTrabajo2"
                        v-bind:key="trabajo" >
                        {{trabajo}} <div v-on:click="selTrabajo2 = eliminar(selTrabajo2,trabajo)"> Eliminar </div>
                    </li>
                </ul>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Variaciones de humedad:</label>
                </div>
                <select v-model="selVariacionesHumedad" required>
                    <option disabled value=" ">Variaciones de humedad</option>
                    <option v-for="(nivel,i) in niveles" :key=nivel :label=nivel :value="num[i]" />
                </select>
                </div>
            </div>

            <div class="row mb-4">
            <div class="input-group mb-3">
                    <div class="input-group-prepend">
                <label class="input-group-text" for="name">Variaciones de temperatura:</label>
                </div>
                <select v-model="selVariacionesTemperatura" required>
                    <option disabled value=" ">Variaciones de Temperatura</option>
                    <option v-for="(nivel,i) in niveles" :key=nivel :label=nivel :value="num[i]" />
                </select>
                </div>
            </div>
            <button v-on:click="registrarPaciente" type="button" name="submit" class="btn btn-success btn-block mb-4">
                Crear paciente
            </button>
        </form>    
    </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global"
export default {
    name: 'Registropacientes2',
    data: function(){
        return{
            selActividadFisica: " ",
            selAdicciones: " ",
            selAdicciones2: [],
            selAntecedentes: " ",
            selAntecedentes2: [],
            selFarmacos: " ",
            selGrado: " ",
            selEstadoCivil: " ",
            selExposicionRuido: " ",
            selExposicionSolar: " ",
            selHorasSuenio: " ",
            selPadecimientos: " ",
            selPadecimientos2: [],
            selPersonasDependientes: " ",
            selTrabajo: " ",
            selTrabajo2: [],
            selVariacionesHumedad: " ",
            selVariacionesTemperatura: " ",
            niveles: ["1 - Nula", "2 - Poca", "3 - Media", "4 - Mucha"],
            enfermedades: ["Diabetes", "Hipertensión"],
            numeros: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
            adicciones: ["Alcoholismo", "Tabaquismo", "A las drogas", "Juegos de azar", "A la comida", "A los videojuegos"],
            grados: ["Sin estudios", "Primaria", "Secundaria", "Bachillerato", "Licenciatura", "Maestria", "Doctorado"],
            estadosCiviles: ["Soltero", "Casado", "Divorciado", "Separación en proceso judicial", "Viudo", "Concubinato"],
            horariosSuenio: ["1 hora", "2 horas", "3 horas", "4 horas", "5 horas", "6 horas", "7 horas", "8 horas", "9 horas", "10 horas", "11 horas", "12 horas"],
            num: [1,2,3,4,5,6,7,8,9,10,11,12],
            trabajos: ["Obrero", "Futbolista"],
        }
    },
    methods: {
        agregar: function(v1,v2){
            if(v2!=" " && !v1.includes(v2)){
                v1.push(v2);
            }
        },
        eliminar: function(v1,v2){
            return v1.filter(function(a) {
                return a !== v2;
            });
        },
        validarExistencia: function(){
            const Curp = this.$route.params.curp;
            let params = new URLSearchParams();
            params.append("curp",Curp);
            axios.post("http://"+global_.server+":"+global_.port_node+"/existeRegistro", params, { withCredentials: true, }).then((result) => {
                if(result.data)
                    this.preLlenado(Curp)
            });
        },
        preLlenado: function(Curp){
            const params = new URLSearchParams();
            params.append('curp', Curp);
            axios.post("http://"+global_.server+":"+global_.port_node+"/obtenerPaciente2", params, { withCredentials: true }).then((result) => {
                this.selActividadFisica = result.data[0].ActividadFisica
                //this.selAdicciones = result.data[0].FechaNac.substring(0,10)
                this.obtener('Adicciones',Curp)
                //this.selAntecedentes = result.data[0].Sexo
                this.obtener('AntecedentesFam',Curp)
                this.selFarmacos = result.data[0].ConsumoDeFarmacos
                this.selGrado = result.data[0].Educacion
                this.selEstadoCivil = result.data[0].EstadoCivil
                this.selExposicionRuido = result.data[0].ExposicionRuido
                this.selExposicionSolar = result.data[0].ExposicionSolar
                this.selHorasSuenio = result.data[0].HorasDeSuenio
                //this.selPadecimientos = result.data[0].IdDCH
                this.obtener('Padecimientos',Curp)
                this.selPersonasDependientes = result.data[0].PersonasDependientes
                //this.selTrabajo = result.data[0].Direccion
                this.obtener('Trabajo',Curp)
                this.selVariacionesHumedad = result.data[0].VariacionesdeHumedad
                this.selVariacionesTemperatura = result.data[0].VariacionesdeTemperatura
            });
        },
        obtener: function(valor, curp){
            const params = new URLSearchParams();
            params.append('valor', valor);
            params.append('curp', curp);
            axios.post("http://"+global_.server+":"+global_.port_node+"/obtener", params, { withCredentials: true }).then((result) => {
                if(valor=="Adicciones")
                    this.selAdicciones2 = result.data
                else if(valor=="AntecedentesFam")
                    this.selAntecedentes2 = result.data
                else if(valor=="Padecimientos")
                    this.selPadecimientos2 = result.data
                else if(valor=="Trabajo")
                    this.selTrabajo2 = result.data
            });
        },
        registrarPaciente: function () {
            if(document.getElementById('formulario2').checkValidity()){
                const params = new URLSearchParams();
                params.append("curp",this.$route.params.curp);
                params.append("actividadFisica", this.selActividadFisica);
                params.append("adicciones", this.selAdicciones2);
                params.append("antecedentes", this.selAntecedentes2);
                params.append("farmacos", this.selFarmacos);
                params.append("gradoEstudios", this.selGrado);
                params.append("estadoCivil", this.selEstadoCivil);
                params.append("expRuido", this.selExposicionRuido);
                params.append("expSolar", this.selExposicionSolar);
                params.append("horasSuenio", this.selHorasSuenio);
                params.append("padecimientos", this.selPadecimientos2);
                params.append("personasDependientes", this.selPersonasDependientes);
                params.append("trabajo", this.selTrabajo2);
                params.append("varHumedad", this.selVariacionesHumedad);
                params.append("varTemperatura", this.selVariacionesTemperatura);
                axios.post("http://"+global_.server+":"+global_.port_node+"/registrarPaciente2", params, { withCredentials: true, }).then((result) => {
                    this.$router.push({ path: result.data });
                });
            }
        }
    },
    setup() {
    },
    created: function(){
        this.validarExistencia()
    }
}
</script>