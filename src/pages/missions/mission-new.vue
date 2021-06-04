<template>
	<BasePage title="Nuova missione" >
		<MissionForm 
			:activity_id="activity_id"
			@saved="$router.replace('/activities/'+activity_id+'/missions')"
		/>
	</BasePage>
</template>

<script>
// import { Activity } from '@/models/Activity'
import MissionForm from '@/components/mission/mission-form'
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage, MissionForm },
	props: {
		activity_id: { type: String, required: true },
	},
	computed: {
		// activity() {
		// 	return Activity.get( this.activity_id );
		// }
	}
}
</script>
