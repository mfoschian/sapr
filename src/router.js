import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import ErrorPage from '@/pages/errors'
import ActivityList from '@/pages/activities/activities-list'
import ActivityNew from '@/pages/activities/activity-new'
import ActivityEditor from '@/pages/activities/activity-edit'

import MissionsListPage from '@/pages/missions/missions-list'
import MissionNewPage from '@/pages/missions/mission-new'

import { Activity } from '@/models/Activity'

Vue.use(Router)


let R = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { requiresAuth: false }
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
			path: "*", redirect: { name: 'home' }
		}
	]
});


export default R;
