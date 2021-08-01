<template>
	<BasePage :title="'Configuring mission ' + mission_id + ' of activity ' + activity_id" >
		<ConfigSection title="Configurazione Drone" >
			<UASConfiguration :configuration="configuration" />
		</ConfigSection>
		<ConfigSection title="Numero satelliti agganciati" >
			<SatelliteDataForm />
		</ConfigSection>
		<ConfigSection title="Condizioni meteo-ambientali locali" >
			<MeteoDataForm />	
		</ConfigSection>
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
			cfg: {}
		};
	},
	computed: {
		mission() {
			return Mission.get( this.mission_id );
		},
		configuration() {
			let m = this.mission;
			if(!m)
				return null;

			return this.mission.configuration;
		}
	},
	mounted() {
		this.cfg = this.configuration;
	}
}
</script>