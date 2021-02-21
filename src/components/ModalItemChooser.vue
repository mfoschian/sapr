<template>
	<b-modal v-model="show_dialog" :hide-footer="true" >
		<item-chooser
			:selected="dlg_item"
			:available="dlg_available"
			@confirmed="confirmed"
		/>
	</b-modal>	
</template>

<script>
import ItemChooser from '@/components/ItemChooser.vue'

export default {
	name: 'ModalItemChooser',
	components: {
		ItemChooser
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
		async choose( availables, current_item ) {
			this.dlg_item = current_item;
			this.dlg_available = availables;

			return new Promise( resolve => {
				this.resolve = resolve;
				this.show_dialog = true;
			});
		},
	}
}
</script>