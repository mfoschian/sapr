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

import { Activity } from '@/models/Activity'
// import { Mission } from '@/models/Mission'
import { EquipmentType } from '@/models/EquipmentType'
import { Equipment } from '@/models/Equipment'

Vue.use(Router)

let data_loaded = false;
async function ensure_data_is_loaded() {

	console.log('ensure_data_is_loaded'); // eslint-disable-line

	if( data_loaded )
		return;

	await Activity.read_all();
	await EquipmentType.read_all();
	await Equipment.read_all();

	data_loaded = true;
}

let R = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { requiresAuth: false },
			beforeEnter: async (to,from,next) => {
				// debugger; // eslint-disable-line
				await ensure_data_is_loaded();

				// All'avvio dell'applicazione devo vedere se c'è già qualche missione in corso
				// In quel caso devo aprire la pagina della missione in modo da farla completare
				console.log( 'Starting home page'); // eslint-disable-line
				/*
				let mission = Mission.first_active() || Mission.first_idle();
				if( mission != null ) {
					let aid = mission.activity_id;
					let mid = mission.id;
					console.log( 'Activity %s has a mission %s running or idle: go to mission page', aid, mid); // eslint-disable-line
					next({name: 'mission-control', params: { activity_id: aid, mission_id: mid }});
					return;
				}
				*/

				console.log( 'Going to home page'); // eslint-disable-line
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
			path: "*", redirect: { name: 'home' }
		}
	]
});

R.beforeEach( (to,from,next) => {

	ensure_data_is_loaded().then( next, next );

	/*
	if( EquipmentType.count() > 0 && Equipment.count() > 0 )
		next();

	try {	
		EquipmentType.read_all().then( () => {
			return Equipment.read_all()
		}).then( () => {
			next();
		}, (err) => {
			console.error( err ); // eslint-disable-line
			next();
		});
	}
	catch( err ) {
		console.error( err ); // eslint-disable-line
	}
	*/
});


export default R;
