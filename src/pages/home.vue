<template>
	<BasePage title="Scegli fra le seguenti possibilità">
		<ul>
			<li><router-link to="/activities">Elenco attività</router-link></li>
			<li><router-link to="/activities/new">Nuova attività</router-link></li>
		</ul>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage }
	
}
</script>