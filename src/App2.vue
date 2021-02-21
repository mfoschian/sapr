<template>
	<div id="app">
		<b-modal v-model="show_dialog" :hide-footer="true" ref="theDialog">
			<item-chooser
				labelz="Scegli UAV"
				:selected="dlg_item"
				:available="dlg_available"
				@confirmed="confirmed"
			/>
		</b-modal>
		
		<equipment-slot :descriptor="item" />
	</div>
</template>

<script>
// import Vue from 'vue'
import Equipment from '@/models/Equipment'
import SlotTemplate from '@/models/SlotTemplate'

import EquipmentSlot from './components/EquipmentSlot.vue'
import ItemChooser from '@/components/ItemChooser.vue'

export default {
	name: 'app',
	components: {
		EquipmentSlot, ItemChooser
	},
	data() {
		return {
			item: {},

			resolve: null,
			dlg_item: null,
			dlg_available: [],
			show_dialog: false,
		};
	},
	methods: {
		confirmed(id) {

			this.show_dialog = false;
			// debugger; // eslint-disable-line

			if( !this.resolve )
				return;

			this.resolve({
				old_id: this.dlg_item ? this.dlg_item.id : null,
				new_id: id
			});
		},
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
			console.log( s ); // eslint-disable-line
			// debugger; // eslint-disable-line
			this.dlg_item = s.item;
			this.dlg_available = await Equipment.free_items_of_type(s.type);
			this.slot_edited = s.id;

			return new Promise( resolve => {
				this.resolve = resolve;
				this.show_dialog = true;
			});
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
