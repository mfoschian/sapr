<template>
	<b-container fluid class="slot_list">
		<b-row v-if="descriptor != null">
			<b-col cols="2" class="slot-label">{{ descriptor.label }}</b-col>
			<b-col cols="10" class="slot-content" >
				<div @click.stop="choose_item" class="clickable">{{ loc_item ? loc_item.name : descriptor.placeholder }}</div>
				<div class="slot-sub-content" v-for="s in item_slots" :key="s.id">
					<equipment-slot :descriptor="s.descriptor" :id="s.id" :item="s.item" :parent_item_id="s.parent_item_id" />
				</div>
			</b-col>
		</b-row>
		<b-row v-else>
			<b-col cols="2" class="slot-label suspance"></b-col>
			<b-col cols="10" class="slot-content suspance"></b-col>
		</b-row>
	</b-container>
</template>

<script>
import Equipment from '@/models/Equipment'
import SlotTemplate from '@/models/SlotTemplate'

export default {
	name: 'EquipmentSlot',
	inject: ['choose_item_for'],
	props: {
		descriptor: { type: Object, default: () => null },
		item: { type: Object, default: () => null },
		id: { type: String, default: () => null },
		parent_item_id: { type: String, default: null }
	},
	data() {
		return {
			loc_item: this.item,
		};
	},
	computed: {
		item_slots() {
			if( this.loc_item == null ) return [];
			let template = SlotTemplate.find_by_id( this.loc_item.descriptor || this.loc_item.type );
			if( !template || !template.slots ) return [];

			let childs = Equipment.get_childs_of( this.loc_item.id );
			let res = template.slots.map( s => ({
				descriptor: s,
				item: childs.filter( x => s.slot == x.id )[0],
				id: s.id,
				parent_item_id: this.loc_item.id
			}));
			return res;
		}
	},
	methods: {
		add_slot( id, slot_template ) {
			let descriptor = {
				id: id,
				label: slot_template.label,
				type: slot_template.type,
				required: slot_template.required,
				placeholder: slot_template.placeholder
			};
			this.childs.push( descriptor );
		},
		async choose_item() {
			// console.log( s ); // eslint-disable-line
			let res = await this.choose_item_for( this.descriptor, this.loc_item );
			console.log( res ); // eslint-disable-line

			if( res.new_id == null )
				// no item change
				return;

			if( res.old_id != null ) {
				Equipment.free_childs_of( res.old_id );
				Equipment.free( res.old_id )
			}
			let choosed_item = Equipment.find_by_id( res.new_id );
			if( choosed_item ) {
				Equipment.assign( choosed_item.id, this.id, this.parent_item_id);
			}

			this.loc_item = choosed_item;
		},
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
}

.slot-content {
	background-color: #ececec;
	padding-top: 0.5em;
	margin-bottom: 0.5em;
	border-top-right-radius: 0.4em;
	border-bottom-right-radius: 0.4em;
}

.clickable {
	cursor: pointer;
}

.suspance {
	min-height: 2.5em;
}

</style>