import { createRouter, createWebHistory } from 'vue-router';
import { RouterPaths } from './routes.paths';
import { useAuthStore } from '../store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: RouterPaths.HOME,
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: RouterPaths.PRODUCT,
      name: 'product',
      component: () => import('../pages/ProductDetail.vue'),
    },
    {
      path: RouterPaths.MY_PRODUCTS,
      name: 'my-products',
      component: () => import('../pages/MyProducts.vue'),
      meta: {
        isPrivate: true,
      },
    },
    {
      path: RouterPaths.CREATE,
      name: 'create',
      component: () => import('../pages/Create.vue'),
      meta: {
        isPrivate: true,
      },
    },
    {
      path: RouterPaths.NOT_FOUND,
      name: 'not-found',
      component: () => import('../pages/NotFound.vue'),
    },
    {
      path: RouterPaths.FAVORITES,
      name: 'favorites',
      component: () => import('../pages/Favorites.vue'),
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.isPrivate && !auth.isAuthenticated) {
    return {
      path: '/',
    };
  }
});

export default router;
