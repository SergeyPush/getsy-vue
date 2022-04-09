import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import { RouterPaths } from './routes.paths';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RouterPaths.HOME,
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: RouterPaths.PRODUCTS,
      name: 'products',
      component: () => import('../pages/Products.vue'),
    },
    {
      path: RouterPaths.SERVICES,
      name: 'services',
      component: () => import('../pages/Services.vue'),
    },
    {
      path: RouterPaths.CREATE,
      name: 'create',
      component: () => import('../pages/Create.vue'),
    },
  ],
});

export default router;
