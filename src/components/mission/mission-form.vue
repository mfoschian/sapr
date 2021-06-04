<template>
	<b-form>
		<b-form-group
			label="Decollo"
			label-for="dt-date-takeoff"
			label-cols-sm="2"
		>
			<DateTimePicker
				id="dt-date-takeoff"
				v-model="dt_takeoff"
				align="left"
			>
			</DateTimePicker>
		</b-form-group>

		<b-form-group
			label="Atterraggio"
			label-for="dt-date-landing"
			label-cols-sm="2"
		>
			<DateTimePicker
				id="dt-date-landing"
				v-model="dt_landing"
				align="left"
			>
			</DateTimePicker>
		</b-form-group>

		<div class="buttons">
			<b-button v-if="is_new_record"
				variant="primary"
				@click="save_record"
				:disabled="!valid_form"
			>
				<b-icon-exclamation v-if="!valid_form" />
				<b-spinner small v-if="saving"></b-spinner> Crea </b-button>
			<b-button v-else
				variant="danger" @click="save_record" :disabled="!valid_form">
				<b-icon-exclamation v-if="!valid_form" />
				<b-spinner small v-if="saving"></b-spinner> Aggiorna </b-button>
			<!--
			<b-button variant="info" @click="pdfPreview">Anteprima PDF</b-button>
			-->
		</div>
	</b-form>
</template>

<script>
import DateTimePicker from '@/components/datetime-picker'

import { Mission } from '@/models/Mission'

export default {
	components: { DateTimePicker },
	props: {
		mission: { type: Object, default: () => new Mission() },
		activity_id: { type: String, default: null }
	},
	data() {
		return {
			dt_takeoff: this.mission.dt_start,
			dt_landing: this.mission.dt_end,

			saving: false,
		}
	},
	computed: {

		valid_form() {
			return true;
		},
		is_new_record() {
			return this.mission.id == null;
		}
	},
	methods: {

		async save_record() {
			let a = new Mission({
				dt_start: this.dt_takeoff_start,
				dt_end: this.dendeoff_start,
				activity_id: this.mission.activity_id || this.activity_id
			});

			console.log( a ); // eslint-disable-line
			
			try {
				await a.save();
				this.$emit('saved');
			}
			catch( err ) {
				console.error( 'Cannot save mission:' ); // eslint-disable-line
				console.error( err ); // eslint-disable-line
			}
		}
	}
}
</script>

<style scoped>
.buttons {
	margin-top: 2.5em;
	/* text-align: center; */
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>