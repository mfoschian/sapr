import store from '@/store.js'

// Equipment
//   "equipments": [ { id, name, type_id, serial_num, used } ]


function Equipment() {

}


Equipment.read_all = async function() {
	return store.dispatch('loadEquipments').then( () => store.state.equipments );
}

Equipment.find_by_id = function( id ) {
	return store.state.equipments.filter( x => x.id == id )[0];
}

Equipment.get_childs_of = function(item_id) {
	return store.state.equipments.filter( x => x.parent == item_id );
}


Equipment.available_items_of_type = function( types ) {
	let _types = Array.isArray( types ) ? types : [ types ];
	return store.state.equipments.filter( x => _types.indexOf( x.type ) >= 0 && x.used == false );
}

Equipment.assign = function(item_id, slot_id, parent_id) {
	let item = Equipment.find_by_id(item_id);
	if( !item ) return false;

	store.dispatch('assignEquipment', { item, slot_id, parent_id })
	return true;
}

Equipment.free = function(item_id) {
	let item = Equipment.find_by_id(item_id);
	if( !item ) return false;

	store.dispatch('freeEquipment', item );
	return true;
}

Equipment.free_childs_of = function(item_id) {
	let childs = Equipment.get_childs_of(item_id);
	for( let i=0; i<childs.length; i++ ) {
		let child = childs[i];
		Equipment.free_childs_of(child.id);
		Equipment.free(child.id);
	}
}

Equipment.choosed_set = function() {
	let items = store.state.equipments.filter( x => x.slot != null );
	return items.map( i => ({
		id: i.id,
		parent_id: i.parent,
		slot_id: i.slot
	}));
}


export default Equipment;