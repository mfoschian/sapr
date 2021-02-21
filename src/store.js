import API from '@/services/api.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)




let _store = new Vuex.Store({
	state: {
		equipments: [],
		slot_templates: {},
	},
	getters: {

	},
	mutations: {
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