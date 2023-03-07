<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		/>
		<hr class="my-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<PostItem
					:title="item.title"
					:contents="item.contents"
					:created-at="item.createdAt"
					@click="goPage(item.id)"
				/>
			</template>
		</AppGrid>
		<!-- <div class="row g-3">
			<div class="col-4" v-for="post in posts" :key="post.id">
				
			</div>
		</div> -->
		<AppPagenation
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>
		<hr class="my-5" />
		<AppCard>
			<PostDetailView id="1" />
		</AppCard>
	</div>
</template>

<script setup>
	import PostItem from '@/components/posts/PostItem.vue';
	import PostDetailView from '@/views/posts/PostDetailView.vue';
	import AppCard from '@/components/AppCard.vue';
	import { ref, computed, watchEffect } from 'vue';
	import { getPosts } from '@/api/posts';
	import { useRouter } from 'vue-router';
	import AppPagenation from '@/components/AppPagenation.vue';
	import AppGrid from '@/components/AppGrid.vue';
	import PostFilter from '@/components/posts/PostFilter.vue';

	const posts = ref([]);
	const router = useRouter();

	const params = ref({
		_sort: 'createdAt',
		_order: 'desc',
		_limit: 3,
		_page: 1,
		title_like: '',
	});
	// pagination
	const totalCount = ref(0);
	const pageCount = computed(() => {
		return Math.ceil(totalCount.value / params.value._limit);
	});

	const fetchPosts = async () => {
		try {
			const { data, headers } = await getPosts(params.value);
			posts.value = data;
			totalCount.value = headers['x-total-count'];
		} catch (error) {
			console.error(error);
		}
	};

	// watch와 다르게 초기 한번 실행
	// 콜백함수에서 반응형 데이터가 변경됨으로 ... 다시실행 _params.value.page
	watchEffect(fetchPosts);
	const goPage = id => {
		// router.push(`/posts/${id}`);
		// router.push({ name: 'PostDetail', params: { id }, query: { aaa: 123 }, hash: `#${id}` });
		router.push({
			name: 'PostDetail',
			params: { id },
		});
	};
	fetchPosts();
</script>

<style lang="scss" scoped></style>
