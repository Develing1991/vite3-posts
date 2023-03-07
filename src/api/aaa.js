import { defineComponent } from 'vue';

defineComponent({
	// type inference enabled
	name: 'LayoutIndex',
	props: {
		name: String,
		msg: { type: String, required: true },
	},
	data() {
		return {
			count: 1,
		};
	},
	mounted() {
		this.name; // type: string | undefined
		this.msg; // type: string
		this.count; // type: number
	},
	computed: {
		viewClass() {
			// const { viewClass } = childs[4] ?? '';
			// return viewClass;
			return '123';
		},
	},
	template: /* html */ `
  <div></div>
  `,
});
