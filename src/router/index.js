import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pointage from '../views/Pointage.vue'
import Qrcode from '../views/Qrcode.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home,
    meta : {
        title : 'Accueil',
    }
  },
  {
    path: '/pointage/:id',
    name: 'Pointage',
    component : Pointage,
    props : true,
    meta : {
        title : 'Pointage'
    }
  },
  {
    path: '/qrcode/:action',
    name : 'qrcode',
    component : Qrcode
  },
  {
    path: '/about',
    name: 'À propos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router
