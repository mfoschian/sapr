<template>
	<BasePage title="Reports">
		<b-button href="/reports/test" size="sm">Test</b-button>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage },
	props: {
	},
	computed: {
	},
}
</script>

<style scoped>
.list-item {
	margin-left: 1em;
	margin-right: 1em;
	margin-top: 1em;
	border: 1px solid #00509dff;
	padding: 1em;
	border-radius: 0.5em;
	width: auto;
}
</style>