<template>
	<BasePage :loading="loading">
		<h3 v-if="!activity && !loading">Attività non trovata</h3>

		<ActivityViewer 
			:activity="activity"
		/>
	</BasePage>
</template>

<script>
import ActivityViewer from '@/components/activity/activity-viewer'
import { Activity } from '@/models/Activity'
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage, ActivityViewer },
	props: {
		activity_id: { type: String, required: true }
	},
	data() {
		return {
			loading: true,
			activity: null
		};
	},
	computed: {
	},
	methods: {
		async load_data() {
			// TODO: error handling
			// debugger; // eslint-disable-line
			let a = Activity.get( this.activity_id );
			if(!a) {
				this.loading = true;
				await Activity.read_all_reactive()
				this.loading = false;
				let a = Activity.get( this.activity_id );
				if( a == null ) {
					console.log( 'Activity %s not found', this.activity_id ); // eslint-disable-line
					alert('Attività non trovata');
					return;
				}
			}
			this.activity = a;
			this.loading = false;
		}
	},
	created() {
		this.load_data();
	}
}
</script>

<style scoped>
.list-item {
	margin-left: 1em;
	margin-right: 1em;
	margin-top: 1em;
	border: 1px solid #00509dff;
	padding: 1em;
	border-radius: 0.5em;
	width: auto;
}
</style>