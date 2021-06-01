<template>
	<div class="page">
		<h3>Nuova attività</h3>
		<div class="form-container">
			<ActivityForm />
		</div>

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

<style scoped>
.form-container {
	width: 100%;
	padding: 1em;;
}
</style>