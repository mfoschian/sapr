import store from '@/store.js'

function Equipment() {

}


Equipment.read_all = async function() {
	return store.dispatch('loadEquipments').then( () => store.state.equipments );
}

Equipment.find_by_id = async function( id ) {
	return store.state.equipments.filter( x => x.id == id )[0];
}

Equipment.free_items_of_type = function( types ) {
	let _types = Array.isArray( types ) ? types : [ types ];
	return store.state.equipments.filter( x => _types.indexOf( x.type ) >= 0 && x.used == false );
}

export default Equipment;