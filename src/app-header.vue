<template>
	<div class="app-header">
		<div class="brand">
			<router-link to="home">SAPR</router-link>
		</div>
	</div>
</template>

<style scoped>
div.app-header {
	/* height: 1.5em; */
	min-height: 2em;
	background-color: #00509dff;
	color: #fdc500ff;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}

div.app-header div {
	justify-items: center;
}

div.app-header a {
	color: #fdc500ff;
	text-decoration: none;
}
div.app-header a:hover {
	color: #ffd500ff;
	font-size: 1.2em;
}

</style>