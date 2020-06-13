<template>
	<div :class="isLoaded ? 'paper reveal is-loaded' : 'paper reveal'">
		<form method="POST" action="/api/tags" @submit.prevent="requestStore('tags', 'tags.edit')" @keydown="form.errors.clear($event.target.name)" autocomplete="off">
			
			<div class="paper__body">
				<div class="paper__main">
					<FormBody :schema="schema" v-model="form" :readonly="false"/>
				</div>
				<div class="paper__side">
					<FormBody :schema="schemaSecondary" v-model="form" :readonly="false"/>
				</div>
			</div>

			<SubmitFooter :config="{icon: 'plus'}" v-model="form"></SubmitFooter>

		</form>
	</div>
</template>

<script>
import {View, Storer, FormBody, Form, SubmitFooter, RequiresPermissions} from 'umomega-foundation'

export default {
	mixins: [ View, RequiresPermissions, Storer ],
	components: { FormBody, SubmitFooter },
	data() { return {
		titleLabel: 'tags::tags.create',
		breadcrumbs: [
			{to: { name: 'tags.index'}, text: this.$root.trans.get('tags::tags.multiple')}
		],
		guardedBy: 'write_tags',
		form: new Form({name: '', type: ''}),
		schema: [
			{
				type: 'TextField',
				name: 'name',
				label: this.$root.trans.get('validation.attributes.name'),
				options: {required: true}
			}
		],
		schemaSecondary: [
			{
				type: 'TextField',
				name: 'type',
				label: this.$root.trans.get('validation.attributes.type')
			}
		]
	}}
}
</script>