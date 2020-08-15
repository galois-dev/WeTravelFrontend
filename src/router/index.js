import Vue from 'vue'
import VueRouter from 'vue-router'
import profile from "../views/profile"
import inspiration from "../views/inspiration"
import settings from "../views/settings"
import travelList from "../views/travelList"
import travelDiary from "../views/travelDiary"
import test from "../views/test.vue"
import landingPage from "../views/landingPage"
import adventure from "../views/adventure"
import exampleScroll from "../views/exampleScroll"
import store from "../store/index"
import travel_book_list from "../components/travel_book_list.vue"
import { isAuthenticated } from '../utils/userService'
Vue.use(VueRouter)

const routes = [
  {
    path: "/test/",
    name: "test",
    component: test,
  },
  {
    path: "/adventure/:pk/",
    name: "adventure",
    component: adventure,
  },
  {
    path: '/',
    name: 'Home',
    component: landingPage,
  },
  {
    path: "/profile/:pk/",
    name: "profile",
    component: profile,
  },
  {
    path: "/inspiration/",
    name: "Inspiration",
    component: inspiration,
  },
  {
    path: "/settings/",
    name: "settings",
    component: settings,
  },
  {
    path: "/travelList/",
    name: "travelList",
    component: travelList,
  },
  {
    path: "/travelDiary/",
    name: "travelDiary",
    component: travelDiary,
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

// Privacy guard
router.beforeEach(async (to, from, next) => {
  // const Auth = await isAuthenticated().catch(err => {
  // })
  const Auth = true;
  if (to.name !== 'Home' && Auth !== true) { await next({ name: 'Home' }); }
  else { await next(); }
})


export default router
