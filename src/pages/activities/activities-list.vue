<template>
	<div>
		<ActivityViewer v-for="a in activities_to_show" :key="a.id"
			class="list-item"
			:activity="a"
		/>
	</div>
</template>

<script>
import ActivityViewer from '@/components/activity/activity-viewer'
import { Activity } from '@/models/Activity.js'

export default {
	components: { ActivityViewer },
	props: {
		limit: { type: Number, default: 5 }
	},
	data() {
		return {
			activities: []
		};
	},
	computed: {
		activities_to_show() {
			let res = this.activities.concat().sort( (a,b) => a.dt < b.dt ? 1 : a.dt > b.dt ? -1 : 0 );
			return res.slice(0,this.limit);
		}
	},
	methods: {
		async load_items() {
			this.activities = await Activity.read_all();
		}
	},
	mounted() {
		this.load_items();
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