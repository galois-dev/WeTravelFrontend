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




// axios.interceptors.response.use(reponse => {
//   return reponse
// }, err => {
//   const {
//     config,
//     response: { status, data },
//   } = err;
//   console.log("error with status " + status);
//   if (status === 401 && data.message === "Expired token") {
//     store.dispatch("refreshLogin").then(async ({ status }) => {
//       if (status === "success") {
//         return Promise.resolve(await axios(config))
//       }
//       if (status === "error") {
//         // Do nothing as user is already redirected
//         return response
//       }
//     })
//   }
//   return err
// })
axios.interceptors.response.use(null, async (error) => {
  // if (error.config && error.response && error.response.status === 401) {
  if (error.config && error) { // TODO: implement error handling that reflects backend.
    await store.dispatch("refreshLogin").then(async () => {
      error.config["headers"] = { "Authorization": "Bearer " + localStorage.getItem("token") }
      // Here, the request data will be double stringified with qs.stringify,
      // potentially leading to 422 responses or similar.
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

// Vue.prototype.$http = Axios;
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }