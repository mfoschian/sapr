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
		}
	}
});

export default _store;