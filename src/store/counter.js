import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 0,
	}),
	getters: {
		hasLength(state) {
			return state.counter > 0 ? true : false;
		},
		aaa() {
			return this.hasLength;
		},
	},
	actions: {
		increase() {
			this.counter++;
		},
	},
});
