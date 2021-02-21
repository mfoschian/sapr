
// test API service with fixed data

function get_after( millisecs, data ) {
	return new Promise( (resolve ) => {
		setTimeout( () => { resolve(data); }, millisecs );
	});
}


let API = {

	get_equipments: async function() {
		return get_after( 1000, _fake_data.equipments );
	},
	get_slot_templates: async function() {
		return get_after( 1000, _fake_data.templates );
	},

};


const _fake_data = {

	equipments: [
		{ name: "UAV 1", type: "UAV_1", id: "{1111}", descriptor: "UAV_1", slot: null, parent: null },
		{ name: "UAV 2", type: "UAV_2", id: "{2222}", descriptor: "UAV_2", slot: null, parent: null },
		{ name: "Batteria 1", type: "Battery1", id: "{BBBB.1111}", slot: null, parent: null },
		{ name: "Batteria 2", type: "Battery1", id: "{BBBB.1112}", slot: null, parent: null },
		{ name: "Batteria X1", type: "Battery2", id: "{BBXX.1111}", slot: null, parent: null },
		{ name: "Batteria X2", type: "Battery2", id: "{BBXX.1112}", slot: null, parent: null },
		{ name: "Telecomando M5", type: "Remote1", id: "RC_1", slot: null, parent: null },
		{ name: "FLIR", type: "FLIR", id: "FLIR_A", slot: null, parent: null },
		{ name: "WebCam", type: "Cam", id: "Webcam_HD_1", slot: null, parent: null },
	],
	templates: {
		UAV: {
			slots: [
				{ id:'uav', label: "Drone", type: ["UAV_1", "UAV_2"], required: true, placeholder: "Scegli il drone" }
			]
		},
		UAV_1: {
			slots: [
				{ id:"b1", label: "Batteria 1", type: ["Battery1", "Battery2"], required: true, placeholder: "Scegli la batteria" },
				{ id:"b2", label: "Batteria 2", type: ["Battery1", "Battery2"], required: true, placeholder: "Scegli la batteria" },
				{ id:"rc", label: "Telecomando", type: "Remote1", required: true, placeholder: "Scegli il telecomando" },
				{ id:"cam", label: "Fotocamera", type: ["Cam","FLIR"], required: false, placeholder: "Scegli la fotocamera" },
			]
		}
	
	},
}


export default API;