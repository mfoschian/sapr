<template>
	<div class="page">
		<slot name="title"><h3 class="title">{{ title }}</h3></slot>
		<div class="page-content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, default: null }
	}
}
</script>

<style scoped>
.page {
	width: 100%;
}

.page .title {
	text-align: center;
	padding-top: 0.7em;
}

.page-content {
	padding: 1em;
}
</style>