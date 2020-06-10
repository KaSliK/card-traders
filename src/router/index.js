import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresVisitor: true,
    },
    props: true,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requiresVisitor: true,
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/profil',
    name: 'Profile',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/wszystkie_karty',
    name: 'AllCards',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/AllCards.vue')
  },
  {
    path: '/karty_uzytkownikow',
    name: 'someoneCards',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/someoneCards.vue')
  },
  {
    path: '/karty_wystawione_na_wymiane',
    name: 'ForChangeCards',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/ForChangeCards.vue')
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.loggedIn) {
        next({
          name: 'Home',
        })
      } else {
          next()
        }
      } else {
      next()

    }

})


export default router
