import { createRouter, createWebHistory } from 'vue-router'
import Signup from "../views/Signup.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Home from "../views/Home.vue"
import Asset from "../views/Asset.vue"

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/dashboard",
    name: 'Dashboard',
    component: Dashboard,
    children : [
      {
        path: "",
        name: "Home",
        component: Home

      },
      {
        path: "/dashboard/asset",
        name: "Asset",
        component: Asset
      }
    ]

  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
