<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<PostForm
			@submit.prevent="edit"
			v-model:title="form.title"
			v-model:contents="form.contents"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDatailPage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</template>
		</PostForm>
		<!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
	</div>
</template>

<script setup>
	import PostForm from '@/components/posts/PostForm.vue';
	import { getPostById, updatePost } from '@/api/posts';
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	// import AppAlert from '@/components/app/AppAlert.vue';

	import { useAlert } from '@/composables/alert';
	const { vAlert, vSuccess } = useAlert();

	const router = useRouter();
	const route = useRoute();
	const id = route.params.id;

	const form = ref({
		title: null,
		contents: null,
	});
	const fetchPost = async () => {
		// const data = getPostById(id);
		try {
			const { data } = await getPostById(id);
			// post.value = { ...data };
			setForm(data);
		} catch (error) {
			console.error(error);
			vAlert(error.message);
		}

		// value라는 속성으로 컨트롤 하기때문에 반응형이 살아있음
		// form = {...data} 주소 값이 아예 바뀌니까 반응형도 잃게됨
		// form.title = data.title <- 이렇게 객체를 바뀌지 않게 안쪽의 데이터를 변경해야 됨
	};
	const setForm = ({ title, contents }) => {
		form.value.title = title;
		form.value.contents = contents;
	};

	fetchPost();

	const edit = async () => {
		try {
			await updatePost(id, {
				...form.value,
			});
			// vAlert('수정이 완료 되었습니다.', 'success'); // 콜백으로 router 넣어도 도리듯

			vSuccess('수정이 완료되었습니다');
			router.push({ name: 'PostDetail', params: { id } });
		} catch (error) {
			console.error(error);
			vAlert(error.message);
		}
	};

	const goDatailPage = () => {
		// router.go(-1);
		router.push({ name: 'PostDetail', params: { id } });
	};

	// // alert
	// // const showAlert = ref(false);
	// // const alertMessage = ref('');
	// // const alertType = ref('');
	// const alerts = ref([]);
	// const vAlert = (message, type = 'error') => {
	// 	alerts.value.push({
	// 		message,
	// 		type,
	// 	});
	// 	// showAlert.value = true;
	// 	// alertMessage.value = message;
	// 	// alertType.value = type;
	// 	setTimeout(() => {
	// 		// showAlert.value = false;
	// 		alerts.value.shift();
	// 	}, 2000);
	// };

	// const vSuccess = message => vAlert(message, 'success');
</script>

<style scoped></style>
