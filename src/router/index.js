import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty-layout' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty-layout' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main-layout' },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main-layout' },
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main-layout' },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main-layout' },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main-layout' },
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/detail-history',
    name: 'detail-history',
    meta: { layout: 'main-layout' },
    component: () => import('../views/DetailHistory.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main-layout' },
    component: () => import('../views/Planning.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
