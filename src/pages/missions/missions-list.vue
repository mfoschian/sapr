<template>
	<BasePage title="Missioni">
		<section class="activity-brief">
			{{ activity.title }}
		</section>
		<section class="mission-list">
			<b-button size="sm" @click="add_mission" title="Aggiungi missione"><b-icon-plus /></b-button>
			<ul>
				<li v-for="mission in missions" :key="mission.id">
					{{ mission.name }}
				</li>
			</ul>
		</section>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'

export default {
	components: { BasePage },
	props: {
		activity: { type: Object, required: true },
		missions: { type: Array, default: () => [] }
	}
}
</script>