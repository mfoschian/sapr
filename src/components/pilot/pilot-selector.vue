<template>
	<b-form-select
		v-model="selected"
		:options="pilot_list"
		:disabled="read_only"
		@change="$emit('input',selected)" 
	/>
</template>

<script>
import { Pilot } from '@/models/Pilot';

export default {
	props: {
		value: { type: String, default: null },
		read_only: { type: Boolean, deafult: false }
	},
	data() {
		return {
			selected: this.value,
			pilots: []
		}
	},
	computed: {
		pilot_list() {
			return this.pilots.map( p => (
				{
					value: p.id,
					text: p.name + ' ( ' + p.operator_code +  ' )'
				}
			));
		}
	},
	async mounted() {
		this.pilots = await Pilot.read_all();
	}
}
</script>