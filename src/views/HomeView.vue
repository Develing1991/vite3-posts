<template>
	<div>home</div>
	{{ $route }}
	{{ $route.name }}
	<button class="btn btn-primary" @click="routeAbout">About으로이동</button>
</template>

<script setup>
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const routeAbout = () => {
		router.push('/about');
	};
</script>

<style lang="scss" scoped></style>
