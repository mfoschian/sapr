<template>
	<div class="cfg-section">
		<div class="header">
			<div class="img" v-if="img"><img :src="img" /></div>
			<div class="title">{{ title }}</div>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, default: ''},
		img: { type: String, default: null }
	}
}
</script>

<style scoped>
div.cfg-section {
	margin-top: 1em;
	border: 1px solid black;
	border-radius: 0.5em;
}

div.cfg-section .header {
	padding: 0.1em;
	text-align: center;
	background-color: #003f88ff;
	font-weight: bold;
	margin-bottom: 0.5em;
	color: #ffd500ff;
	border-top-left-radius: 0.5em;
	border-top-right-radius: 0.5em;
	min-height: 2em;
	padding-top: 0.3em;
	display: flex;
	flex-direction: row;
}

div.cfg-section .content {
	padding: 0.5em;
}

div.cfg-section div.header div.img {
	border-radius: 50%;
	padding: 0.2em;
	background-color: white;
	flex-shrink: 2em;
	margin-bottom: 0.2em;
	margin-left: 0.2em;
}

div.cfg-section div.header div.img img {
	width: 1.8em;
	height: 1.8em;
}

div.cfg-section div.header div.title {
	flex-grow: 2;
}
</style>