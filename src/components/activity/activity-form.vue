<template>
	<b-form>
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
			<b-form-input
				id="txt-municipality"
				v-model="municipality"
				align="left"
				placeholder="scegli un comune"
				:state="valid_municipality"
			></b-form-input>		
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
			<b-input-group prepend="lat">
				<b-form-input
					v-model="lat"
					align="left"
					:state="valid_lat"
				></b-form-input>		
			</b-input-group>
			<b-input-group prepend="lon" >
				<b-form-input
					v-model="lon"
					align="left"
					:state="valid_lon"
				></b-form-input>		
			</b-input-group>
			<b-input-group prepend="alt">
				<b-form-input
					v-model="alt"
					align="left"
					:state="valid_alt"
				></b-form-input>		
			</b-input-group>
			<GeoLocator size="sm" @found="save_device_position">Leggi dal dispositivo</GeoLocator>
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

	</b-form>
</template>

<script>
import DateTimePicker from '@/components/datetime-picker'
import GeoLocator from '@/components/geolocator'

import { Activity, ActivityCategories, ActivityScenaries, ActivityFlightTypes, ActivityTypes } from '@/models/Activity'

export default {
	components: { DateTimePicker, GeoLocator },
	props: {
		activity: { type: Object, default: () => new Activity() }
	},
	data() {
		return {
			act_dt: this.activity.dt,
			municipality: this.activity.municipality,
			locality: this.activity.locality,
			alt: this.activity.alt,
			lat: this.activity.lat,
			lon: this.activity.lon,
			flight_max_height: this.activity.flight_max_height,
			category: this.activity.category,
			scenary: this.activity.scenary,
			flight_type: this.activity.flight_type,
			act_type: this.activity.type
		}
	},
	computed: {
		valid_act_dt() { return this.act_dt != null ;},
		valid_municipality() { return this.municipality != null && this.municipality != '' ;},
		valid_alt() { return this.is_coord(this.alt) },
		valid_lat() { return this.is_coord(this.lat) },
		valid_lon() { return this.is_coord(this.lon) },
		valid_coords() { return this.valid_alt && this.valid_lat && this.valid_lon; },
		valid_category() { return this.category > 0; },
		valid_scenary() { return this.scenary > 0; },
		valid_flight_type() { return this.flight_type > 0; },
		valid_act_type() { return this.act_type > 0; },

		category_choiches() { return ActivityCategories.map( x => ({value: x.id, text: x.label })) },
		scenary_choiches() { return ActivityScenaries.map( x => ({value: x.id, text: x.label })) },
		flight_type_choiches() { return ActivityFlightTypes.map( x => ({value: x.id, text: x.label })) },
		act_type_choiches() { return ActivityTypes.map( x => ({value: x.id, text: x.label })) },

	},
	methods: {
		is_coord( x ) {
			let n = parseFloat(x);
			if( isNaN(n) ) return false;
		},
		save_device_position( pos ) {
			this.alt = pos.alt;
			this.lat = pos.lat;
			this.lon = pos.lon;
		}
	}
}
</script>