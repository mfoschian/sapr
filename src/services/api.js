
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
		{ name: "UAV 1", type: "UAV_1", id: "{1111}", used: false, descriptor: "UAV_1" },
		{ name: "UAV 2", type: "UAV_2", id: "{2222}", used: false, descriptor: "UAV_2" },
		{ name: "Batteria 1", type: "Battery1", id: "{BBBB.1111}", used: false },
		{ name: "Batteria 2", type: "Battery1", id: "{BBBB.1112}", used: false },
		{ name: "Batteria X1", type: "Battery2", id: "{BBXX.1111}", used: false },
		{ name: "Batteria X2", type: "Battery2", id: "{BBXX.1112}", used: false },
		{ name: "Telecomando M5", type: "Remote1", id: "RC_1", used: false },
		{ name: "FLIR", type: "FLIR", id: "FLIR_A", used: false },
		{ name: "WebCam", type: "Cam", id: "Webcam_HD_1", used: false },
	],
	templates: {
		UAV: {
			slots: [
				{ label: "Drone", type: ["UAV_1", "UAV_2"], required: true, placeholder: "Scegli il drone" }
			]
		},
		UAV_1: {
			slots: [
				{ label: "Batteria 1", type: ["Battery1", "Battery2"], required: true, placeholder: "Scegli la batteria" },
				{ label: "Batteria 2", type: ["Battery1", "Battery2"], required: true, placeholder: "Scegli la batteria" },
				{ label: "Telecomando", type: "Remote1", required: true, placeholder: "Scegli il telecomando" },
				{ label: "Fotocamera", type: ["Cam","FLIR"], required: false, placeholder: "Scegli la fotocamera" },
			]
		}
	
	},
}


export default API;