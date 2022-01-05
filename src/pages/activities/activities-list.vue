<template>
	<BasePage :title="title">
		<b-button to="/activities/new" size="sm">Nuova</b-button>
		<ActivityViewer v-for="a in activities_to_show" :key="a.id"
			class="list-item"
			:activity="a"
			@changed="load_data"
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
		limit: { type: Number, default: 5 },
		// activities: { type: Array, default: () => [] }
	},
	data() {
		return {
			activities: []
		};
	},
	computed: {
		activities_to_show() {
			let items = this.activities.map( a => new Activity(a) );
			let res = items.sort( (a,b) => a.dt < b.dt ? 1 : a.dt > b.dt ? -1 : 0 );
			return res.slice(0,this.limit);
		},
		title() {
			let l = this.activities.length;
			switch( l ) {
				case 0: return "Nessuna attività da visualizzare";
				case 1: return "Ecco l'unica attività che c'è";
			}
			if( l > this.limit )
				return "Ultime " + this.limit + " attività di " + l;
			return "Ci sono " + l + " attività";
		}
	},
	methods: {
		async load_data() {
			let acts = await Activity.read_all_reactive()
			this.activities = acts.filter( a => a.dt_closed == null );
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