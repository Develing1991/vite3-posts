<template>
	<AppCard>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ contents }}
		</p>
		<p class="text-muted">{{ createdDate }}</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<i class="bi bi-emoji-sunglasses"></i>
				<button class="btn btn-primary" @click.stop="$emit('modal')">
					아이콘버튼
				</button>
				<button class="btn btn-primary" @click.stop="$emit('preview')">
					미리보기
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
	import { inject, computed } from 'vue';
	import AppCard from '../app/AppCard.vue';
	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		contents: {
			type: String,
		},
		createdAt: {
			type: [String, Date, Number],
		},
	});

	defineEmits(['modal', 'preview']);
	const dayjs = inject('dayjs');
	const createdDate = computed(() =>
		dayjs(props.createdAt).format('YYYY. MM.'),
	);
</script>

<style lang="scss" scoped></style>
