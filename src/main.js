import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import registro from './components/registro.vue'
import login from './components/login.vue'
import privado from './components/privado.vue'

Vue.config.productionTip = false
Vue.use(firestorePlugin);
Vue.use(VueRouter);
Vue.use(firebase);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const routes = [
  { path: '/', component: login },
  {path: '/privado', component: privado,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/registro', component: registro },
  { path: '/login', component: login },
]

const router = new VueRouter({
  routes,
})
router.beforeEach((to, from, next) => {
	firebase.auth().onAuthStateChanged((user) => {
		const currentUser = user;
		const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

		if(requiresAuth && !currentUser) next('login');
		else next()
	});
})


export default router;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
