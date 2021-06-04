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
// import { Activity } from '@/models/Activity'
import { Mission } from '@/models/Mission'
import MissionForm from '@/components/mission/mission-form'
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage, MissionForm },
	props: {
		activity_id: { type: String, required: true },
	},
	data() {
		return {
			mission: new Mission( {dt_start: new Date(), activity_id: this.activity_id})
		}
	},
	computed: {
		// activity() {
		// 	return Activity.get( this.activity_id );
		// }
	}
}
</script>
