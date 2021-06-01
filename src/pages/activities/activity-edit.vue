<template>
	<div class="page">
		<h3>Modifica attività</h3>
		<div class="form-container">
			<ActivityForm :activity="activity" />
		</div>

	</div>
</template>

<script>
// import { Activity } from '@/models/Activity'
import ActivityForm from '@/components/activity/activity-form'

export default {
	components: { ActivityForm },
	props: {
		activity: { type: Object, required: true }
	},
	computed: {
		
	},
	methods: {
	}
}
</script>

<style scoped>
.form-container {
	width: 100%;
	padding: 1em;;
}
</style>