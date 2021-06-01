<template>
	<b-container fluid>
		<b-row>
			<b-col sm="10"></b-col>
			<b-col sm="2">
				<b-button size="sm" title="edit" :to="'/activities/'+activity.id+'/edit'"><b-icon-pencil /></b-button>
			</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Titolo</b-col>
			<b-col sm="10">{{ activity.title }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Data Attività</b-col>
			<b-col sm="10">{{ activity.dt }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Comune</b-col>
			<b-col sm="10">{{ municipality_name }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Località</b-col>
			<b-col sm="10">{{ activity.locality }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Coordinate</b-col>
			<b-col sm="3">Lat: {{ activity.lat }}</b-col>
			<b-col sm="3">Lon: {{ activity.lon }}</b-col>
			<b-col sm="3">Alt: {{ activity.alt }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Max Altezza</b-col>
			<b-col sm="10">{{ activity.flight_max_height }} (m slm)</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Categoria Operazioni</b-col>
			<b-col sm="10">{{ category_label }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Scenario</b-col>
			<b-col sm="10">{{ scenary_label }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Scopo del Volo</b-col>
			<b-col sm="10">{{ flight_type_label }}</b-col>
		</b-row>

		<b-row>
			<b-col sm="2">Finalità intervento</b-col>
			<b-col sm="10">{{ act_type_label }}</b-col>
		</b-row>

		<div class="buttons">
			<b-button
				variant="primary"
				@click="add_mission"
			>
				<b-icon-record-circle />
				Avvia missione
			</b-button>
		</div>
	</b-container>
</template>

<script>
import { Activity, ActivityCategories, ActivityScenaries, ActivityFlightTypes, ActivityTypes } from '@/models/Activity'
import Municipalities from '../../../data/municipalities.fvg.csv'

export default {
	components: {},
	props: {
		activity: { type: Object, default: () => new Activity() }
	},
	data() {
		return {
		}
	},
	computed: {
		municipality_name() {
			const m = Municipalities.find( m => m.istat_code == this.activity.municipality_code ) || {};
			return m.name;
		},
		category_label() {
			const item = ActivityCategories.find( x => x.id == this.activity.category ) ||{};
			return item.label;
		},
		scenary_label() {
			const item = ActivityScenaries.find( x => x.id == this.activity.scenary ) ||{};
			return item.label;
		},
		flight_type_label() {
			const item = ActivityFlightTypes.find( x => x.id == this.activity.flight_type ) ||{};
			return item.label;
		},
		act_type_label() {
			const item = ActivityTypes.find( x => x.id == this.activity.type ) ||{};
			return item.label;
		},
	},
	methods: {
		add_mission() {
			this.$router.push({name: 'activity-missions', params: { activity: this.activity }})
		}
	}
}
</script>

<style scoped>
.buttons {
	margin-top: 2.5em;
	/* text-align: center; */
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>