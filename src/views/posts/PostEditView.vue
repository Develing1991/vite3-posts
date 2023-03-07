<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<form action="" @submit.prevent="edit">
			<div class="mb-3">
				<label for="title" class="form-label">제목</label>
				<input
					v-model="form.title"
					type="text"
					class="form-control"
					id="title"
				/>
			</div>
			<div class="mb-3">
				<label for="contents" class="form-label">내용</label>
				<textarea
					v-model="form.contents"
					class="form-control"
					id="contents"
					rows="3"
				></textarea>
			</div>
			<div class="pt-4">
				<button
					type="button"
					class="btn btn-outline-danger me-2"
					@click="goDatailPage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	import { getPostById, updatePost } from '@/api/posts';
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

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
		} catch (error) {
			console.error(error);
		}
		router.push({ name: 'PostDetail', params: { id } });
	};
	const goDatailPage = () => {
		// router.go(-1);
		router.push({ name: 'PostDetail', params: { id } });
	};
</script>

<style lang="scss" scoped></style>
