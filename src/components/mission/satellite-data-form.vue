<template>
	<b-form>
		<b-form-group
			label="Satelliti da 'Radiocomando Master'"
			label-for="num-sat-rc"
			label-cols-sm="2"
		>
			<b-form-input
				type="number"
				id="num-sat-rc"
				v-model="sat_rc"
				align="left"
				min="0"
			></b-form-input>
		</b-form-group>


		<b-form-group
			label="Satelliti da GPS"
			label-for="num-sat"
			label-cols-sm="2"
		>
			<b-form-input
				type="number"
				id="num-sat"
				v-model="sat"
				align="left"
				min="0"
			></b-form-input>
		</b-form-group>
	</b-form>
</template>

<script>
export default {
	props: {
		cfg: { type: Object, default: () => ({sat_rc:0, sat:0}) }
	},
	data() {
		return {
			sat_rc: this.cfg.sat_rc || 0,
			sat: this.cfg.sat || 0
		}
	}
}
</script>