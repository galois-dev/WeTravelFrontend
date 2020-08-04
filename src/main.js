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
Vue.use(VueScrollmagic)
Vue.use(Buefy)
Vue.config.productionTip = true

axios.defaults.baseURL = "https://wetravelplanner.herokuapp.com/api/"
axios.defaults.withCredentials = false;

axios.interceptors.response.use(reponse => {
  return reponse
}, err => {
  const {
    config,
    response: { status, data },
  } = err;
  console.log("error with status " + status);
  if (status === 401 && data.message === "Expired token") {
    store.dispatch("refreshLogin").then(({ status }) => {
      if (status === "success") {
        return Promise.resolve(axios(config))
      }
      if (status === "error") {
        // Do nothing as user is already redirected
      }
    })
  }
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

// Vue.prototype.$http = Axios;
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }