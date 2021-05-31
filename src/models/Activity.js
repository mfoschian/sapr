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



export function Activity() {

	this.dt = new Date();
	this.municipality = null;
	this.locality = '';
	this.alt = 0;
	this.lat = 0;
	this.lon = 0;
	this.flight_max_height = 100;
	this.category = 0;
	this.scenary = 0;
	this.flight_type = 0;
	this.type = 0;

}

