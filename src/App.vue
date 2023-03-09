<script setup>
	import { useAlert } from './composables/alert';
	import TheHeader from './layouts/TheHeader.vue';
	import TheView from './layouts/TheView.vue';

	const { alerts } = useAlert();
</script>
<template>
	<TheHeader />
	<TheView />
	<AppAlert :items="alerts" />
</template>

<style lang="scss" scoped></style>
