<template>
	<BasePage title="Modifica pilota" >
		<PilotForm :pilot="pilot" @saved="$router.replace('/pilots')"/>
	</BasePage>
</template>

<script>
// import { Activity } from '@/models/Activity'
import PilotForm from '@/components/pilot/pilot-form'
import BasePage from '@/pages/base-page'

export default {
	components: { PilotForm, BasePage },
	props: {
		pilot: { type: Object, required: true }
	},
	computed: {
		
	},
	methods: {
	}
}
</script>
