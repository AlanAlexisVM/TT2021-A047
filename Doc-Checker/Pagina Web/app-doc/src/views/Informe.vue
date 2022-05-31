<template>
    <div class="Informe" >
        <!--Fuente: https://programmerclick.com/article/17441571952/-->
        <!-- <input type="checkbox" v-model="show"> -->
		<select v-model="src" style="width: 30em">
			<option v-for="item in pdfList" :label="item" :key="item" v-text="item"></option>
		</select>
		<p><b>{{page}}/{{numPages}}</b></p>
		<button @click="decrease">▲</button>
		<button @click="increase">▼</button> 

		<button @click="zoomOut">-</button>
		<button @click="zoomIn">+</button>

		<button @click="rotate += 90">&#x27F3;</button>
		<button @click="rotate -= 90">&#x27F2;</button>
		<button @click="$refs.pdf.print()">print</button>
		<div style="padding: 3% 0">
			<div style="display: inline-block;" :style="{ width: zoom * 100 + '%' }">
				<div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center; padding: 3em;" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
				<pdf v-if="show" ref="pdf" style="border: 1px solid red;" :src="src" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf>
			</div>
		</div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
    name: 'Informe',
    components: {
		pdf,
	},
	data () {
		return {
			show: true,
			pdfList: [
				'http://192.168.1.103:8081/Reporte.pdf'
			],
			src:'',
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate: 0,
			zoom: 0.8
		}
	},
	methods: {
		password: function(updatePassword, reason) {
			console.log(reason);
			updatePassword(prompt('password is "test"'));
		},
		error: function(err) {

			console.log(err);
		},
		increase(){
			if(this.page>=this.numPages) return
			this.page++ 
		},
		decrease(){
			if(this.page<=1) return
			this.page--
		},
		zoomIn(){			
			this.zoom+=0.1 
		},
		zoomOut(){
			this.zoom-=0.1
		}
	}
}
</script>