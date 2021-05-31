<template>
	<div id="app">
		<app-header></app-header>
		<!-- <transition name="slide" mode="out-in"> -->
			<div class="page-content">
				<router-view></router-view>
			</div>
		<!-- </transition> -->
		<app-footer></app-footer>
	</div>
</template>

<script>
import AppHeader from './app-header.vue'
import AppFooter from './app-footer.vue'

export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
	color: #2c3e50;
	/* margin-top: 60px; */
	min-height: 80vh;
}

#app .page-content {
	min-height: 80vh;
}
</style>
