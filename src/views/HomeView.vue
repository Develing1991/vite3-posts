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
	<!-- <hr class="py-4" />
	<h2>{{ $person.name }}</h2> -->
</template>

<script>
	export default {
		created() {
			// console.log(this.$person.name);
			// this.$person.say();
		},
	};
</script>

<script setup>
	// import AppCard from '@/components/app/AppCard.vue';
	// import AppGrid from '@/components/app/AppGrid.vue';

	import { ref, inject, reactive, toRef } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const routeAbout = () => {
		router.push('/about');
	};

	const items = ref(['사과', '바나나', '포도', '키위']);

	// const position = reactive({
	// 	x: 100,
	// 	y: 100,
	// });

	// 전부 반응형을 잃게됨
	// const x = position.x;
	// const { x, y } = position;
	// const x = ref(position.x);

	// toRef와 toRefs를 사용해서 반응형으로 만듦
	// const x = toRef(position, 'x');
	// const y = toRef(position, 'y');
	// const { x, y } = toRef(position);
</script>

<style lang="scss" scoped></style>
