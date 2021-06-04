import store from '@/store';

export class Mission {

	constructor(options) {
		let m = options || {};
		this.id = m.id || null;
		this.activity_id = m.activity_id;
		this.dt_start = m.dt_start || new Date();
		this.dt_end = m.dt_end;
		this.configuration = m.configuration || null;
	}

	is_configured() { return this.configuration != null; }
	is_idle() { return this.is_configured() && this.dt_start == null;  }
	is_active() { return this.is_configured() && this.dt_start != null && this.dt_end == null;  }
	is_terminated() { return this.is_configured() && this.dt_start != null && this.dt_end != null; }

	save() {
		// debugger; // eslint-disable-line
		return store.dispatch('saveMission', {
			id: this.id,
			activity_id: this.activity_id,
			status: this.status,
			dt_start: this.dt_start,
			dt_end: this.dt_end,
			configuration: this.configuration
		});
	}

	// static async read( activity_id ) {
	// 	await store.dispatch('loadMissions');
	// 	return store.state.missions.filter( m => m.activity_id == activity_id );
	// }

	landed() {
		this.dt_end = new Date();
		return this.save();
	}

	take_off() {
		this.dt_start = new Date();
		return this.save();
	}
}



