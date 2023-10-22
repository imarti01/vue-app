import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/styles.css';

const app = createApp(App);

app.use(router);
app.use(OpenLayersMap);

app.config.globalProperties.$axios = Axios;

app.component('v-select', VueSelect);
app.mount('#app');
