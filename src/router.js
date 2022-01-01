import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import ErrorPage from '@/pages/errors'
import ActivityList from '@/pages/activities/activities-list'
import ActivityNew from '@/pages/activities/activity-new'
import ActivityEditor from '@/pages/activities/activity-edit'

import MissionsListPage from '@/pages/missions/missions-list'
import MissionNewPage from '@/pages/missions/mission-new'
import MissionConfigurePage from '@/pages/missions/mission-configure'
import MissionControlPage from '@/pages/missions/mission-control'

import PilotsListPage from '@/pages/pilots/pilots-list'
import PilotEditor from '@/pages/pilots/pilot-edit'
import PilotNew from '@/pages/pilots/pilot-new'

import ReportsListPage from '@/pages/reports/reports-list'

import { Activity } from '@/models/Activity'
import { EquipmentType } from '@/models/EquipmentType'
import { Equipment } from '@/models/Equipment'
import { Pilot } from '@/models/Pilot'

Vue.use(Router)

let data_loaded = false;
async function ensure_data_is_loaded() {

	console.log('ensure_data_is_loaded'); // eslint-disable-line

	if( data_loaded )
		return;

	await Activity.read_all();
	await EquipmentType.read_all();
	await Equipment.read_all();
	await Pilot.read_all();

	data_loaded = true;
}

let R = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { requiresAuth: false },
			props: true,
			beforeEnter: async (to,from,next) => {
				// debugger; // eslint-disable-line
				await ensure_data_is_loaded();
				next();
			}			
		},
		{
			path: '/errors/:err_type',
			name: 'error',
			component: ErrorPage,
			props: (route) => {
				let message = null;
				switch( route.params.err_type ) {
					case 'activity_not_found':
						message = "Attività non trovata"
						break;
				}
				return {
					message
				}
			},
			meta: { requiresAuth: false }
		},
		{
			path: '/activities',
			name: 'list-activity',
			component: ActivityList,
			props: true,
			beforeEnter: async (to,from,next) => {
				to.params.activities = await Activity.read_all();
				next();
			},
			meta: { requiresAuth: false }
		},
		{
			path: '/activities/new',
			name: 'new-activity',
			component: ActivityNew,
			meta: { requiresAuth: false }
		},
		{
			path: '/activities/:id/edit',
			name: 'edit-activity',
			component: ActivityEditor,
			meta: { requiresAuth: false },
			props: true,
			beforeEnter: (to,from,next) => {
				// debugger; // eslint-disable-line
				console.log( 'About to editing activity %s', to.params.id); // eslint-disable-line
				let activity = Activity.get(to.params.id)
				if( activity == null ) {
					console.log( 'Activity %s not found: route to error page', to.params.id); // eslint-disable-line
					next('/errors/activity_not_found');
				}
				else {
					console.log( 'Going to %s', activity.title || '?'); // eslint-disable-line
					to.params.activity = activity;
					next();
				}
			}
		},
		{
			path: '/activities/:activity_id/missions',
			name: 'activity-missions',
			component: MissionsListPage,
			meta: { requiresAuth: false },
			props: true,
		},
		{
			path: '/activities/:activity_id/missions/new',
			name: 'new-mission',
			component: MissionNewPage,
			meta: { requiresAuth: false },
			props: true,
		},
		{
			path: '/activities/:activity_id/missions/:mission_id',
			name: 'control-mission',
			component: MissionControlPage,
			meta: { requiresAuth: false },
			props: true,
		},
		{
			path: '/activities/:activity_id/missions/:mission_id/configure',
			name: 'configure-mission',
			component: MissionConfigurePage,
			meta: { requiresAuth: false },
			props: true,
		},

		{
			path: '/pilots',
			name: 'pilots-list',
			component: PilotsListPage,
			props: true,
			beforeEnter: async (to,from,next) => {
				to.params.pilots = await Pilot.read_all();
				next();
			},
			meta: { requiresAuth: false }

		},
		{
			path: '/pilots/new',
			name: 'new-pilot',
			component: PilotNew,
			meta: { requiresAuth: false }
		},
		{
			path: '/pilots/:id/edit',
			name: 'edit-pilot',
			component: PilotEditor,
			meta: { requiresAuth: false },
			props: true,
			beforeEnter: (to,from,next) => {
				// debugger; // eslint-disable-line
				console.log( 'About to editing pilot %s', to.params.id); // eslint-disable-line
				let pilot = Pilot.get(to.params.id)
				if( pilot == null ) {
					console.log( 'Pilot %s not found: route to error page', to.params.id); // eslint-disable-line
					next('/errors/pilot_not_found');
				}
				else {
					console.log( 'Going to %s', pilot.name || '?'); // eslint-disable-line
					to.params.pilot = pilot;
					next();
				}
			}
		},


		{
			path: '/reports',
			name: 'reports-list',
			component: ReportsListPage,
			props: true,
			meta: { requiresAuth: false }
		},


		{
			path: "*", redirect: { name: 'home' }
		}
	]
});

R.beforeEach( (to,from,next) => {

	ensure_data_is_loaded().then( next, next );

});


export default R;
