<template>
	<div>
		<ModalItemChooser ref="theDialog" />
		
		<equipment-slot
			:label="label" :placeholder="placeholder"
			:accepts="available_uav_types"
			:assignment="value"
			:mission_id="mission_id"
			:read_only="read_only"
			@changed="$emit('input',$event)"
		/>
	</div>
</template>

<script>
// import Vue from 'vue'
import Equipment from '@/models/Equipment'

import EquipmentSlot from '@/components/EquipmentSlot.vue'
import ModalItemChooser from '@/components/ModalItemChooser.vue'

export default {
	components: {
		EquipmentSlot, ModalItemChooser
	},
	props: {
		label: { type: String, default: 'Drone' },
		placeholder: { type: String, default: 'Scegli il drone' },
		available_uav_types: { type: Array, default: () => ['UAV_1', 'UAV_2'] }, // TODO: mettere l'array in una prop nel db e togliere la cablatura
		assignments: { type: Array, default: () => [] },
		value: { type: Object, default: null },
		mission_id: { type: String, default: null },
		read_only: { type: Boolean, deafult: false }
	},
	data() {
		return {
		};
	},
	methods: {
		async choose_item_for( s, item ) {
			// console.log( s ); // eslint-disable-line
			// debugger; // eslint-disable-line

			let availables = Equipment.available_items_of_type(s.accepts);
			return this.$refs.theDialog.choose( availables, item, s.placeholder );
		},
	},
	provide() {
		return {
			choose_item_for: this.choose_item_for
		};
	},
}
</script>

