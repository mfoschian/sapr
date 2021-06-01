<template>
	<BasePage title="Uh, oh ! C'è stato un errore !">
		<h3 v-if="message">{{ message }}</h3>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage },
	props: {
		message: { type: String, default: null }
	}
}
</script>