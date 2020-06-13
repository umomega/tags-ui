<template>
	<span>
		{{ trans.get('tags::tags.event_stored') }}<span v-if="activity.subject">: <router-link :to="{ name: 'tags.edit', params: {id: activity.subject_id} }" v-text="activity.subject.name[$root.appLocale]"></router-link></span>
	</span>
</template>

<script>
export default {props: ['activity']}
</script>