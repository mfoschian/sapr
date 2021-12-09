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
			<b-col sm="10">{{ activity.dt | dt }}</b-col>
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

		<b-row>
			<b-col sm="2">Missioni: ({{ missions.length }})</b-col>
			<b-col sm="10">
				<div v-if="!mission_running"
					class="mission-item text-center">
					<b-button
						variant="primary"
						@click="add_mission"
					>
						<b-icon-record-circle />
						Nuova missione
					</b-button>
				</div>
				<div class="mission-item" v-for="m in ordered_missions" :key="m.id" >
					<MissionControl	:mission="m" />
				</div>
			</b-col>
		</b-row>
<!-- 
		<div class="buttons">
			<b-button
				v-if="missions.length > 0"
				variant="warning"
				@click="close_activity"
			>
				<b-icon-lock-fill />
				Chiudi Attività
			</b-button>
		</div>
-->
	</b-container>
</template>

<script>
import { Activity, ActivityCategories, ActivityScenaries, ActivityFlightTypes, ActivityTypes } from '@/models/Activity'
// import { Mission } from '@/models/Mission'
import Municipalities from '../../../data/municipalities.fvg.csv'
import { formatDt } from '@/utilities/dates.js'

import MissionControl from '@/components/mission/mission-control'

import { sort_composition } from '@/utilities/sort_utilities'


function sort_by_dt_reverse(a,b) {
	const d1 = a.dt_start;
	const d2 = b.dt_start;
	return d1 < d2 ? 1 : d1 > d2 ? -1 : 0;
}

function sort_by_status(a,b) {
	// Lo stato attivo va in cima, quello terminato va in fondo, il resto in mezzo
	let s1 = a.is_active() ? 10 : a.is_terminated() ? 0 : 5;
	let s2 = b.is_active() ? 10 : b.is_terminated() ? 0 : 5;

	return s2 - s1;
}



export default {
	components: { MissionControl },
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
		missions() {
			return this.activity.missions();
		},
		active_missions() {
			return this.missions.filter( m => m.is_active() );
		},
		ordered_missions() {
			const sort_criteria = [ sort_by_status, sort_by_dt_reverse ];
			return this.missions.concat().sort( sort_composition( sort_criteria ) )
		},
		mission_running() {
			let mm = this.missions.filter( m => m.dt_end == null );
			return mm.length > 0;
		},
		last_mission() {
			return this.ordered_missions[0];
		}
	},
	methods: {
		async add_mission() {
			let m = this.activity.clone_last_mission();
			await m.save();
			let ok = await m.assign_equipment();

			if(!ok) {
				// Notify user that some equipment is already used elsewhere
				console.error( 'ERR: some equipmenti is already used elsewhere. Review configuration'); // eslint-disable-line
			}
			// this.$router.push({name: 'new-mission', params: {
			// 	a_id: this.activity_id
			// }});			
		}
	},
	filters: {
		dt(v) {
			return formatDt(v);
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

.mission-item {
	padding: 0.5em;
	border: 1px solid black;
	margin-bottom: 0.1em;
	border-radius: 0.5em;
}
</style>