import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("@/views/UploadView.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
