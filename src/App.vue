<template>
	<div id="app">
		<b-modal v-model="show_dialog" :hide-footer="true">
			<item-chooser
				labelz="Scegli UAV"
				:selected="dlg_item"
				:available="dlg_available"
				@confirmed="confirmed"
			/>
		</b-modal>
		<hr>
		<b-container fluid class="slot_list">
			<b-row v-for="s in slots" :key="s.id">
				<b-col cols="2" class="slot-label">{{ s.label }}</b-col>
				<b-col cols="10" class="slot-content" @click="choose_for(s)">{{ s.item ? s.item.name : s.placeholder }}</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import ItemChooser from './components/ItemChooser'

import Equipment from '@/models/Equipment'
import SlotTemplate from '@/models/SlotTemplate'

export default {
	name: 'app',
	components: {
		ItemChooser
	},
	setup() {
		console.log( 'setup' ); //eslint-disable-line
	},
	data() {
		return {
			dlg_item: null,
			dlg_available: [],
			the_items: [],
			the_templates: {},
			show_dialog: false,
			slot_edited: null,


			slots: [], // { label, type, required, item }
		};
	},
	computed: {
		available() {
			return this.the_items.filter( x => x.used == false );
		}
	},
	methods: {
		free_items_of_type( ta ) {
			let its = Array.isArray( ta ) ? ta : [ ta ];
			return this.the_items.filter( x => its.indexOf( x.type ) >= 0 && x.used == false );
		},
		confirmed(id) {

			this.show_dialog = false;
			// debugger; // eslint-disable-line

			if( this.dlg_item && this.dlg_item.id == id )
				// no item change
				return;

			if( this.dlg_item && this.dlg_item.id ) {
				let old = this.the_items.filter( x => x.id == this.dlg_item.id )[0];
				if( old ) {
					let sl = this.slots.filter( s => s.item && s.item.id == old.id )[0];
					if( sl ) {
						// remove old item from used
						for( let i=0; i<this.slots.length; i++ ) {
							let s = this.slots[i];
							if( s.item ) {
								s.item.used = false;
							}
						}

						// remove old item inferred slots
						let prefix = sl.id + '.';
						this.slots = this.slots.filter( s => !s.id.startsWith(prefix) );
					}

					old.used = false;
					// remove item inferred slots
					// TODO
				}
			}

			let choosed_item = this.the_items.filter( x => x.id == id )[0];
			if( choosed_item ) {
				// Set item as used
				choosed_item.used = true;

				// Add item to edited slot
				let s = this.slots.filter( x => x.id == this.slot_edited)[0];
				s.item = choosed_item;

				// Add slot inferred by new item
				let item_slot = this.the_templates[s.item.slots] || { slots: [] };
				let item_slots = item_slot.slots;
				for( let i=0; i<item_slots.length; i++ ) {
					let child_s = item_slots[i];
					let child_id = s.id + '.' + i;
					this.add_slot( child_id, child_s );
				}
			}
		},
		add_slot( id, slot_template ) {
			let slot = {
				id: id,
				label: slot_template.label,
				type: slot_template.type,
				required: slot_template.required,
				placeholder: slot_template.placeholder,
				item: null
			};
			this.slots.push( slot );
		},
		choose_for( s ) {
			console.log( s ); // eslint-disable-line
			this.dlg_item = s.item;
			let types = Array.isArray(s.type) ? s.type : [s.type];
			this.dlg_available = this.free_items_of_type(types);
			this.slot_edited = s.id;
			this.show_dialog = true;
		},
	},
	async mounted() {
		debugger; // eslint-disable-line
		try {
			this.the_items = await Equipment.read_all();
			this.the_templates = await SlotTemplate.read_all();

			let s = this.the_templates['UAV'].slots[0];
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

<style scoped>
.slot-label {
	background-color: salmon;
	padding: 0.5em;
	padding-right: 1em;
	margin-bottom: 0.5em;
	border-top-left-radius: 0.4em;
	border-bottom-left-radius: 0.4em;
}

.slot-content {
	background-color: #ececec;
	cursor: pointer;
	padding-top: 0.5em;
	margin-bottom: 0.5em;
	border-top-right-radius: 0.4em;
	border-bottom-right-radius: 0.4em;
}
</style>