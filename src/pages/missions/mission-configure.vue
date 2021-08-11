<template>
	<BasePage :title="'Configuring mission ' + mission_id + ' of activity ' + activity_id" >
		<ConfigSection title="Configurazione Drone" >
			<UASConfiguration :value="uav_info" @input="l_uav_info=$event;save_config()" :read_only="read_only" />
		</ConfigSection>
		<ConfigSection title="Numero satelliti agganciati" >
			<SatelliteDataForm :value="sat_info" @input="l_sat_info=$event;save_config()" :read_only="read_only" />
		</ConfigSection>
		<ConfigSection title="Condizioni meteo-ambientali locali" >
			<MeteoDataForm :value="meteo_info" @input="l_meteo_info=$event;save_config()" :read_only="read_only" />
		</ConfigSection>
		<!-- <b-button variant="danger" @click="save_config">Save</b-button> -->
		<b-button variant="primary" @click="$router.go(-1)">OK</b-button>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

import ConfigSection from '@/components/config-section'

import UASConfiguration from '@/components/mission/configure-uas'
import SatelliteDataForm from '@/components/mission/satellite-data-form'
import MeteoDataForm from '@/components/mission/meteo-data-form'

import { Mission } from '@/models/Mission';

export default {
	components: {
		BasePage, ConfigSection,
		UASConfiguration, SatelliteDataForm, MeteoDataForm
	},
	props: {
		activity_id: { type: String, required: true },
		mission_id: { type: String, required: true }
	},
	data() {
		return {
			l_uav_info: null,
			l_meteo_info: null,
			l_sat_info: null,
		};
	},
	computed: {
		mission() {
			return Mission.get( this.mission_id );
		},
		read_only() {
			if(!this.mission) return false;
			return this.mission.dt_start != null && this.mission.dt_end != null;
		},
		uav_info() {
			if( this.l_uav_info ) return this.l_uav_info;
			return this.mission ? this.mission.uav_setup : null;
		},
		meteo_info() {
			if( this.l_meteo_info ) return this.l_meteo_info;
			return this.mission ? this.mission.meteo_info : null;
		},
		sat_info() {
			if( this.l_sat_info ) return this.l_sat_info;
			return this.mission ? this.mission.sat_info : null;
		},
	},
	methods: {
		/*update_uav_info(new_config) {
			if(!this.mission) return;

			this.mission.uav_setup = new_config;
			this.mission.save();
		},*/
		async save_config() {
			if(!this.mission) return;

			this.mission.uav_setup = this.uav_info;
			this.mission.meteo_info = this.meteo_info;
			this.mission.sat_info = this.sat_info;
			try {
				await this.mission.save();

				this.l_uav_info = null;
				this.l_meteo_info = null;
				this.l_sat_info = null;
			}
			catch( err ) {
				console.error( 'Error while saving mission setup' ); // eslint-disable-line
			}
		}
	},
	mounted() {
	},
}
</script>