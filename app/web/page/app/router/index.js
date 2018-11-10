import Vue from 'vue';

import VueRouter from 'vue-router';

import ListView from '../../list';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component:() => import('../../double')
      },
      {
        path: '/list',
        component: ListView
      },
      {
        path: '/detail/:id',
        component: () => import('../../detail')
      },
      {
          path: '/double',
          component: () => import('../../double')
      }
    ]
  });
}

