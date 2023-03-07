<template>
	<div>home</div>
	{{ $route }}
	{{ $route.name }}
	<button class="btn btn-primary" @click="routeAbout">About으로이동</button>

	<!-- object로 오기 때문에 -->
	<AppGrid :items="items" v-slot="{ item, index }">
		<!-- <AppGrid :items="items" v-slot="{ item, index }" col-class="col-6"> -->
		<AppCard>{{ item }} - {{ index }}</AppCard>
	</AppGrid>
</template>

<script setup>
	import AppCard from '@/components/AppCard.vue';
	import AppGrid from '@/components/AppGrid.vue';

	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const routeAbout = () => {
		router.push('/about');
	};

	const items = ref(['사과', '바나나', '포도', '키위']);
</script>

<style lang="scss" scoped></style>
