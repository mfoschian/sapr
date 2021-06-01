
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

function adjust_activity( a ) {
	a.id = String(a.id);
	if( typeof(a.dt) == 'string' )
		a.dt = new Date( a.dt );
}

let API = {

	get_activities: async function() {
		return axios.get(SERVER_URL + '/activities').then( (result) => {
			let res = result.data;
			res.forEach( adjust_activity );
			return res;
		})
	},

	save_activity: async function( act ) {
		if( act == null ) return {};
		if( act.id == null ) {
			return axios.post(SERVER_URL + '/activities', act ).then( (result) => {
				return result.data;
			})
		}
		else {
			return axios.put(SERVER_URL + '/activities/'+act.id, act ).then( (result) => {
				return result.data;
			})
		}
	},

	get_equipments: async function() {
		return axios.get(SERVER_URL + '/equipments').then( (result) => {
			return result.data;
		})
	},
	get_slot_templates: async function() {
		return axios.get(SERVER_URL + '/templates').then( (result) => {
			return result.data;
		})
	},

};



export default API;