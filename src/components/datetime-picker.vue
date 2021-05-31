<template>
	<div>
		<span class="inlblock">
			<b-form-datepicker
				v-model="ldate"
				:locale="locale"
				@input="fireChange"
				:state="state"
			></b-form-datepicker>
		</span>
		<span class="inlblock" >
			<b-form-timepicker
				v-model="ltime"
				:locale="locale"
				:minutes-step="minutesStep"
				@input="fireChange"
				:state="state"
			>
			</b-form-timepicker>
		</span>
		<b-form-invalid-feedback :state="state">{{ invalidFeedback }}</b-form-invalid-feedback>
		<b-form-valid-feedback :state="state">{{ validFeedback }}</b-form-valid-feedback>		
	</div>
</template>

<script>
function p2(n) {
	return (n < 10 ? '0' : '') + n;
}


export default {
	props: {
		value: { type: Date, default: null},
		label: { type: String, default: '' },
		description: { type: String, default: '' },
		minutesStep : { type: [Number,String], default: 1 },
		locale: { type: String, default: 'it' },
		state: { type: Boolean, default: true },
		'invalid-feedback': { type: String, default: '' },
		'valid-feedback': { type: String, default: '' },
	},
	data() {
		return {
			ldate: this.date2text(this.value),
			ltime: this.time2text(this.value),
		}
	},
	methods: {
		date2text(dt) {
			if(!dt) return '';
			let sep = '-';
			return [dt.getFullYear(), p2(dt.getMonth() + 1), p2(dt.getDate())].join(sep);
		},
		time2text(dt) {
			if(!dt) return '';
			return p2(dt.getHours()) + ':' + p2(dt.getMinutes());
		},
		fireChange() {
			let dt = new Date(this.ldate + ' ' + this.ltime);
			//debugger; // eslint-disable-line
			this.$emit('input', dt);
		},
	},
	watch: { 
		//value: function(newVal, oldVal) { // watch it
		value: function(newVal) { // watch it
			//console.log('Prop changed: ', newVal, ' | was: ', oldVal); // eslint-disable-line
			//this.$set( this, 'contact', newVal );
			this.ldate = this.date2text(newVal);
			this.ltime = this.time2text(newVal);
		}
	}
}
</script>

<style scoped>
.inlblock {
	width: auto;
	display: inline-block;
}
</style>