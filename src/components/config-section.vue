<template>
	<div class="cfg-section">
		<div class="title">{{ title }}</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, default: ''}
	}
}
</script>

<style scoped>
div.cfg-section {
	margin-top: 1em;
	border: 1px solid black;
	border-radius: 0.5em;
}

div.cfg-section .title {
	padding: 0;
	text-align: center;
	background-color: #003f88ff;
	font-weight: bold;
	margin-bottom: 0.5em;
	color: #ffd500ff;
	border-top-left-radius: 0.5em;
	border-top-right-radius: 0.5em;
	height: 2em;
	padding-top: 0.3em;
}

div.cfg-section .content {
	padding: 0.5em;
}

</style>