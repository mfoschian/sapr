<template>
	<div>
		<h1>Uh, oh ! C'è stato un errore !</h1>
		<h3 v-if="message">{{ message }}</h3>
	</div>
</template>

<script>
export default {
	props: {
		message: { type: String, default: null }
	}
}
</script>