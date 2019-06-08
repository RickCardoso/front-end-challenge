import Vue from 'vue';
import auth from './core/auth';
import Router from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import ClientDetail from '@/views/ClientDetail.vue';
import Transactional from '@/views/Transactional.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/client-detail/:clientId',
      name: 'client-detail',
      component: ClientDetail,
    },
    {
      path: '/client-transactions/:clientId',
      name: 'client-transactions',
      component: Transactional,
    },
    {path: '*', redirect: '/'},
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = auth.isAuthenticated();
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});
export default router;
