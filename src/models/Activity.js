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

import store from '@/store';

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


}

Activity.read_all = async function() {
	// debugger; // eslint-disable-line
	await store.dispatch('loadActivities');
	return store.state.activities;
}

Activity.get = function( id ) {
	// debugger; // eslint-disable-line
	let a = store.state.activities.find( it => it.id == id ) || null;
	return a;
}