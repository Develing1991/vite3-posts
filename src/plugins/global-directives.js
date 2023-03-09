import color from '@/directive/color';
import focus from '@/directive/focus';

export default {
	install(app) {
		app.directive('focus', focus);
		app.directive('color', color);
	},
};
