<template>
	<b-container fluid class="slot_list">
		<b-row v-if="descriptor != null">
			<b-col cols="2" class="slot-label">{{ descriptor.label }}</b-col>
			<b-col cols="10" class="slot-content" @click.stop="choose_item">
				<div>{{ item ? item.name : descriptor.placeholder }}</div>
				<div class="slot-sub-content" v-for="s in childs" :key="s.id">
					<equipment-slot :descriptor="s" />
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
		descriptor: { type: Object, required: true },
	},
	data() {
		return {
			childs: [], // { label, type, required, item }
			item: null,
		};
	},
	computed: {
	},
	methods: {
		add_slot( id, slot_template ) {
			let descriptor = {
				id: id,
				label: slot_template.label,
				type: slot_template.type,
				required: slot_template.required,
				placeholder: slot_template.placeholder,
				item: null
			};
			this.childs.push( descriptor );
		},
		async choose_item() {
			// console.log( s ); // eslint-disable-line
			let res = await this.choose_item_for( this.descriptor );
			console.log( res ); // eslint-disable-line


			// debugger; // eslint-disable-line

			if( res.new_id == null )
				// no item change
				return;

			if( res.old_id != null ) {
				// let old = this.equipments.filter( x => x.id == this.dlg_item.id )[0];
				let old = await Equipment.find_by_id( res.old_id );
				if( old ) {
					/*
					let sl = this.childs.filter( s => s.item && s.item.id == old.id )[0];
					if( sl ) {
						// remove old item from used
						for( let i=0; i<this.childs.length; i++ ) {
							let s = this.childs[i];
							if( s.item ) {
								s.item.used = false;
							}
						}

						// remove old item inferred childs
						let prefix = sl.id + '.';
						this.childs = this.childs.filter( s => !s.id.startsWith(prefix) );
					}
					*/

					old.used = false;
				}
			}
			let choosed_item = await Equipment.find_by_id( res.new_id );
			if( choosed_item ) {
				// Set item as used
				choosed_item.used = true;
				this.item = choosed_item;

				// Add descriptor inferred by new item
				let descriptor = await SlotTemplate.find_by_id( choosed_item.descriptor );
				if( descriptor ) {
					this.childs = descriptor.slots || [];
				}
			}
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
	cursor: pointer;
	padding-top: 0.5em;
	margin-bottom: 0.5em;
	border-top-right-radius: 0.4em;
	border-bottom-right-radius: 0.4em;
}

.suspance {
	min-height: 2.5em;
}

</style>