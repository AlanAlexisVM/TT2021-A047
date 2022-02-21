<template>
    <div class="Mineria" style="height: 75vh;overflow-y: auto;overflow-x: hidden;">
        <!--Fuente: https://programmerclick.com/article/17441571952/-->
        <select v-model="src" style="width: 30em">
            <option disabled value=" ">Selecciona un pdf</option>
            <option v-for="item in pdfList" :key="item" :label="item" :v-text="item"></option>
		</select>
		<input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
		<button @click="rotate += 90">&#x27F3;</button>
		<button @click="rotate -= 90">&#x27F2;</button>
		<button @click="$refs.pdf.print()">print</button>
		<div style="width: 50%">
			<div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
			<pdf v-if="show" ref="pdf" style="border: 1px solid red" :src="src" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
		</div>
    </div>    
</template>

<script>
import pdf from 'vue-pdf'

export default {
    name: 'Mineria',
    components: {
        pdf
    },
	data () {
		return {
			show: true,
			pdfList: [
				'http://jornadasciberseguridad.riasc.unileon.es/archivos/ejemplo_esp.pdf',
                'https://campusinteligencialimite.org/fichas/VENTILACI%C3%93N_DE_ESPACIOS',
			],
			src:' ',
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate: 0,
		}
	},
    setup() {

    },
    methods: {
        password: function(updatePassword, reason) {
            console.log("reason: ",reason)
			updatePassword(prompt('password is "test"'));
            
		},
		error: function(err) {

			console.log(err);
		}
    }
}
</script>