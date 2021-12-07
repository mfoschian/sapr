<template>
	<BasePage title="Scegli fra le seguenti possibilità">
		<ul>
			<li><router-link to="/activities">Elenco attività</router-link></li>
			<li><router-link to="/activities/new">Nuova attività</router-link></li>
			<li><router-link to="/pilots">Piloti</router-link></li>
		</ul>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

import Equipment from '@/models/Equipment'
import EquipmentType from '@/models/EquipmentType'

export default {
	components: { BasePage },
	methods: {
		async loadBaseData() {
			await EquipmentType.read_all();
			await Equipment.read_all();
		}
	},
	async mounted() {
		await this.loadBaseData();
	}
	
}
</script>