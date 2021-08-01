<template>
	<div>
		<ModalItemChooser ref="theDialog" />
		
		<equipment-slot :descriptor="descriptor" id="root" />
	</div>
</template>

<script>
// import Vue from 'vue'
import Equipment from '@/models/Equipment'
import SlotTemplate from '@/models/SlotTemplate'

import EquipmentSlot from '@/components/EquipmentSlot.vue'
import ModalItemChooser from '@/components/ModalItemChooser.vue'

export default {
	components: {
		EquipmentSlot, ModalItemChooser
	},
	props: {
		template: { type: String, default: 'UAV' },
		configuration: { type: Object, default: () => null }
	},
	data() {
		return {
			descriptor: null,
		};
	},
	methods: {
		add_slot( id, slot_template ) {
			// debugger; // eslint-disable-line
			this.descriptor = {
				id: id,
				label: slot_template.label,
				type: slot_template.type,
				required: slot_template.required,
				placeholder: slot_template.placeholder
			};
		},
		async choose_item_for( s, item ) {
			// console.log( s ); // eslint-disable-line
			// debugger; // eslint-disable-line

			let availables = Equipment.available_items_of_type(s.type);
			return this.$refs.theDialog.choose( availables, item, s.placeholder );
		},
	},
	provide() {
		return {
			choose_item_for: this.choose_item_for
		};
	},
	async mounted() {
		// debugger; // eslint-disable-line
		try {
			await Equipment.read_all();
			await SlotTemplate.read_all();

			// debugger; // eslint-disable-line
			let st = SlotTemplate.find_by_id(this.template);
			console.log( st ); // eslint-disable-line
			if( !st || !st.slots ) {
				console.error('Cannot find UAV template'); // eslint-disable-line
				return;
			}
			let s = st.slots[0];
			this.add_slot( 'UAV.1', s );
		}
		catch( err ) {
			console.error( err ); // eslint-disable-line
		}
	},
}
</script>

