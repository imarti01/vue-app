import { createRouter, createWebHistory } from 'vue-router';
import TablePage from '../views/TablePage.vue';
import MapPage from '../views/MapPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'TablePage',
      component: TablePage,
    },
    {
      path: '/map',
      name: 'MapPage',
      component: MapPage,
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/',
    },
  ],
});

export default router;
