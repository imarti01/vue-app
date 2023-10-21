import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const app = createApp(App);

app.use(router);

app.config.globalProperties.$axios = Axios;

app.component('v-select', VueSelect);
app.mount('#app');
