<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent="">
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" name="" id="" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-3">
			<div class="col-4" v-for="post in posts" :key="post.id">
				<PostItem
					:title="post.title"
					:contents="post.contents"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				/>
			</div>
		</div>
		<nav class="mt-5" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item" :class="{ disabled: !(params._page > 1) }">
					<a
						class="page-link"
						href="#"
						aria-label="Previous"
						@click.prevent="--params._page"
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li
					class="page-item"
					:class="{ active: params._page === page }"
					v-for="page in pageCount"
					:key="page"
				>
					<a class="page-link" href="#" @click.prevent="params._page = page">{{
						page
					}}</a>
				</li>
				<li
					class="page-item"
					:class="{ disabled: !(params._page < pageCount) }"
				>
					<a
						class="page-link"
						href="#"
						aria-label="Next"
						@click.prevent="++params._page"
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
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
