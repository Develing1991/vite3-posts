<template>
	<div>about</div>
	{{ $route }}
	{{ $route.name }}
	<button class="btn btn-primary" @click="$router.push('/')">
		Home으로이동
	</button>
</template>

<script setup>
	import { useRoute } from 'vue-router';

	const route = useRoute();
	console.log(route.path);
</script>

<style lang="scss" scoped></style>
