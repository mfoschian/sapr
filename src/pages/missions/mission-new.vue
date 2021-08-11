<template>
	<BasePage title="Nuova missione" >
		<MissionForm 
			:activity_id="activity_id"
			:mission="mission"
			@saved="$router.replace('/activities/'+activity_id+'/missions')"
		/>
	</BasePage>
</template>

<script>
import { Activity } from '@/models/Activity'
import { Mission } from '@/models/Mission'
import MissionForm from '@/components/mission/mission-form'
import BasePage from '@/pages/base-page'

import { deep_clone } from '@/utilities/object_utilities.js'

export default {
	components: { BasePage, MissionForm },
	props: {
		activity_id: { type: String, required: true },
	},
	data() {
		return {
		}
	},
	computed: {
		activity() {
			return Activity.get( this.activity_id );
		},
		mission() {
			let m = {dt_start: new Date(), activity_id: this.activity_id};
			if( this.activity ) {
				let l = this.activity.last_mission();
				if( l != null ) {
					m.uav_setup = deep_clone( l.uav_setup );
					m.meteo_info = deep_clone( l.meteo_info );
					m.sat_info = deep_clone( l.sat_info );
				}
			}

			return new Mission( m );
		}
	}
}
</script>
