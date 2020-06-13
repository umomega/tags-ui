<template>
	<span>
		{{ trans.get('tags::tags.event_destroyed') }}: <span class="has-color-danger">{{ activity.properties.name }}</span>
	</span>
</template>

<script>
export default {props: ['activity']}
</script>