import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8db016b0 = () => interopDefault(import('..\\pages\\device\\index.vue' /* webpackChunkName: "pages_device_index" */))
const _47656079 = () => interopDefault(import('..\\pages\\lectures.vue' /* webpackChunkName: "pages_lectures" */))
const _17ac1755 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _4f9f26d6 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _fc7f7532 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _d9236318 = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages_users" */))
const _d8ea29d4 = () => interopDefault(import('..\\pages\\device\\create.vue' /* webpackChunkName: "pages_device_create" */))
const _0b3c6c0b = () => interopDefault(import('..\\pages\\user\\create.vue' /* webpackChunkName: "pages_user_create" */))
const _c809fde0 = () => interopDefault(import('..\\pages\\device\\_id.vue' /* webpackChunkName: "pages_device__id" */))
const _01292c3b = () => interopDefault(import('..\\pages\\user\\_id.vue' /* webpackChunkName: "pages_user__id" */))
const _4e04743e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/device",
      component: _8db016b0,
      name: "device"
    }, {
      path: "/lectures",
      component: _47656079,
      name: "lectures"
    }, {
      path: "/login",
      component: _17ac1755,
      name: "login"
    }, {
      path: "/profile",
      component: _4f9f26d6,
      name: "profile"
    }, {
      path: "/register",
      component: _fc7f7532,
      name: "register"
    }, {
      path: "/users",
      component: _d9236318,
      name: "users"
    }, {
      path: "/device/create",
      component: _d8ea29d4,
      name: "device-create"
    }, {
      path: "/user/create",
      component: _0b3c6c0b,
      name: "user-create"
    }, {
      path: "/device/:id",
      component: _c809fde0,
      name: "device-id"
    }, {
      path: "/user/:id?",
      component: _01292c3b,
      name: "user-id"
    }, {
      path: "/",
      component: _4e04743e,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
