<template>
	<BasePage title="Piloti">
		<b-button to="/pilots/new" size="sm">Nuovo</b-button>
		<b-table
			striped hover
			:fields="columns"
			:items="table_items">

			<template #cell(actions)="data">
				<b-button size="sm" title="edit" :to="'/pilots/'+data.item.id+'/edit'"><b-icon-pencil /></b-button>
			</template>

		</b-table>
	</BasePage>
</template>

<script>
import BasePage from '@/pages/base-page'



export default {
	components: { BasePage },
	props: {
		pilots: { type: Array, default: () => [] }		
	},
	data() {
		return {
		}
	},
	computed: {
		columns() {
			return [
				{ key: 'name', label: 'Nominativo', sortable: true },
				{ key: 'user_code', label: 'Codice', sortable: true },
				{ key: 'operator_code', label: 'Operatore', sortable: true },
				{ key: 'EASA_code', label: 'Codice EASA', sortable: true },
				{ key: 'actions', lable: '', sortable: false }
			];
		},
		table_items() {
			return this.pilots;
		}
	}
}
</script>