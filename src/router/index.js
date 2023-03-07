import {
	createRouter,
	//createWebHashHistory,
	createWebHistory,
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/Nested/NestedView.vue';
import NestedOneView from '@/views/Nested/NestedOneView.vue';
import NestedTwoView from '@/views/Nested/NestedTwoView.vue';
import NestedHomeView from '@/views/Nested/NestedHomeView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		// router에서도 props로 넘길 수있군
		props: true,
		// props: {word:'hello'}
		// props: route => {
		// 	return {
		// 		id: parseInt(route.params.id), //String을 number로 변경해서 주기위해
		// 		//other: parseInt(route.query.id),
		// 	};
		// },
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
];

const router = createRouter({
	// localhost:3000/nested/one 같이 전체 경로를 포함해서 리소스요청
	// 보통 기본 /루트로 요청하면 index.html파일을 돌려줌 하지만 위와같은 이런 경로는 index.html 파일을 찾을 수 없다고.. 오류를 보여줌
	// history모드로 운영서버에 배포를하면 localhost:3000/nested/one이런 경로 접근시 페이지를 찾을 수 없음
	// 그래서 history모드로 배포를 할때는 서버에 추가로 설정을 해야함 (nginx, 아파치,,  공식문서 참조) 이러한 설정이 가능한 서버를 준비 해야 됨
	history: createWebHistory('/'),

	// 해시는 어차피 서버에 요청을 루트로만 서버에 이런 설정없이 바로 배포하고 사용가능
	// 치명적 단점 : 검색엔진에 노출이 되지 않음.. 해시는 무시하게 됨
	// 대부분 그래서 우리는 createWebHistory로 배포함
	//history: createWebHashHistory('/'), // localhost:3000/
	routes,
});

export default router;
