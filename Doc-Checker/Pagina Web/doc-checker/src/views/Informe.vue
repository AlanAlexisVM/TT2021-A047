<template>
    <div class="Informe" >
        <!--Fuente: https://programmerclick.com/article/17441571952/-->
        <input type="checkbox" v-model="show">
        <select v-model="documento" style="width: 30em">
            <option disabled value=" ">Selecciona un pdf</option>
            <option v-for="item in pdfList" :key="item" :label="item" :v-text="item"></option>
		</select>

		<input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
		<!--<button @click="rotate += 90">&#x27F3;</button>-->
        <button @click="recargar(documento)">&#x27F3;</button>
		<button @click="rotate -= 90">&#x27F2;</button>
        
        <pdf v-bind:src="documento"
            :page="page"
            :rotate="rotate"
            @num-pages="numPages = $event"
            @link-clicked="page = $event"
            style="width: 50%"
            v-if="show" ></pdf>
    </div>    
</template>

<script>
import pdf from 'vue-pdf'

export default {
    name: 'Informe',
    components: {
        pdf
    },
	data () {
		return {
			show: true,
			pdfList: [
                'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
				'http://jornadasciberseguridad.riasc.unileon.es/archivos/ejemplo_esp.pdf',
                'https://campusinteligencialimite.org/fichas/VENTILACI%C3%93N_DE_ESPACIOS',
			],
			documento:' ',
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate: 0,
		}
	},
    setup() {
    },
    methods: {
        // Vista previa del pdf
        previewPDF(url){
            this.documento = pdf.createLoadingTask(url)
        },
        recargar: function(url){
            this.documento = pdf.createLoadingTask(url)
        }
    }
}
</script>