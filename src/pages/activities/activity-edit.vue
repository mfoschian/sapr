<template>
	<BasePage title="Modifica attività" >
		<ActivityForm :activity="activity" @saved="$router.replace('/activities')"/>
	</BasePage>
</template>

<script>
// import { Activity } from '@/models/Activity'
import ActivityForm from '@/components/activity/activity-form'
import BasePage from '@/pages/base-page'

export default {
	components: { ActivityForm, BasePage },
	props: {
		activity: { type: Object, required: true }
	},
	computed: {
		
	},
	methods: {
	}
}
</script>
