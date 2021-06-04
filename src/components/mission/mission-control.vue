<template>
	<div class="mission">
		<div>
			<b-button v-if="!mission.configuration" variant="danger" @click="goto_configuration">Configura</b-button>
			<b-button v-else variant="info">Configurazione</b-button>
		</div>
		<div>
			<div v-if="mission.dt_start">Decollo: {{ mission.dt_start | dtm }}</div>
			<b-button v-else @click="take_off">Decolla</b-button>
		</div>
		<div>
			<div v-if="mission.dt_end">Atterraggio: {{ mission.dt_end | dtm }}</div>
			<b-button v-else @click="landed">Atterrato</b-button>
		</div>
	</div>
</template>

<script>
// import { Mission } from '@/models/Mission'
import { formatDtTm } from '@/utilities/dates.js'

export default {
	props: {
		mission: { type: Object, required: true }
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