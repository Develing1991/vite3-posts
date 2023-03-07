import { posts } from '.';

// axios

export function getPosts(params) {
	return posts.get('/', { params });
}

export function getPostById(id) {
	return posts.get(`/${id}`);
	// return posts.get(id);
}

export function createPost(data) {
	return posts.post(``, data);
}

export function updatePost(id, data) {
	// return posts.put(id, data);
	//return posts.put(`/${id}`, data);
	return posts.patch(`/${id}`, data); //put을 patch로 수정 Date가 안넘어가기 때문에 사라져서
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
