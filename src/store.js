import API from '@/services/api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)




let _store = new Vuex.Store({
	state: {
		activities: [],
		missions: [],
		equipments: [],
		pilots: [],
		slot_templates: {},
		equipment_types: {},
		configurations: [],
		on_line: true
	},
	getters: {

	},
	mutations: {
		setActivities( state, data ) { state.activities = data;	},
		addActivity( state, data ) { state.activities.push( data );	},
		updateActivity( state, data ) {
			let ix = state.activities.findIndex( a => a.id == data.id );
			if( ix < 0 ) throw new Error( 'Activity not found' );
			state.activities.splice( ix, 1, data );
		},

		setMissions( state, data ) { state.missions = data;	},
		addMission( state, data ) { state.missions.push( data );	},
		updateMission( state, data ) {
			let ix = state.missions.findIndex( a => a.id == data.id );
			if( ix < 0 ) throw new Error( 'Mission not found' );
			state.missions.splice( ix, 1, data );
		},

		setConfigurations( state, data ) { state.configurations = data;	},
		addConfiguration( state, data ) { state.configurations.push( data );	},
		updateConfiguration( state, data ) {
			let ix = state.configurations.findIndex( a => a.id == data.id );
			if( ix < 0 ) throw new Error( 'Configuration not found' );
			state.configurations.splice( ix, 1, data );
		},
		upsertConfigAssignment( state, data ) {
			let c = state.configurations.find( a => a.id == data.cfg_id );
			if( !c ) throw new Error( 'Configuration not found' );
			let assignments = c.assignments;
			let a = { 
				slot_id: data.slot_id,
				equip_id: data.equip_id,
				child_cfg_id: data.child_cfg_id
			};
			let ix = assignments.findIndex( a => a.slot_id = data.slot_id )
			if( ix < 0 ) {
				assignments.push( a );
			}
			else {
				assignments.splice( ix, 1, a );
			}
		},

		setEquipments( state, data ) { state.equipments = data;	},
		setEquipmentTypes( state, data ) { state.equipment_types = data; },
		setEquipmentAssignment( state, { equip, mission_id } ) {
			if(!equip) return;
			equip.mission_id = mission_id;
		},
		removeEquipmentAssignment( state, data ) {
			let equip = data.equip;
			if(!equip) return;
			equip.mission_id = null;
		},
		setEquipmentsAssignment( state, { equips, mission_id } ) {
			if(! Array.isArray(equips) ) return;
			equips.forEach( equip => {
				equip.mission_id = mission_id;
			});
		},
		removeEquipmentsAssignment( state, equips ) {
			if(! Array.isArray(equips) ) return;
			equips.forEach( equip => {
				equip.mission_id = null;
			});
		},

		setPilots( state, data ) { state.pilots = data; },
		addPilot( state, data ) { state.pilots.push( data );	},
		updatePilot( state, data ) {
			let ix = state.pilots.findIndex( a => a.id == data.id );
			if( ix < 0 ) throw new Error( 'Pilot not found' );
			state.pilots.splice( ix, 1, data );
		}
	},
	actions: {
		async loadActivities( {commit} ) {
			try {
				let data = await API.get_activities();
				commit( 'setActivities', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async saveActivity( {commit}, item ) {
			try {
				let is_new = item.id == null;
				let data = await API.save_activity( item );
				if( is_new )
					commit( 'addActivity', data );
				else
					commit( 'updateActivity', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		
		async loadMissions( {commit} ) {
			try {
				let data = await API.get_missions();
				commit( 'setMissions', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async saveMission( {commit}, item ) {
			try {
				let is_new = item.id == null;
				let data = await API.save_mission( item );
				if( is_new )
					commit( 'addMission', data );
				else
					commit( 'updateMission', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		
		
		async loadEquipments( {commit} ) {
			try {
				let data = await API.get_equipments();
				commit( 'setEquipments', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async loadEquipmentTypes( {commit} ) {
			try {
				let data = await API.get_equipment_types();
				commit( 'setEquipmentTypes', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async assignEquipment( {commit}, data ) {
			commit( 'setEquipmentAssignment', data );
			await API.save_equipment( data.equip );
		},
		async freeEquipment( {commit}, data ) {
			commit( 'removeEquipmentAssignment', data );
			await API.save_equipment( data );
		},
		async assignEquipments( {commit}, data ) {
			commit( 'setEquipmentsAssignment', data );
			await API.save_equipments( data );
		},
		async freeEquipments( {commit}, data ) {
			commit( 'removeEquipmentsAssignment', data );
			await API.save_equipments( data );
		},


		async loadConfigurations( {commit} ) {
			try {
				let data = await API.get_configurations();
				commit( 'setConfigurations', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async saveConfiguration( {commit}, item ) {
			try {
				let is_new = item.id == null;
				let data = await API.save_configuration( item );
				if( is_new )
					commit( 'addConfiguration', data );
				else
					commit( 'updateConfiguration', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},		
		async upsertConfigAssignment( {commit}, data )	{
			try {
				commit('upsertConfigAssignment', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},

		async loadPilots( {commit} ) {
			try {
				let data = await API.get_pilots();
				commit( 'setPilots', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		async savePilot( {commit}, item ) {
			try {
				let is_new = item.id == null;
				let data = await API.save_pilot( item );
				if( is_new )
					commit( 'addPilot', data );
				else
					commit( 'updatePilot', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},

	}
});

export default _store;