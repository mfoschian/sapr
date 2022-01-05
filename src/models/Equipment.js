import store from '@/store.js'

// Equipment
//   "equipments": [ { id, name, type_id, serial_num, used, mission_id } ]


export function Equipment() {

}


Equipment.read_all = async function() {
	return store.dispatch('loadEquipments').then( () => store.state.equipments );
}

Equipment.find_by_id = function( id ) {
	return store.state.equipments.filter( x => x.id == id )[0];
}

Equipment.find_by_mission_id = function( id ) {
	return store.state.equipments.filter( x => x.mission_id == id );
}

Equipment.available_items_of_type = function( types ) {
	let _types = Array.isArray( types ) ? types : [ types ];
	return store.state.equipments.filter( x => _types.indexOf( x.type ) >= 0 && x.mission_id == null );
}

Equipment.assign = async function(item_id, mission_id) {
	// debugger; // eslint-disable-line
	let item = Equipment.find_by_id(item_id);
	if( !item ) return false;

	await store.dispatch('assignEquipment', { equip: item, mission_id: mission_id } );
	return true;
}

Equipment.free = async function(item_id) {
	// debugger; // eslint-disable-line
	let item = Equipment.find_by_id(item_id);
	if( !item ) return false;

	await store.dispatch('freeEquipment', item );
	return true;
}

Equipment.assign_multiple = async function( ids, mission_id ) {
	// debugger; // eslint-disable-line
	let ee = ids.map( id => Equipment.find_by_id(id) );
	let used = ee.filter( e => e.mission_id =! null );

	if( used.length > 0 ) {
		// debugger; // eslint-disable-line
		console.log('already used equipments: ' + used.map( x => x.id ).join(',')); // eslint-disable-line
		// some equipment id already busy: refuse transaction
		return false;
	}

	await store.dispatch('assignEquipments', { equips: ee, mission_id: mission_id } );
	return true;
}

Equipment.free_multiple = async function( mission_id ) {
	// debugger; // eslint-disable-line
	let equips = this.find_by_mission_id( mission_id );
	await store.dispatch('freeEquipments', equips );
	return true;
}


Equipment.count = function() {
	return store.state.equipments.length;
}

export default Equipment;