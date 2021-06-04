<template>
	<BasePage title="Missioni">
		<section class="activity-brief">
			Attività: {{ activity.title }}
		</section>
		<section class="mission-list">
			<b-button size="sm" @click="add_mission" title="Aggiungi missione"><b-icon-plus /></b-button>
			<div>
				<MissionControl v-for="mission in missions_ordered" :key="mission.id" 
					:v-model="mission"
				/>
			</div>
		</section>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'
import MissionControl from '@/components/mission/mission-control'

import { Activity } from '@/models/Activity'
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

	// return s2 - s1;
	return s1 - s2;
}



export default {
	components: { BasePage, MissionControl },
	props: {
		activity_id: { type: String, required: true },
	},
	data() {
		return {
			new_missions: []
		}
	},
	computed: {
		missions() {
			return this.activity.missions();
		},
		missions_ordered() {
			const sort_criteria = [ sort_by_status, sort_by_dt_reverse ];

			let saved_missions = this.missions.concat().sort( sort_composition( sort_criteria ) );

			return this.new_missions.concat().sort( sort_composition( sort_criteria ) )
					.concat( saved_missions );
		},
		activity() {
			return Activity.get( this.activity_id );
		}
	},
	methods: {
		add_mission() {
			// let m = new Mission({activity_id: this.parent_activity.id});
			// this.new_missions.push( m );
			this.$router.push({name: 'new-mission', params: {
				a_id: this.activity_id
			}});
		}
	}

}
</script>