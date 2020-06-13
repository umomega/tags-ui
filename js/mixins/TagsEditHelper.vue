<script>
import { View, Shower, FormBody, SubmitFooter } from 'umomega-foundation'

export default {
	mixins: [ View, Shower ],
	components: { FormBody, SubmitFooter },
	data() { return {
		showRoute: 'tags',
	}},
	computed: {
		tagName() {
			return this.resource.name != undefined ? this.resource.name[this.$root.appLocale] : ''
		},
		tagSlug() {
			return this.resource.slug != undefined ? this.resource.slug[this.$root.appLocale] : ''
		},
		tagId() {
			return this.resource.id != undefined ? this.resource.id : 0
		}
	}
}
</script>