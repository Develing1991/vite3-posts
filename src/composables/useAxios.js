import axios from 'axios';
import { ref, unref, watchEffect, isRef } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (url, config = {}, options = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	const { onSuccess, onError } = options;
	const { params } = config;

	const execute = () => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(url, {
			method: 'get',
			...config,
			params: unref(params),
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};
	// ref로 전달하는 사람도 있고 일반 객체로 전달하는 사람도 있으므로
	if (isRef(params)) {
		watchEffect(execute);
	} else {
		execute();
	}

	return {
		response,
		data,
		error,
		loading,
		execute,
	};
};
