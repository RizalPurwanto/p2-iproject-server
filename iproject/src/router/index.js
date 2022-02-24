import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue"
import Dnb from "../views/Dnb"
import DriverLicence from "../views/DriverLicence"
import Aec from "../views/Aec"
import Visa from "../views/Visa"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/driverlicence",
    name: "DriverLicence",
    component: DriverLicence,
  },
  {
    path: "/dnb",
    name: "Dnb",
    component: Dnb,
  },
  {
    path: "/aec",
    name: "Aec",
    component: Aec,
  },
  {
    path: "/visa",
    name: "Visa",
    component: Visa,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next)=>{
  
  if(to.name == "Register" && localStorage.verificationId) {
    next("/")
  } else if (to.name !== "Register" && !localStorage.verificationId){
    next("/register")
  }  else {
    next()
  }

})

export default router;
