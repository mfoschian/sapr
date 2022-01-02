<template>
	<BasePage title="Scegli fra le seguenti possibilità">
		<b-container fluid="md" class="boxgrid" >
			<b-row v-if="active_mission != null"
				cols="1" cols-sm="2" cols-md="3" cols-lg="4" align-v="stretch"
			>
				<b-col>
					<b-card title="Missione in corso" >
						<!-- <b-card-text>Gestisci le attività che hai creato</b-card-text> -->
						<b-link :to="{name: 'control-mission', params: active_mission_params }" class="stretched-link"/>
					</b-card>
				</b-col>
			</b-row>
			<b-row 
				cols="1" cols-sm="2" cols-md="3" cols-lg="4" align-v="stretch"
			>
				<b-col v-if="activities_count > 0">
					<b-card title="Elenco attività" >
						<b-card-img
							:src="require('@/assets/icons/list.svg')"
							height="80"
						/>
						<b-card-text>{{ activities_count }} attività in corso</b-card-text>
						<b-link to="/activities" class="stretched-link"/>
					</b-card>
				</b-col>
				<b-col >
					<b-card title="Nuova attività" >
						<!-- <b-card-text>Gestisci le attività che hai creato</b-card-text> -->
						<div class="p-4">
							<b-icon icon="plus-circle" font-scale="4"></b-icon>
							<!-- <b-icon icon="plus-circle" animation="spin" font-scale="4" shift-v="8"></b-icon> -->
						</div>
						<b-link to="/activities/new" class="stretched-link"/>
					</b-card>
				</b-col>
			</b-row>

			<b-row 
				cols="1" cols-sm="2" cols-md="3" cols-lg="4" align-v="stretch"
			>
				<b-col >
					<b-card title="Piloti"
					>
						<b-card-img
							:src="require('@/assets/icons/pilot.svg')"
							height="80"
						/>
						<!-- <b-card-text>Anagrafica piloti</b-card-text> -->
						<b-link to="/pilots" class="stretched-link"/>
					</b-card>
				</b-col>
			</b-row>

			<b-row 
				cols="1" cols-sm="2" cols-md="3" cols-lg="4" align-v="stretch"
			>
				<b-col >
					<b-card title="Reports" >
						<b-card-img
							:src="require('@/assets/icons/report.svg')"
							height="80"
						/>
						<!-- <b-card-text>Gestisci le attività che hai creato</b-card-text> -->
						<b-link to="/reports" class="stretched-link"/>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
		<!--
		<ul>
			<li v-if="active_mission != null">
				<router-link :to="{name: 'control-mission', params: active_mission_params }">Missione in corso</router-link>
			</li>
			<li v-if="activities_count > 0">
				<router-link to="/activities">Elenco attività ({{ activities_count }})</router-link>
			</li>
			<li><router-link to="/activities/new">Nuova attività</router-link></li>
			<li><router-link to="/pilots">Piloti</router-link></li>
			<li><router-link to="/reports">Reports</router-link></li>
		</ul>
		-->
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

import { Activity } from '@/models/Activity'
import { Mission } from '@/models/Mission'
// import { Equipment } from '@/models/Equipment'
// import { EquipmentType } from '@/models/EquipmentType'

export default {
	components: { BasePage },
	computed: {
		active_mission() {
			return Mission.first_active() || Mission.first_idle();
		},
		active_mission_params() {
			if( this.active_mission )
				return {
					activity_id: this.active_mission.activity_id,
					mission_id: this.active_mission.id
				};
			else
				return null;
		},
		activities_count() {
			return Activity.count();
		}
	},
/*
	methods: {
		async loadBaseData() {
			await EquipmentType.read_all();
			await Equipment.read_all();
		}
	},
	async mounted() {
		await this.loadBaseData();
	}
*/
}
</script>

<style lang="scss">
.access_area {
	text-align: center;
	padding: 5em;
}
.welcome_msg {
	padding: 1.5em;
}
.boxgrid {
	.col {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;

		.card {
			box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.15) !important;
		}
	}
}
</style> 
