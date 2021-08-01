import store from '@/store';

// EquipmentType is 
// { id, model, slots }
// slots is [ { id, label, placeholder, equip_type_id }]

export class EquipmentType {

	static get( id ) {
		let item = store.state.equipment_types.find( m => m.id == id )[0];
		return item;
	}

}

