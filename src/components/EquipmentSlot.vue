<template>
	<b-container fluid class="slot_list">
		<b-row>
			<b-col cols="2" class="slot-label">{{ label }}</b-col>
			<b-col :cols="empty ? 10 : 9" class="slot-content">
				<div @click.stop="choose_item" class="clickable equip_name">{{ equipment_name }}</div>
				<div class="slot-sub-content" v-for="child in child_slots" :key="child.id">
					<equipment-slot
						:label="child.label"
						:placeholder="child.placeholder"
						:accepts="child.accepts"
						:assignment="child.assignment"
						@changed="child_changed($event,child.id)"
					/>
				</div>
			</b-col>
			<b-col v-if="!empty" cols="1">
				<b-button size="sm" @click="remove_item"><b-icon-trash-fill /></b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import Equipment from '@/models/Equipment'
import EquipmentType from '@/models/EquipmentType'

export default {
	name: 'EquipmentSlot',
	inject: ['choose_item_for'],
	props: {
		label: { type: String, default: "" },
		placeholder: { type: String, default: "" },
		accepts: { type: Array, default: () => [] }, // [ equip_type_id, ... ]
		required: { type: Boolean, default: false },
		assignment: { type: Object, default: null }, // { equip_id, children {slot_id: assignment } }
	},
	data() {
		return {
		};
	},
	computed: {
		equipment() {
			if( !this.assignment ) return null;
			return Equipment.find_by_id( this.assignment.equip_id );
		},
		empty() {
			return this.equipment == null;
		},
		equipment_name() {
			if( this.equipment )
				return this.equipment.name;
			else
				return this.placeholder;
		},
		child_slots() {
			if( !this.equipment ) return [];
			// debugger; // eslint-disable-line

			let equip_type = EquipmentType.get( this.equipment.type );
			if( !equip_type ) return [];
			let slots = equip_type.slots || [];
			let children = this.assignment.children || {};
			return slots.map( slot => ({
				id: slot.id,
				label: slot.label,
				placeholder: slot.placeholder,
				accepts: slot.accepts,
				assignment: children[ slot.id ]
			}));
		}
	},
	methods: {
		async free_assignment( ass ) {
			// Segna come libero l'oggetto legato all'assegnazione passata e tutti i suoi figli
			if( !ass || !ass.equip_id ) return;

			await Equipment.free( ass.equip_id );

			if( ass.children ) {
				let child_ass = Object.values(ass.children);
				for( let i=0; i<child_ass.length; i++ ) {
					await this.free_assignment( child_ass[i] );
				}
			}
		},
		async choose_item() {
			// console.log( s ); // eslint-disable-line
			let descriptor = {
				label: this.label,
				placeholder: this.placeholder,
				accepts: this.accepts,
				required: this.required
			};

			let res = await this.choose_item_for( descriptor, this.equipment );
			// console.log( res ); // eslint-disable-line

			if( res.new_id == res.old_id )
				// no item change
				return;

			if( res.old_id != null ) {
				// oggetto sostituito: libera l'oggetto precedente e tutti i suoi figli
				await this.free_assignment( this.assignment );
			}

			if( res.new_id != null ) {
				// Segna come occupato l'equipment scelto 
				await Equipment.assign( res.new_id );
			}

			// Propaga la modifica al contenitore dello slot
			this.$emit( 'changed', { equip_id: res.new_id, children: [] });
		},
		async remove_item() {
			// oggetto rimosso: libera l'oggetto precedente e tutti i suoi figli
			await this.free_assignment( this.assignment );
			// this.$emit( 'changed', { equip_id: null, children: [] });
			this.$emit( 'changed', {} );
		},
		child_changed( ass, slot_id ) {
			// Qui devo propagare la modifica dell'assegnazione figla al contenitore...
			// Significa che devo duplicare l'assegnazione corrente (con lo slot indicato contenente la modifica al figlio)
			// e passsarla al contenitore come nuova assengazione
			// Il free e l'assign dei figli dovrebbe essere già a posto in quanto gestita dal figlio stesso
			if( !this.equipment ) {
				// non dovrebbe accadere: se non ho scelto un elemento non dovrebbe essere possibile avere degli elementi figlio !
				return;
			}

			// Copio tutte le assegnazioni figlie tranne quella dello slot con la modifica: per quella piglio l'assegnazione passata come argomento
			let children = Object.assign( {}, this.assignment.children || {});
			children[slot_id] = ass;

			let new_assignment = {
				equip_id: this.equipment.id,
				children: children
			};

			// console.log( 'new_assignment:'); // eslint-disable-line
			// console.log( new_assignment ); // eslint-disable-line
			this.$emit('changed', new_assignment);
		}
	},
}
</script>

<style scoped>
.slot-label {
	background-color: salmon;
	padding: 0.5em;
	padding-right: 1em;
	margin-bottom: 0.5em;
	border-top-left-radius: 0.4em;
	border-bottom-left-radius: 0.4em;
	text-align: center;
}

.slot-content {
	background-color: #ececec;
	padding-top: 0.5em;
	margin-bottom: 0.5em;
	border-top-right-radius: 0.4em;
	border-bottom-right-radius: 0.4em;
}

.slot-content .equip_name {
	margin-bottom: 0.7em;
}

.clickable {
	cursor: pointer;
}

.suspance {
	min-height: 2.5em;
}

</style>