<template>
	<b-button @click="geoFindMe" :variant="variant">
		<span v-if="spinner" style="margin-right: 0.5em;"><b-spinner small type="grow"></b-spinner></span>
		<slot>{{ text }}</slot>
	</b-button>
</template>

<script>
export default {
	data() {
		return {
			text: "Leggi da dispositivo",
			spinner: false,
			variant: "info",
		};
	},
	methods: {
		success(position) {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const alt = position.coords.altitude;

			this.spinner = false;
			this.variant = "info";
			this.$emit("found", { lat, lon, alt });
		},

		error() {
			this.spinner = false;
			this.variant = "danger";
			this.$emit("error", "Unable to retrieve your location");
		},

		geoFindMe() {
			if (!navigator.geolocation) {
				this.variant = "danger";
				this.$emit("error", "Geolocation is not supported by your browser");
			} else {
				this.spinner = true;
				this.variant = "info";
				this.$emit('reading');
				navigator.geolocation.getCurrentPosition(
					(position) => this.success(position),
					() => this.error()
				);
			}
		},
	},
};
</script>
