<template>
	<div>
		<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
		<hr class="my-4" />
		<PostForm
			v-if="visibleForm"
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

	import { useAlert } from '@/composables/alert';

	const { vAlert, vSuccess } = useAlert();

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
			// router.push({ name: 'PostList' });
			vSuccess('등록이 완료되었습니다');
		} catch (error) {
			// console.error(error);
			vAlert(error.message);
		}
	};

	const goListPage = () => {
		router.push({ name: 'PostList' });
	};
	const visibleForm = ref(true);

	// const alerts = ref([]);
	// const vAlert = (message, type = 'error') => {
	// 	alerts.value.push({
	// 		message,
	// 		type,
	// 	});
	// 	setTimeout(() => {
	// 		alerts.value.shift();
	// 	}, 2000);
	// };

	// const vSuccess = message => vAlert(message, 'success');
</script>

<style lang="scss" scoped></style>
