<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		/>
		<hr class="my-4" />

		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />
		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:contents="item.contents"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					/>
				</template>
			</AppGrid>
			<AppPagenation
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>
		<!-- <AppModal :show="show" title="게시글" @close="closeModal"> -->
		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:contents="modalContents"
				:created-at="modalCreatedAt"
			/>
		</Teleport>

		<hr class="my-5" />
		<AppCard v-if="previewId">
			<PostDetailView :id="previewId" />
		</AppCard>
	</div>
</template>

<script setup>
	import PostItem from '@/components/posts/PostItem.vue';
	import PostDetailView from '@/views/posts/PostDetailView.vue';
	// import AppCard from '@/components/app/AppCard.vue';
	// import AppPagenation from '@/components/app/AppPagenation.vue';
	// import AppGrid from '@/components/app/AppGrid.vue';
	import { ref, computed, watchEffect } from 'vue';
	import { getPosts } from '@/api/posts';
	import { useRouter } from 'vue-router';
	import PostFilter from '@/components/posts/PostFilter.vue';
	import PostModal from '@/components/posts/PostModal.vue';
	import AppLoading from '@/components/app/AppLoading.vue';
	import { useAxios } from '@/composables/useAxios';
	const router = useRouter();

	const previewId = ref(null);
	const selectPreview = id => (previewId.value = id);

	const params = ref({
		_sort: 'createdAt',
		_order: 'desc',
		_limit: 3,
		_page: 1,
		title_like: '',
	});
	const {
		response,
		data: posts,
		error,
		loading,
	} = useAxios('/posts', {
		params,
	});
	console.log(response.value);
	// 상세 : useAxiosGet('/posts/${id}', { params });
	// 수정 : useAxiosPost('/posts/${id}', { params });
	// 등록 :
	// 이거 너무 복잡하다 useAxiosGet, useAxiosPost, useAxiosPut ...이나
	// 이거 너무 복잡하다 useAxiosQuery, useAxiosMutation 로 나누자..
	// const { error, loading, execute } = useAxios(
	// 		'/posts',
	// 		{
	// 			method: 'post'
	// 		},
	// 		{

	// 			immediate: false,
	// 			onSuccess: () => {
	// 				router.push({ name: 'PostList' });
	// 				vSuccess('등록이 완료되었습니다');
	// 			},
	// 			onError: err => {
	// 				vAlert(err.message);
	// 			},
	// 		},
	// 	);
	const save = () => {
		execute({ ...form.value, createdAt: Date.now() });
	};

	const totalCount = computed(() => response.value.headers['x-total-count']);
	const pageCount = computed(() => {
		return Math.ceil(totalCount.value / params.value._limit);
	});

	// const fetchPosts = async () => {
	// 	try {
	// 		loading.value = true;
	// 		const { data, headers } = await getPosts(params.value);
	// 		posts.value = data;
	// 		totalCount.value = headers['x-total-count'];
	// 	} catch (err) {
	// 		console.error(err);
	// 		error.value = err;
	// 	} finally {
	// 		loading.value = false;
	// 	}
	// };

	// watch와 다르게 초기 한번 실행
	// 콜백함수에서 반응형 데이터가 변경됨으로 ... 다시실행 _params.value.page
	// watchEffect(fetchPosts);
	const goPage = id => {
		// router.push(`/posts/${id}`);
		// router.push({ name: 'PostDetail', params: { id }, query: { aaa: 123 }, hash: `#${id}` });
		router.push({
			name: 'PostDetail',
			params: { id },
		});
	};
	// fetchPosts();

	//modal
	const show = ref(false);
	const modalTitle = ref('');
	const modalContents = ref('');
	const modalCreatedAt = ref('');
	const openModal = ({ title, contents, createdAt }) => {
		show.value = true;
		modalTitle.value = title;
		modalContents.value = contents;
		modalCreatedAt.value = createdAt;
	};
</script>

<style lang="scss" scoped></style>
