<template>
	<b-form>
		<b-form-group
			label="Nome pilota"
			label-for="txt-name"
			label-cols-sm="2"
			:state="valid_name"
			invalid-feedback="Inserisci il nome del pilota"

		>
			<b-form-input
				id="txt-name"
				v-model="name"
				align="left"
				:state="valid_name"
			></b-form-input>
		</b-form-group>

		<b-form-group
			label="Codice utente"
			label-for="txt-user_code"
			label-cols-sm="2"
			:state="valid_user_code"
			invalid-feedback="Inserisci il codice utente"
		>
			<b-form-input
				id="txt-user_code"
				v-model="user_code"
				align="left"
				:state="valid_user_code"
			></b-form-input>
		</b-form-group>

		<b-form-group
			label="Codice operatore"
			label-for="txt-operator_code"
			label-cols-sm="2"
			:state="valid_operator_code"
			invalid-feedback="Inserisci il codice operatore"
		>
			<b-form-input
				id="txt-operator_code"
				v-model="operator_code"
				align="left"
				:state="valid_operator_code"
			></b-form-input>
		</b-form-group>

		<b-form-group
			label="Codice EASA"
			label-for="txt-EASA_code"
			label-cols-sm="2"
			:state="valid_EASA_code"
			invalid-feedback="Inserisci il codice EASA"
		>
			<b-form-input
				id="txt-EASA_code"
				v-model="EASA_code"
				align="left"
				:state="valid_EASA_code"
			></b-form-input>
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
import { Pilot } from '@/models/Pilot'

export default {
	components: { },
	props: {
		pilot: { type: Object, default: () => new Pilot() }
	},
	data() {
		return {
			id: this.pilot.id,
			name: this.pilot.name,
			user_code: this.pilot.user_code,
			operator_code: this.pilot.operator_code,
			EASA_code: this.pilot.EASA_code,

			saving: false,
		}
	},
	computed: {
		valid_name() { return !this.is_blank(this.name);},
		valid_user_code() { return !this.is_blank(this.user_code);},
		valid_operator_code() { return !this.is_blank(this.operator_code);},
		valid_EASA_code() { return !this.is_blank(this.EASA_code);},

		valid_form() {
			return this.valid_name && this.valid_user_code
				&& this.valid_operator_code && this.valid_EASA_code
				;
		},

		is_new_record() { return this.id == null; }
	},
	methods: {
		is_blank( v ) {
			return v == null || v.trim() == '';
		},
		async save_record() {
			let a = new Pilot({
				id: this.id,
				name: this.name,
				user_code: this.user_code,
				operator_code: this.operator_code,
				EASA_code: this.EASA_code
			});

			console.log( a ); // eslint-disable-line
			
			try {
				await a.save();
				this.$emit('saved');
			}
			catch( err ) {
				console.error( 'Cannot save pilot:' ); // eslint-disable-line
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