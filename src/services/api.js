import axios from 'axios';

import { new_id } from '@/utilities/new_id.js'

// const SERVER_URL = 'http://localhost:3000';
// const SERVER_URL = '';
const SERVER_URL = 'http://sapr.protezionecivile.fvg.it';


function adjust_date( dt ) {
	if( typeof( dt ) == 'string' )
		return new Date( dt );
	else
		return dt;
}

function adjust_activity( a ) {
	a.dt = adjust_date( a.dt );
	a.dt_closed = adjust_date( a.dt_closed );
	return a;
}

function adjust_mission( m ) {
	m.dt_start = adjust_date( m.dt_start );
	m.dt_end = adjust_date( m.dt_end );
	return m;
}


function upsert( url, item ) {
	if( item == null ) return {};
	if( item.id == null ) {
		item.id = new_id();
		return axios.post( url, item ).then( (result) => {
			return result.data;
		})
	}
	else {
		return axios.put( url + '/' + item.id, item ).then( (result) => {
			return result.data;
		})
	}
}

let API = {

	get_activities: async function() {
		return axios.get(SERVER_URL + '/activities').then( (result) => {
			let res = result.data;
			res.forEach( adjust_activity );
			return res;
		})
	},
	save_activity: async function( item ) {
		return upsert( SERVER_URL + '/activities' , item ).then( (res) => adjust_activity(res) );
	},


	get_missions: async function() {
		return axios.get(SERVER_URL + '/missions').then( (result) => {
			let res = result.data;
			res.forEach( adjust_mission );
			return res;
		})
	},
	save_mission: async function( item ) {
		return upsert( SERVER_URL + '/missions' , item ).then( (res) => adjust_mission(res) );
	},

	get_equipments: async function() {
		return axios.get(SERVER_URL + '/equipments').then( (result) => {
			return result.data;
		})
	},
	save_equipment: async function( item ) {
		return upsert( SERVER_URL + '/equipments' , item );
	},
	save_equipments: async function( items ) {
		return axios.put( SERVER_URL + '/equipments/batch_update', items ).then( (result) => {
			return result.data;
		})
	},


	get_equipment_types: async function() {
		return axios.get(SERVER_URL + '/equipment_types').then( (result) => {
			return result.data;
		})
	},
	save_equipment_type: async function( item ) {
		return upsert( SERVER_URL + '/equipment_types' , item );
	},

	get_pilots: async function() {
		return axios.get(SERVER_URL + '/pilots').then( (result) => {
			return result.data;
		})
	},
	save_pilot: async function( item ) {
		return upsert( SERVER_URL + '/pilots' , item );
	}

};



export default API;