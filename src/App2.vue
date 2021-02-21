<template>
	<div id="app">
		<ModalItemChooser ref="theDialog" />
		
		<equipment-slot :descriptor="item" />
	</div>
</template>

<script>
// import Vue from 'vue'
import Equipment from '@/models/Equipment'
import SlotTemplate from '@/models/SlotTemplate'

import EquipmentSlot from './components/EquipmentSlot.vue'
import ModalItemChooser from '@/components/ModalItemChooser.vue'

export default {
	name: 'app',
	components: {
		EquipmentSlot, ModalItemChooser
	},
	data() {
		return {
			item: null,
		};
	},
	methods: {
		add_slot( id, slot_template ) {
			// debugger; // eslint-disable-line
			this.item = {
				id: id,
				label: slot_template.label,
				type: slot_template.type,
				required: slot_template.required,
				placeholder: slot_template.placeholder,
				item: null
			};
		},
		async choose_item_for( s ) {
			// console.log( s ); // eslint-disable-line
			// debugger; // eslint-disable-line

			let availables = await Equipment.free_items_of_type(s.type);
			return this.$refs.theDialog.choose( availables, s.item );
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
			let st = await SlotTemplate.find_by_id('UAV');
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

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
