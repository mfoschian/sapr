import store from '@/store.js'

// Equipment
//   "equipments": [ { id, name, type_id, serial_num, used } ]


export function Equipment() {

}


Equipment.read_all = async function() {
	return store.dispatch('loadEquipments').then( () => store.state.equipments );
}

Equipment.find_by_id = function( id ) {
	return store.state.equipments.filter( x => x.id == id )[0];
}

Equipment.available_items_of_type = function( types ) {
	let _types = Array.isArray( types ) ? types : [ types ];
	return store.state.equipments.filter( x => _types.indexOf( x.type ) >= 0 && x.used == false );
}

Equipment.assign = async function(item_id) {
	let item = Equipment.find_by_id(item_id);
	if( !item ) return false;

	await store.dispatch('assignEquipment', item );
	return true;
}

Equipment.free = async function(item_id) {
	let item = Equipment.find_by_id(item_id);
	if( !item ) return false;

	await store.dispatch('freeEquipment', item );
	return true;
}

Equipment.count = function() {
	return store.state.equipments.length;
}

export default Equipment;