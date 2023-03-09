import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import day from './plugins/day';
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(router);
app.use(globalDirectives);
app.use(day);
app.use(createPinia());
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
import globalDirectives from './plugins/global-directives';
