<template>
	<BasePage title="Scegli fra le seguenti possibilità">
		<ul>
			<li v-if="active_mission != null">
				<router-link :to="{name: 'control-mission', params: active_mission_params }">Missione in corso</router-link>
			</li>
			<li v-if="activities_count > 0">
				<router-link to="/activities">Elenco attività ({{ activities_count }})</router-link>
			</li>
			<li><router-link to="/activities/new">Nuova attività</router-link></li>
			<li><router-link to="/pilots">Piloti</router-link></li>
		</ul>
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