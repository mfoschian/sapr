import API from '@/services/api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)




let _store = new Vuex.Store({
	state: {
		activities: [],
		missions: [],
		equipments: [],
		slot_templates: {},
		equipment_types: [],
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
		setSlotTemplates( state, data ) { state.slot_templates = data; },
		setEquipmentAssignment( state, data ) {
			let eq = data.item;
			if(!eq) return;

			eq.slot = data.slot_id;
			eq.parent = data.parent_id;
		},
		removeEquipmentAssignment( state, eq ) {
			if(!eq) return;

			eq.slot = null;
			eq.parent = null;
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
		async loadSlotTemplates( {commit} ) {
			try {
				let data = await API.get_slot_templates();
				commit( 'setSlotTemplates', data );
			}
			catch( err ) {
				console.error( err ); // eslint-disable-line
			}
		},
		assignEquipment( {commit}, data ) {
			commit( 'setEquipmentAssignment', data );
		},
		freeEquipment( {commit}, data ) {
			commit( 'removeEquipmentAssignment', data );
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
		}
	}
});

export default _store;