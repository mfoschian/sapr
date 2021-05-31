import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/home'
import ActivityNew from './pages/activities-new'

Vue.use(Router)

let R = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { requiresAuth: false }
		},		{
			path: '/activities/new',
			name: 'new-activity',
			component: ActivityNew,
			meta: { requiresAuth: false }
		},
		{
			path: "*", redirect: { name: 'home' }
		}
	]
});


export default R;
