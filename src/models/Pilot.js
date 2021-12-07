import store from '@/store';

// Pilot is 
// { id, name, user_code, operator_code, EASA_code }
// slots is [ { id, label, placeholder, accepts: [equip_type_id,...] }]

export class Pilot {

	constructor( data ) {
		let d = data || {};

		this.id = d.id || null;
		this.name = d.name || '';
		this.user_code = d.user_code || '';
		this.operator_code = d.operator_code || '';
		this.EASA_code = d.EASA_code || '';
	}

	save() {
		// debugger; // eslint-disable-line
		store.dispatch('savePilot', {
			id: this.id,
			name: this.name,
			user_code: this.user_code,
			operator_code: this.operator_code,
			EASA_code: this.EASA_code
		});
	}


	static get( id ) {
		let item = store.state.pilots.filter( p => p.id == id )[0];
		return item;
	}

	static read_all = async function() {
		return store.dispatch('loadPilots').then( () => store.state.pilots );
	}
	
	static count() {
		return store.state.pilots.length;
	}
}

export default Pilot;