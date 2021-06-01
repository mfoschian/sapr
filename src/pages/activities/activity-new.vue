<template>
	<BasePage title="Nuova attività" >
		<ActivityForm @saved="$router.replace('/activities')" />
	</BasePage>
</template>

<script>
// import { Activity } from '@/models/Activity'
import ActivityForm from '@/components/activity/activity-form'
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage, ActivityForm }
}
</script>
