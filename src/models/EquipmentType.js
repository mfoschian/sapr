import store from '@/store';

// EquipmentType is 
// { id, model, slots }
// slots is [ { id, label, placeholder, accepts: [equip_type_id,...] }]

export class EquipmentType {

	static get( id ) {
		let item = store.state.equipment_types[ id ];
		return item;
	}

	static read_all = async function() {
		return store.dispatch('loadEquipmentTypes').then( () => store.state.equipment_types );
	}
	
	static count() {
		return Object.keys(store.state.equipment_types).length;
	}
}

export default EquipmentType;