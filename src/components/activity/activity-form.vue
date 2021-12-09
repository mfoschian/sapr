<template>
	<b-form>
		<b-form-group
			label="Titolo"
			label-for="txt-title"
			label-cols-sm="2"
			:state="valid_title"
			invalid-feedback="Inserisci una descrizione per l'attività"

		>
			<b-form-input
				id="txt-title"
				v-model="title"
				align="left"
				placeholder="Breve descrizione attività"
				:state="valid_title"
			></b-form-input>
		</b-form-group>

		<b-form-group
			label="Data Attività"
			label-for="dt-date"
			label-cols-sm="2"
			:state="valid_act_dt"
		>
			<DateTimePicker
				id="dt-date"
				v-model="act_dt"
				minutes-step=15
				align="left"
				:state="valid_act_dt"
			>
			</DateTimePicker>
		</b-form-group>

		<b-form-group
			label="Comune"
			label-for="txt-municipality"
			label-cols-sm="2"
			:state="valid_municipality"
			invalid-feedback="Inserisci il comune dove si svolge l'attività"

		>
			<municipality-picker 
				id="txt-municipality"
				v-model="municipality_code"
			/>
			<!--
			<b-form-input
				id="txt-municipality"
				v-model="municipality"
				align="left"
				placeholder="scegli un comune"
				:state="valid_municipality"
			></b-form-input>
			-->
		</b-form-group>

		<b-form-group
			label="Località"
			label-for="txt-locality"
			label-cols-sm="2"
		>
			<b-form-input
				id="txt-locality"
				v-model="locality"
				align="left"
				placeholder="scegli la località (opzionale)"
			></b-form-input>		
		</b-form-group>


		<b-form-group
			label="Coordinate"
			label-cols-sm="2"
			:state="valid_coords"
			invalid-feedback="Coordinate non valide"
		>
			<b-input-group prepend="lat" class="w-3em">
				<b-form-input
					v-model="lat"
					align="left"
					:state="valid_lat"
				></b-form-input>		
			</b-input-group>
			<b-input-group prepend="lon" class="w-3em">
				<b-form-input
					v-model="lon"
					align="left"
					:state="valid_lon"
				></b-form-input>		
			</b-input-group>
			<b-input-group prepend="alt" class="w-3em">
				<b-form-input
					v-model="alt"
					align="left"
					:state="valid_alt"
				></b-form-input>		
			</b-input-group>
			<GeoLocator size="sm"
				@found="save_device_position"
			>Leggi dal dispositivo</GeoLocator>
		</b-form-group>


		<b-form-group
			label="Max Altezza"
			label-for="txt-max-fl-h"
			label-cols-sm="2"
		>
			<b-form-input
				id="txt-max-fl-h"
				v-model="flight_max_height"
				align="left"
				placeholder="Altezza di volo max (m slm)"
			></b-form-input>		
		</b-form-group>


		<b-form-group
			label="Categoria Operazioni"
			label-for="sel-cat-oper"
			label-cols-sm="2"
			:state="valid_category"
		>
			<b-form-select
				id="sel-cat-oper"
				v-model="category"
				:options="category_choiches"
				name="category"
				stacked
				align="left"
				:state="valid_category"
			></b-form-select>		
		</b-form-group>

		<b-form-group
			label="Scenario"
			label-for="sel-scenary"
			label-cols-sm="2"
			:state="valid_scenary"
		>
			<b-form-select
				id="sel-scenary"
				v-model="scenary"
				:options="scenary_choiches"
				name="scenary"
				stacked
				align="left"
				:state="valid_scenary"
			></b-form-select>		
		</b-form-group>


		<b-form-group
			label="Scopo del Volo"
			label-for="sel-flight_type"
			label-cols-sm="2"
			:state="valid_flight_type"
		>
			<b-form-select
				id="sel-flight_type"
				v-model="flight_type"
				:options="flight_type_choiches"
				name="flight_type"
				stacked
				align="left"
				:state="valid_flight_type"
			></b-form-select>		
		</b-form-group>


		<b-form-group
			label="Finalità intervento"
			label-for="sel-act_type"
			label-cols-sm="2"
			:state="valid_act_type"
		>
			<b-form-select
				id="sel-act_type"
				v-model="act_type"
				:options="act_type_choiches"
				name="act_type"
				stacked
				align="left"
				:state="valid_act_type"
			></b-form-select>		
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
import GeoLocator from '@/components/geolocator'
import MunicipalityPicker from '@/components/municipality-picker'

import { Activity, ActivityCategories, ActivityScenaries, ActivityFlightTypes, ActivityTypes } from '@/models/Activity'

export default {
	components: { DateTimePicker, GeoLocator, MunicipalityPicker },
	props: {
		activity: { type: Object, default: () => new Activity() }
	},
	data() {
		return {
			act_id: this.activity.id,
			title: this.activity.title,
			act_dt: this.activity.dt,
			// municipality: this.activity.municipality,
			municipality_code: this.activity.municipality_code,
			locality: this.activity.locality,
			alt: this.activity.alt,
			lat: this.activity.lat,
			lon: this.activity.lon,
			flight_max_height: this.activity.flight_max_height,
			category: this.activity.category,
			scenary: this.activity.scenary,
			flight_type: this.activity.flight_type,
			act_type: this.activity.type,

			saving: false,
		}
	},
	computed: {
		valid_act_dt() { return this.act_dt != null ;},
		valid_title() { return !this.is_blank(this.title); },
		// valid_municipality() { return this.municipality != null && this.municipality != '' ;},
		valid_municipality() { return !this.is_blank(this.municipality_code); },
		valid_alt() { return this.is_coord(this.alt) },
		valid_lat() { return this.is_coord(this.lat) },
		valid_lon() { return this.is_coord(this.lon) },
		valid_coords() { return this.valid_alt && this.valid_lat && this.valid_lon; },
		valid_category() { return this.category > 0; },
		valid_scenary() { return this.scenary > 0; },
		valid_flight_type() { return this.flight_type > 0; },
		valid_act_type() { return this.act_type > 0; },

		valid_form() {
			return this.valid_act_dt && this.valid_municipality
				&& this.valid_alt && this.valid_lat && this.valid_lon
				&& this.valid_coords && this.valid_category && this.valid_scenary
				&& this.valid_flight_type && this.valid_act_type && this.valid_title
		},

		category_choiches() { return ActivityCategories.map( x => ({value: x.id, text: x.label })) },
		scenary_choiches() { return ActivityScenaries.map( x => ({value: x.id, text: x.label })) },
		flight_type_choiches() { return ActivityFlightTypes.map( x => ({value: x.id, text: x.label })) },
		act_type_choiches() { return ActivityTypes.map( x => ({value: x.id, text: x.label })) },

		is_new_record() { return this.act_id == null; }
	},
	methods: {
		is_coord( x ) {
			let n = parseFloat(x);
			if( isNaN(n) ) return false;
			return true;
		},
		is_blank( v ) {
			return v == null || v.trim() == '';
		},
		save_device_position( pos ) {
			this.alt = pos.alt;
			this.lat = pos.lat;
			this.lon = pos.lon;
		},
		async save_record() {
			let a = new Activity({
				id: this.act_id,
				title: this.title,
				dt: this.act_dt,
				municipality_code: this.municipality_code,
				locality: this.locality,
				alt: this.alt,
				lat: this.lat,
				lon: this.lon,
				flight_max_height: this.flight_max_height,
				category: this.category,
				scenary: this.scenary,
				flight_type: this.flight_type,
				type: this.act_type
			});

			console.log( a ); // eslint-disable-line
			
			try {
				await a.save();
				this.$emit('saved');
			}
			catch( err ) {
				console.error( 'Cannot save activity:' ); // eslint-disable-line
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

.input-group.w-3em .input-group-prepend .input-group-text {
	min-width: 3em;
}
</style>