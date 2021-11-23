import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'
import Signup from "../views/Signup.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Home from "../views/Home.vue"
import Assets from "../views/Assets.vue"
import Asset from "../views/Asset.vue"
import AssetsView from '../views/AssetsView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children : [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true }
      },
      {
        path: "/dashboard/assets",
        name: "AssetsView",
        component: AssetsView,
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "Assets",
            component: Assets,
            meta: { requiresAuth: true }
          },
          {
            path: "/dashboard/assets/asset/:id",
            name: "Asset",
            component: Asset,
            meta: { requiresAuth: true }
          }
        ]
      }
    ]

  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const redirectToLogin = route => {
  const login = 'Login';
  if (route.name != login) {
    return { name: login, replace: true, query: { redirectFrom: route.fullPath } };
  }
};

router.beforeEach((to) => {
  // let sessionUserData = JSON.parse(sessionStorage.getItem('login-token'))
  let localUserData = store.state.userInfo;
  let userData = localUserData || {}
  let userIsAuthenticated = userData.token !== "" && userData.token !== undefined
  const requiresAuth = to.matched.some((route) => route.meta && route.meta.requiresAuth);

  if (!userIsAuthenticated && to.fullPath === '/') {
    return redirectToLogin(to);
  }

  if (!userIsAuthenticated && requiresAuth) {
    return redirectToLogin(to);
  }

  return true;
});


export default router
