<template>
	<div id="app">
		<item-chooser
			label="Scegli UAV"
			:items="uav"
			:available="items_of_type(['UAV_1', 'UAV_2'])"
			@confirmed="confirmed"
		/>
		<hr>
		<pre>
			{{ uav }}
			{{ the_items }}
		</pre>
	</div>
</template>

<script>
import ItemChooser from './components/ItemChooser'

let Items = [
	{ name: "UAV 1", type: "UAV_1", id: "{1111}", used: false },
	{ name: "UAV 2", type: "UAV_2", id: "{2222}", used: false },
	{ name: "Batteria 1", type: "Battery1", id: "{BBBB.1111}", used: false },
	{ name: "Batteria 2", type: "Battery1", id: "{BBBB.1112}", used: false },
	{ name: "Batteria X1", type: "Battery2", id: "{BBXX.1111}", used: false },
	{ name: "Batteria X2", type: "Battery2", id: "{BBXX.1112}", used: false },
];

/*
const Metadata = [
	{ type: "UAV_1", slots: [
		{ name: "Batteria", type: ["Battery1", "Battery2"] }
	]}
];

const Mission = [
	{ type: ["UAV_1", "UAV_2"], label: "UAV" }
]

let Bom = [];
*/



export default {
	name: 'app',
	components: {
		ItemChooser
	},
	setup() {
		console.log( 'setup' ); //eslint-disable-line
	},
	data() {
		return {
			uav: null,
			the_items: Items
		};
	},
	computed: {
		available() {
			return Items.filter( x => x.used == false );
		}
	},
	methods: {
		items_of_type( ta ) {
			let its = Array.isArray( ta ) ? ta : [ ta ];
			return Items.filter( x => its.indexOf( x.type ) >= 0 );
		},
		confirmed(id) {

			if( this.uav && this.uav.id == id )
				return;

			if( this.uav && this.uav.id ) {
				let old = Items.filter( x => x.id == this.uav.id )[0];
				if( old )
					old.used = false;
			}
			this.uav = Items.filter( x => x.id == id )[0];
			if( this.uav )
				this.uav.used = true;
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
