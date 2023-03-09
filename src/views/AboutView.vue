<template>
	counterStore.counter : {{ counterStore.counter }} <br />
	counterStore.hasLength :{{ counterStore.hasLength }}
	{{ counter }}
	{{ counter }}
	{{ counter }}
	{{ counter }}
	<button @click="counterStore.increase">인크리즈</button>
</template>

<script setup>
	import { useCounterStore } from '@/store/counter';
	import { storeToRefs } from 'pinia';
	const counterStore = useCounterStore();
	//const { counter } = counterStrore; // 마찬가지로 반응형 잃음
	const { counter } = storeToRefs(counterStore); // storeRefs 반응성 유지
	const { increase } = counterStore; // actions는 그냥 구조분해 할당 해도 됨
	counter.value = 100;
	increase();
	increase();
	increase();
	increase();
</script>

<style lang="scss" scoped></style>
