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
				v-model.number="sat_rc"
				align="left"
				min="0"
				@change="update"
				:readonly="read_only"
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
				v-model.number="sat"
				align="left"
				min="0"
				@change="update"
				:readonly="read_only"
			></b-form-input>
		</b-form-group>
	</b-form>
</template>

<script>
export default {
	props: {
		value: { type: Object, default: () => ({sat_rc:0, sat:0}) },
		read_only: { type: Boolean, default: false }
	},
	data() {
		return {
			sat_rc: this.value ? this.value.sat_rc || 0 : 0,
			sat: this.value ? this.value.sat || 0 : 0
		}
	},
	methods: {
		update() {
			this.$emit('input', {
				sat_rc: this.sat_rc,
				sat: this.sat
			});
		}
	},
	mounted() {
		if( this.value == null || Object.keys(this.value) == 0 )
			this.update();
	}
}
</script>