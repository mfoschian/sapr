<template>
	<div class="page">
		<h3>Nuova attività</h3>
		<ActivityForm />

	</div>
</template>

<script>
import { Activity } from '@/models/Activity'
import ActivityForm from '@/components/activity/activity-form'

export default {
	components: { ActivityForm },
	data() {
		return {
			activity: new Activity()
		}
	},
	computed: {

	},
	methods: {
	}
}
</script>