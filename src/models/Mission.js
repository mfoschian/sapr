import store from '@/store';

import { deep_clone } from '@/utilities/object_utilities.js'

export class Mission {

	constructor(options) {
		let m = options || {};
		this.id = m.id || null;
		this.activity_id = m.activity_id;
		this.dt_start = m.dt_start || null;
		this.dt_end = m.dt_end || null;
		this.uav_setup = m.uav_setup || null; // assignment ovvero: { equip_id, children: {slot_id: assignment} }
		this.meteo_info = m.meteo_info || null;
		this.sat_info = m.sat_info || null;
	}

	is_configured() { return this.uav_setup != null && this.uav_setup.equip_id != null; }
	is_idle() { return this.dt_start == null;  }
	is_active() { return this.dt_start != null && this.dt_end == null;  }
	is_terminated() { return this.dt_start != null && this.dt_end != null; }

	save() {
		// debugger; // eslint-disable-line
		return store.dispatch('saveMission', {
			id: this.id,
			activity_id: this.activity_id,
			status: this.status,
			dt_start: this.dt_start || null,
			dt_end: this.dt_end || null,
			// configuration_id: this.configuration_id
			uav_setup: this.uav_setup || null,
			meteo_info: this.meteo_info,
			sat_info: this.sat_info
		});
	}

	static get( id ) {
		let m = store.state.missions.find( m => m.id == id );
		if( !m )
			return null;
		return new Mission(m);
	}
	// static async read( activity_id ) {
	// 	await store.dispatch('loadMissions');
	// 	return store.state.missions.filter( m => m.activity_id == activity_id );
	// }

	landed() {
		this.dt_end = new Date();
		return this.save();
	}

	take_off() {
		this.dt_start = new Date();
		return this.save();
	}

	static first_active() {
		// debugger; // eslint-disable-line
		
		let item = store.state.missions.find( m => {
			return (m.uav_setup != null && m.dt_start != null && m.dt_end == null) 
		});
		if( !item )
			return null;
		else
			return new Mission( item );
	}

	static first_idle() {
		let item = store.state.missions.find( m => (m.uav_setup != null && m.dt_start == null) );
		if( !item )
			return null;
		else
			return new Mission( item );
	}

	clone() {
		let m = {
			activity_id: this.activity_id,
			uav_setup : deep_clone( this.uav_setup ),
			meteo_info : deep_clone( this.meteo_info ),
			sat_info : deep_clone( this.sat_info )
		};

		return new Mission( m );
	}
}
