import { IonicVueRouter } from '@ionic/vue';
import Vue from 'vue';
import Home from './views/Home.vue';

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/country',
      name: 'country',
      component: () => import('./views/Countrys.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
    },
    {
      path: '/offline',
      name: 'offline',
      component: () => import('./views/Offline.vue'),
    },
  ],
});
