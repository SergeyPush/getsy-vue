import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import { RouterPaths } from './routes.paths';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RouterPaths.HOME,
      name: 'Home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: RouterPaths.PRODUCTS,
      name: 'Products',
      component: () => import('../pages/Products.vue'),
    },
    {
      path: RouterPaths.SERVICES,
      name: 'Services',
      component: () => import('../pages/Services.vue'),
    },
  ],
});

export default router;
