<template>
	<b-container fluid class="mission">
		<b-row v-if="is_configured">
			<b-col>
				<div v-if="mission.dt_start">Decollo: {{ mission.dt_start | dtm }}</div>
				<b-button v-else @click="take_off">Decolla</b-button>
			</b-col>
			<b-col v-if="mission.dt_start">
				<div v-if="mission.dt_end">Atterraggio: {{ mission.dt_end | dtm }}</div>
				<b-button v-else @click="landed" :disabled="mission.dt_start == null">Atterrato</b-button>
			</b-col>
			<b-col v-if="main_equip">
				{{ main_equip.name }}
			</b-col>
			<b-col>
				<b-button variant="info"
					@click="goto_configuration"
					:disabled="mission.dt_start != null && mission.dt_end == null"
				>Configurazione</b-button>
			</b-col>
		</b-row>
		<b-row v-else>
			<b-col cols="12" class="text-center">
				<b-button variant="danger" @click="goto_configuration">Configura</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
// import { Mission } from '@/models/Mission'
import { Equipment } from '@/models/Equipment'
import { formatDtTm } from '@/utilities/dates.js'

export default {
	props: {
		mission: { type: Object, required: true }
	},
	computed: {
		is_configured() {
			return this.mission != null && this.mission.is_configured();
		},
		main_equip() {
			let m = this.mission;
			if( !m || !m.uav_setup || !m.uav_setup.equip_id )
				return null;

			let e = Equipment.find_by_id( m.uav_setup.equip_id );
			return e;
		}
	},
	methods: {
		goto_configuration() {
			this.$router.push( {
				name:'configure-mission',
				params: {
					activity_id: this.mission.activity_id,
					mission_id: this.mission.id
				}
			});
		},
		async take_off() {
			await this.mission.take_off();
			// this.$emit('input', this.mission);
		},
		async landed() {
			await this.mission.landed();
			await this.mission.free_equipment();
			// this.$emit('input', this.mission);
		}
	},
	filters: {
		dtm(v) {
			return formatDtTm(v);
		}
	}
}
</script>