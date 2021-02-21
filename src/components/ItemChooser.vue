<template>
	<div align="center">
		<h2 v-if="label">{{ label }}</h2>
		<div v-for="it in items" :key="it.id"
			class="item" :class="{used: it.id == selected_id}"
			@click="use(it.id)"
		>
			{{ it.name }}
		</div>
		<hr>
		<div align="center">
			<b-button variant="success" @click="done" >Ok</b-button>
		</div>
	</div>
</template>


<script>
export default {
	props: {
		label: { type: String, default:"" },
		selected: { type: Object, default: () => null },
		available: { type: Array, default: () => [] },
	},
	data() {
		return {
			selected_id: this.selected && this.selected.id ? this.selected.id : null,
		}
	},
	computed: {
		items() {
			if( this.selected && this.selected_id )
				return [this.selected].concat( this.available );
			else
				return this.available;
		}
	},
	methods: {
		use(id) {
			this.selected_id = id;
		},
		done() {
			this.$emit('confirmed', this.selected_id );
		}
	},
	/*
	watch: {
		available: function(value) {
			console.log( 'watch triggered'); // eslint-disable-line
			this.load_data();
		}
	},
	*/
}
</script>

<style scoped>
	.item {
		display: inline-block;
		width: 5em;
		height: 2em;
		background-color: antiquewhite;
		border: 1px solid black;
		border-radius: 10px;
		padding: 0.3em;
		cursor: pointer;
		text-align: center;
		margin-right: 0.5em;
	}
	.item.used {
		background-color: cadetblue;
	}
</style>