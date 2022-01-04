import store from '@/store';

import { deep_clone } from '@/utilities/object_utilities.js'
import Equipment from './Equipment';

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
		this.pilot_id = m.pilot_id || null;
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
			sat_info: this.sat_info,
			pilot_id: this.pilot_id
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

	async landed() {
		this.dt_end = new Date();
		return this.save();
	}

	async take_off() {
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
			sat_info : deep_clone( this.sat_info ),
			pilot_id: this.pilot_id
		};

		return new Mission( m );
	}

/*
      "uav_setup": {
        "equip_id": "{1111}",
        "children": {
          "b1": {
            "equip_id": "{BBBB.1111}",
            "children": []
          },
          "b2": {
            "equip_id": "{BBXX.1111}",
            "children": []
          },
          "rc": {
            "equip_id": "RC_1",
            "children": []
          },
          "cam": {
            "equip_id": "FLIR_A",
            "children": []
          }
        }
*/

	_collect_equipment_ids(ids, item) {
		if( item == null )
			return;

		let id = item.equip_id;
		for( let i=0; i<ids.length; i++ ) {
			if( ids[i] == id ) {
				// already visited
				id = null;
				break;
			}
		}

		if( id != null )
			ids.push( item.equip_id );

		let children = Object.values(item.children);
		for( let i=0; i<children.length; i++ ) {
			this._collect_equipment_ids( ids, children[i]);
		}
	}

	async assign_equipment() {
		let ids = [];
		this._collect_equipment_ids( ids, this.uav_setup );

		let ok = await Equipment.assign_multiple( ids );
		return ok;
	}

	async free_equipment() {
		let ids = [];
		this._collect_equipment_ids( ids, this.uav_setup );

		let ok = await Equipment.free_multiple( ids );
		return ok;
	}
}
