<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">
		<div class="has-text-centered mb-lg">
			<p class="is-size-4" v-text="tagName"></p>
			<p class="is-size-8 has-color-grey-darker" v-text="tagSlug"></p>
		</div>

		<div class="paper">
			<form method="POST" action="/api/tags" @submit.prevent="requestStore('tags/' + resource.id + '/translate', 'tags.edit')" @change="form.errors.clear($event.target.name)" autocomplete="off">

				<div class="paper__body">
					<div class="paper__main">
						<FormBody :schema="schema" v-model="form" :readonly="false"/>
					</div>
					<div class="paper__side">
						<FormBody :schema="schemaSecondary" v-model="form" :readonly="false"/>
					</div>
				</div>

				<SubmitFooter :config="{icon: 'language'}" v-model="form"></SubmitFooter>
			</form>
		</div>
	</div>
</template>

<script>
import {Storer, Form, RequiresPermissions} from 'umomega-foundation'
import TagsEditHelper from '../mixins/TagsEditHelper'

export default {
	mixins: [ Storer, TagsEditHelper, RequiresPermissions ],
	data() { return {
		titleLabel: 'tags::tags.translate',
		hasOptions: false,
		breadcrumbs: [
			{to: { name: 'tags.index'}, text: this.$root.trans.get('tags::tags.multiple')}
		],
		guardedBy: 'write_tags',
		form: new Form({name_translation: '', locale: ''}),
		schema: [
			{
				type: 'TextField',
				name: 'name_translation',
				label: this.$root.trans.get('validation.attributes.name'),
				options: {required: true}
			}
		],
		schemaSecondary: [
			{
				type: 'SelectField',
				name: 'locale',
				label: this.$root.trans.get('validation.attributes.locale'),
				options: { required: true, choices: {} }
			}
		]
	}},
	watch: {
		resource: function(resource) {
			var self = this

			this.breadcrumbs.push({to: { name: 'tags.edit', id: resource.id }, text: this.tagName })
			const availableLocales = this.$root.appLocales.filter(n => !resource.locales.includes(n))

			const choices = availableLocales.map(function(locale) { return { value: locale, label: self.$root.trans.get('foundation::general.locale_' + locale) } })

			this.schemaSecondary[0].options.choices = choices

			if(choices.length == 1) this.form['locale'] = choices[0].value
		}
	}
}
</script>