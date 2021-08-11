<template>
	<b-form>
		<b-form-group
			label="Copertura nuvolosa"
			label-for="sel-clouds_coverage"
			label-cols-sm="2"
		>
			<b-form-select
				id="sel-clouds_coverage"
				v-model="clouds_coverage"
				:options="clouds_coverage_options"
				stacked
				align="left"
				@change="update"
			></b-form-select>		
		</b-form-group>

		<b-form-group
			label="Cieling"
			label-for="sel-clouds_height"
			label-cols-sm="2"
		>
			<b-form-select
				id="sel-clouds_height"
				v-model="clouds_height"
				:options="clouds_height_options"
				stacked
				align="left"
				@change="update"
			></b-form-select>		
		</b-form-group>
		
		<b-form-group
			label="Visibilità orizzontale"
			label-for="sel-visibility"
			label-cols-sm="2"
		>
			<b-form-select
				id="sel-visibility"
				v-model="visibility"
				:options="visibility_options"
				stacked
				align="left"
				@change="update"
			></b-form-select>		
		</b-form-group>
				
		<b-form-group
			label="Precipitazione"
			label-for="sel-precipitation"
			label-cols-sm="2"
		>
			<b-form-select
				id="sel-precipitation"
				v-model="precipitation"
				:options="precipitation_options"
				stacked
				align="left"
				@change="update"
			></b-form-select>		
		</b-form-group>
		
		<b-form-group
			label="Velocità vento al suolo"
			label-for="wind-velocity"
			label-cols-sm="2"
		>
			<b-input-group append="m/s">
				<b-form-input
					type="number"
					id="wind-velocity"
					v-model.number="wind_intensity"
					align="left"
					@change="update"
				></b-form-input>
			</b-input-group>
		</b-form-group>

		<b-form-group
			label="Temperatura"
			label-for="the-temperature"
			label-cols-sm="2"
		>
			<b-input-group append="°C">
				<b-form-input
					type="number"
					id="the-temperature"
					v-model.number="temperature"
					align="left"
					@change="update"
				></b-form-input>
			</b-input-group>
		</b-form-group>


		<b-form-group
			label="Umidità"
			label-for="the-humidity"
			label-cols-sm="2"
		>
			<b-input-group append="%">
				<b-form-input
					type="number"
					id="the-humidity"
					v-model.number="humidity"
					align="left"
					@change="update"
				></b-form-input>
			</b-input-group>
		</b-form-group>


		<b-form-group
			label="Pressione"
			label-for="the-pression"
			label-cols-sm="2"
		>
			<b-input-group append="hPa">
				<b-form-input
					type="number"
					id="the-pression"
					v-model.number="pression"
					align="left"
					@change="update"
				></b-form-input>
			</b-input-group>
		</b-form-group>


	</b-form>
</template>

<script>
const default_config = {
	clouds_coverage: 1,
	clouds_height: 1,
	visibility: 1,
	precipitation: 1,
	wind_intensity: 0,
	temperature: 25,
	humidity: 90,
	pression: 5
};


export default {
	props: {
		value: { type: Object, default: () => default_config }
	},
	data() {
		// debugger; // eslint-disable-line
		return Object.assign({}, default_config, this.value );
	},
	computed: {
		clouds_coverage_options() {
			return [
				{ value: 1, text: 'assenza nubi' },
				{ value: 2, text: 'poche nubi' },
				{ value: 3, text: 'nubi sparse' },
				{ value: 4, text: 'copertura con squarci' },
				{ value: 5, text: 'copertura totale' }
			];
		},
		clouds_height_options() {
			return [
				{ value: 1, text: 'altezza nubi > 300 m' },
				{ value: 2, text: 'altezza nubi < 300 m' },
			];
		},
		visibility_options() {
			return [
				{ value: 1, text: '> 500 m' },
				{ value: 2, text: '< 500 m' },
			];
		},
		precipitation_options() {
			return [
				{ value: 1, text: 'assente' },
				{ value: 2, text: 'debole' },
				{ value: 3, text: 'intensa' }
			];
		}
	},
	methods: {
		update() {
			this.$emit('input', {
				clouds_coverage: this.clouds_coverage,
				clouds_height: this.clouds_height,
				visibility: this.visibility,
				precipitation: this.precipitation,
				wind_intensity: this.wind_intensity,
				temperature: this.temperature,
				humidity: this.humidity,
				pression: this.pression
			});
		}
	},
	mounted() {
		if( this.value == null || Object.keys(this.value) == 0 )
			this.update();
	}
}
</script>