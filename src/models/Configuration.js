import store from '@/store';
import Equipment from './Equipment';

class Configuration {

	constructor(options) {
		let c = options || {};
		this.id = c.id || null;
		this.assignments = c.assignments || [];

		// assignments è
		//	[ { slot_id, equip_id, child_cfg_id } ]
	}

	static get( id ) {
		let item = store.state.configurations.find( m => m.id == id );
		return new Configuration(item);
	}

	async assign( slot_id, equip_id ) {
		// TODO: capire quando impostare come free gli oggetti precedentemente assegnati
		await store.dispatch( 'upsertConfigAssignment', { 
			cfg_id: this.id,
			slot_id: slot_id,
			equip_id: equip_id,
			child_cfg_id: this.child_cfg_id
		});
		this.equip_id = equip_id;
		this.slot_id = slot_id;
	}
}