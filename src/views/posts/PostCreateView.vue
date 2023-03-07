<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<PostForm
			@submit.prevent="save"
			v-model:title="form.title"
			v-model:contents="form.contents"
		>
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">
					목록
				</button>
				<button class="btn btn-primary">저장</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
	import PostForm from '@/components/posts/PostForm.vue';
	import { createPost } from '@/api/posts';
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	// const route = useRoute();

	const form = ref({
		title: null,
		contents: null,
	});

	const save = () => {
		try {
			createPost({
				...form.value,
				createdAt: Date.now(),
			});
			router.push({ name: 'PostList' });
		} catch (error) {
			console.error(error);
		}
	};

	const goListPage = () => {
		router.push({ name: 'PostList' });
	};
</script>

<style lang="scss" scoped></style>
