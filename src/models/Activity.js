import store from '@/store';
import { Mission } from './Mission';

export const ActivityCategories = [ // Scenari attività
	{ id: 0, label: 'Non specificata'},
	{ id: 1, label: 'Open'},
	{ id: 2, label: 'Specific'},
	{ id: 3, label: 'Limited Open Category'},
	{ id: 4, label: 'Certified'},
];

export const ActivityScenaries = [ // Scenari attività
	{ id: 0, label: 'Non specificato'},
	{ id: 1, label: 'area non popolata'},
	{ id: 2, label: 'area controllata in ambiente urbano'},
	{ id: 3, label: 'area urbana'},
];

export const ActivityFlightTypes = [ // Scenari attività
	{ id: 0, label: 'Non specificato'},
	{ id: 1, label: 'Operazioni specializzate'},
	{ id: 2, label: 'Addestramento'},
	{ id: 3, label: 'Istituzionale'},
	{ id: 4, label: 'Esame'},
];


export const ActivityTypes = [ // Finalità intervento
	{ id: 0, label: 'Non specificata'},
	{ id: 1, label: 'Attività documentale/comunicazione'},
	{ id: 2, label: 'Monitoraggio speditivo 2D'},
	{ id: 3, label: 'Mappatura e modellazione 3D'},
	{ id: 4, label: 'Alluvione/Esondazione'},
	{ id: 5, label: 'Evento sismico'},
	{ id: 6, label: 'Antincendio boschivo'},
	{ id: 7, label: 'Attività di Polizia Giudiziaria'},
];

export class Activity {
	
	constructor( data ) {
		let d = data || {};

		this.id = d.id || null;
		this.title = d.title || '';
		this.dt = d.dt || new Date();
		this.municipality_code = d.municipality_code || null;
		this.locality = d.locality || '';
		this.alt = d.alt || 0;
		this.lat = d.lat || 0;
		this.lon = d.lon || 0;
		this.flight_max_height = d.flight_max_height || 100;
		this.category = d.category || 0;
		this.scenary = d.scenary || 0;
		this.flight_type = d.flight_type || 0;
		this.type = d.type || 0;
	}

	save() {
		// debugger; // eslint-disable-line
		store.dispatch('saveActivity', {
			id: this.id,
			title: this.title,
			dt: this.dt,
			municipality_code: this.municipality_code,
			locality: this.locality,
			alt: this.alt,
			lat: this.lat,
			lon: this.lon,
			flight_max_height: this.flight_max_height,
			category: this.category,
			scenary: this.scenary,
			flight_type: this.flight_type,
			type: this.type
		});
	}

	missions() {
		return store.state.missions.filter( m => m.activity_id == this.id )
		.map( m => new Mission(m) );
	}

	active_missions() {
		return this.missions().filter( m => m.is_active() );
	}

	last_mission() {
		let landed_missions = this.missions().filter( m => m.dt_end != null );
		if( landed_missions.length == 0 ) return null;

		let res = landed_missions[0];
		for( let i=1; i<landed_missions.length; i++ ) {
			let m = landed_missions[i];
			if( m.dt_end > res.dt_end )
				res = m;
		}

		return res;
	}

	clone_last_mission() {
		let l = this.last_mission();
		if( l != null )
			return l.clone();
		else
			return new Mission( { activity_id: this.id } );
	}

	async add_mission( m ) {
		if( !m )
			return Promise.reject('No mission to add to activity '+this.id);

		m.activity_id = this.id;
		return m.save();
	}




	static async read_all() {
		// debugger; // eslint-disable-line
		await store.dispatch('loadActivities');
		await store.dispatch('loadMissions');
		return store.state.activities.map( a => new Activity(a) );
	}
	
	static get( id ) {
		// debugger; // eslint-disable-line
		let a = store.state.activities.find( it => it.id == id ) || null;
		return new Activity(a);
	}

	static count() {
		let aa = store.state.activities;
		return aa ? aa.length : 0;
	}
}
