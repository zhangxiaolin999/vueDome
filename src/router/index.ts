import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { Message } from "element-ui";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (to.path === "/" && !sessionStorage.getItem("token")) {
        Message("无登录信息,前去登录");
        setTimeout(() => {
          next({ path: "/login" });
        }, 1000);
      } else {
        next();
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "*",
    name: "error",
    component: () => import("./../views/Notfound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
