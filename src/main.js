import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Buefy from "buefy"
import router from "./router"
import 'buefy/dist/buefy.css'
import "./variables.scss"
import "animate.css"
import axios from "axios"
import VueScrollmagic from 'vue-scrollmagic'
import './registerServiceWorker'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueScrollmagic)
Vue.use(Buefy)
Vue.config.productionTip = true

axios.defaults.baseURL = "https://wetravelplanner.herokuapp.com/api/"
axios.defaults.withCredentials = false;

axios.interceptors.response.use(null, async (error) => {
  // if (error.config && error.response && error.response.status === 401) {
  if (error.config && error) { // TODO: implement error handling that reflects backend.
    await store.dispatch("refreshLogin").then(async () => {
      error.config["headers"] = { "Authorization": "Bearer " + localStorage.getItem("token") }
      return await axios.request(error.config);
    });
  }

  return Promise.reject(error);
});
new Vue({
  store,
  router,
  runtimeCompiler: true,
  defaultIconPack: "mdi",
  render: h => h(App),
}).$mount('#app')
