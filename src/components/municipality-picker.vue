<template>
	<b-form-select
		id="fase-operativa"
		v-model="istat_code"
		:options="choices"
		stacked
		align="left"
		:state="valid_selection"
		@change="$emit('input',istat_code)"
	>
	</b-form-select>	
</template>

<script>

import Municipalities from '../../data/municipalities.fvg.csv'


export default {
	props: {
		value: { type: String, default: '' }, // istat_code
	},
	data() {
		return {
			istat_code: this.value || ''
		}
	},
	computed: {
		choices() {
			return Municipalities.map( m => ({value: m.istat_code, text: m.name}));
		},
		valid_selection() {
			return this.istat_code != null && this.istat_code != '';
		}
	},
}
</script>