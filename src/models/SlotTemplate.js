import store from '@/store.js'

function SlotTemplate() {

}


SlotTemplate.read_all = async function() {
	return store.dispatch('loadSlotTemplates').then( () => store.state.slot_templates );
}

SlotTemplate.find_by_id = function(id) {
	return store.state.slot_templates[id];
}

export default SlotTemplate;