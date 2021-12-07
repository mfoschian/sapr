<template>
	<BasePage title="Nuovo Pilota" >
		<PilotForm @saved="$router.replace('/pilots')" />
	</BasePage>
</template>

<script>
// import { Activity } from '@/models/Activity'
import PilotForm from '@/components/pilot/pilot-form'
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage, PilotForm }
}
</script>
