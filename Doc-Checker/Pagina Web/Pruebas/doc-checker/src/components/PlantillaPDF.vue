<template>
    <div class="PlantillaPDF" >
        <pdf :src="documento" />
    </div>    
</template>

<script>
import pdf from 'vue-pdf'

export default {
    name: 'PlantillaPDF',
    components: {
        pdf
    },
    props: {
        documento: String
    },
    setup() {
    },
    methods: {
        // Vista previa del pdf
        previewPDF(url){
            this.documento = pdf.createLoadingTask(url)
        }
    }
}
</script>