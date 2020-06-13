<template>
	<div :class="isLoaded ? 'reveal is-loaded' : 'reveal'">

		<Toolbar :createroutename="'tags.create'" :searchterm="searchTerm" :route="route" :canwrite="$can('write_tags')" :createicon="'plus'">
			<div class="ml-md" v-if="showBulkActions">
				<p class="is-size-9 has-text-weight-bold has-color-grey-light has-text-centered is-uppercase mb-xxs" v-text="trans.get('foundation::general.bulk_actions')"></p>
				<div class="field has-addons">
					<div class="control">
						<button class="button icon-only" @click="toggleCheckAll">
							<i :class="checkAllClass"></i>
						</button>
					</div>
					<div class="control" v-if="$can('write_tags')">
						<button class="button is-danger icon-only-wide" @click="confirmBulkDelete">
							<i class="icon fas fa-trash"></i>
						</button>
					</div>
				</div>
			</div>
		</Toolbar>

		<div class="mb-md" v-if="!searchmode">
			<strong v-for="sortable in sortables" class="is-inline-block mr-md">
				<SortableLink :currentdir="sortDir" :currentkey="sortKey" :ownkey="sortable.key" :currentroute="route" :label="sortable.label"/>
			</strong>
		</div>

		<div v-if="content.data.length == 0">
			<p class="datable-no-results is-size-5 has-color-primary" v-text="trans.get('foundation::general.no_results_found')"></p>
		</div>

		<div class="field is-grouped is-grouped-multiline">
			<div class="control" v-for="tag in content.data">
				<div class="tags has-addons">
					<div class="tag is-primary">
						<input type="checkbox" :value="tag.id" v-model="checked" @change="updateAllChecked">
					</div>
					<router-link class="tag is-primary has-text-weight-bold" :to="{ name: 'tags.edit', params: {id: tag.id} }" v-text="tag.name[$root.appLocale]"/>
					<a href="#" class="tag is-primary-dark has-color-white" @click.prevent="openDeleteModal(tag.id)">
						<i class="icon fas fa-trash"></i>
					</a>
				</div>
			</div>
		</div>

		<div>
			<Pagination v-if="totalPages > 1 && !searchmode" :total="totalPages" :current="page" :sortkey="sortKey" :route="route" :sortdir="sortDir" :inverted="false"/>
			
			<div class="has-text-centered pt-sm pb-sm" v-if="searchmode">
				<router-link class="has-color-primary is-uppercase has-text-weight-bold is-size-7" :to="{ name: route }"><i class="icon fas fa-long-arrow-alt-left"></i> {{ trans.get('tags::tags.all') }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import {View, RequiresPermissions, SortableLink, Pagination, Toolbar, DataLister, assess_error} from 'umomega-foundation'

export default {
	mixins: [ View, RequiresPermissions, DataLister ],
	components: { Toolbar, SortableLink, Pagination },
	watch: {
		$route(to, from) {
			this.searchTerm = to.query.q || '';
			Event.$emit('search-query-changed', this.searchTerm);

			this.page = (this.sortKey === to.query.s && this.sortDir === to.query.d && to.query.page) ? to.query.page : 1;

			this.sortKey = to.query.s || 'name';
			this.sortDir = to.query.d || 'asc';

			this.load();
		}
	},
	data() { return {
		titleLabel: 'tags::tags.manage',
		guardedBy: 'read_tags',
		sortKey: this.$route.query.s || 'name',
		sortDir: this.$route.query.d || 'asc',
		searchTerm: this.$route.query.q || '',
		page: this.$route.query.page || 1,
		content: { data: [] },
		checked: [],
		allChecked: false,
		isLoaded: false,
		// Datable props
		route: 'tags.index',
		sortables: [
			{key: 'name', label: 'validation.attributes.name'},
			{key: 'created_at', label: 'validation.attributes.created_at'}
		],
		indexloadroute: 'tags',
		searchloadroute: 'tags/search',
		bulkdeleteroute: 'tags/bulk'
	}},
	methods: {
		makeLoadRoute() {
			return (this.searchmode
				? api_url_with_token(this.searchloadroute) + '&q=' + this.searchTerm
				: api_url_with_token(this.indexloadroute) + '&s=' + this.sortKey + '&d=' + this.sortDir + '&page=' + this.page)
		},
		openDeleteModal(id) {
			Event.$emit('delete-modal-open', { bulk: false, route: 'tags/' + id })
		}
	}
}
</script>