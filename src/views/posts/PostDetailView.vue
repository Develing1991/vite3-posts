<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.contents }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>

		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
		<!-- {{ $route.params }}
		{{ $route.query }}
		{{ $route.hash }} -->
	</div>
</template>

<script setup>
	import { deletePost, getPostById } from '@/api/posts';
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	const props = defineProps({
		id: String,
	});
	console.log(props);
	//PostDeatail/:id 에서 id를 props:true로 해서 넘겨줘서 받으므로 route.id를 사용할 필요가 없음
	// 그래서 useRoute할 필요가 없음

	const router = useRouter();
	//const route = useRoute();
	// const id = route.params.id;

	/**
	 * ref
	 * 장) 객체 할당 가능 (value로 받으니까)
	 * 장) 레퍼런스, 프리미티브 둘 다 가능.. 일관성
	 * 단) form.value.title 이렇게 속성으로 접근해야함
	 *
	 * reactive
	 * 장) form.title
	 * 단) 객체 할당 불가능
	 */
	// ref 한꺼번에 객체 할당가능
	const post = ref({}); // ref 랑 프리미티브 둘다 가능
	//let form = reactive({});

	const fetchPost = async () => {
		// const data = getPostById(id);
		try {
			const { data } = await getPostById(props.id);
			// post.value = { ...data };
			setPost(data);
		} catch (error) {
			console.error(error);
		}

		// value라는 속성으로 컨트롤 하기때문에 반응형이 살아있음
		// form = {...data} 주소 값이 아예 바뀌니까 반응형도 잃게됨
		// form.title = data.title <- 이렇게 객체를 바뀌지 않게 안쪽의 데이터를 변경해야 됨
	};
	const setPost = ({ title, contents, createdAt }) => {
		post.value.title = title;
		post.value.contents = contents;
		post.value.createdAt = createdAt;
	};

	fetchPost();

	const remove = async () => {
		try {
			// if 코드가 깊어질 수 있으므로 안티 패턴
			if (!confirm('삭제하시겠습니까?')) {
				return;
			}
			await deletePost(props.id);
			router.push({ name: 'PostList' });
		} catch (error) {
			console.error(error);
		}
	};
	const goListPage = () => {
		router.push({ name: 'PostList' });
	};
	const goEditPage = () => {
		// router.push({ name: 'PostEdit', params: { id } });
		router.push({ name: 'PostEdit', params: { id: props.id } });
	};
</script>

<style lang="scss" scoped></style>
