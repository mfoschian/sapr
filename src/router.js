import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home'
import ActivityList from '@/pages/activities/activities-list'
import ActivityNew from '@/pages/activities/activity-new'
import ActivityEditor from '@/pages/activities/activity-edit'
import ErrorPage from '@/pages/errors'

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
				let activity = Activity.get(to.params.id)
				if( activity == null )
					next('/errors/activity_not_found');
				else {
					to.params.activity = activity;
					next();
				}
			}
		},
		{
			path: "*", redirect: { name: 'home' }
		}
	]
});


export default R;
