import store, { ACCESS_TIMEOUT } from '../store'
import router from "../router/index"
const axios = require('axios')
// let Axios
// export default Axios = axios.create({
//     baseURL: 'https://wetravelplanner.herokuapp.com/api/'
// })

// Axios.interceptors.response.use(async (response) => {
//     // please keep acccess alive: the saga.
//     let _now = new Date().getTime()
//     if (store.state.auth.access !== null && (_now - store.state.auth.accessTimeset < ACCESS_TIMEOUT)) {
//         return response
//     } else {
//         if (store.state.auth.access !== null && (_now - store.state.auth.accessTimeset < ACCESS_TIMEOUT)) {
//             const res = await Axios.post('/token/refresh/', {
//                 "refresh": store.state.auth.refresh
//             }).catch(err => {
//                 router.push({ name: "Home" })
//             })
//             if (res.status === 201 || res.status === 200) {
//                 res.access
//                 await store.commit('loginSuccess', {
//                     access: res.access,
//                     refresh: store.state.refresh
//                 })
//                 return response
//             }
//         } else {
//             return response
//         }
//     }
// })
// },
//     // Had issues with this one might just comment out.
//     function (error) {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {

//             originalRequest._retry = true;
//             return Axios.post('/token/refresh/',
//                 {
//                     "refresh": store.state.auth.refresh
//                 })
//                 .then(res => {
//                     if (res.status === 201) {
//                         // 1) put token to LocalStorage
//                         console.log(res.access);
//                         store.commit('loginSuccess', { access: res.access, refresh: store.state.refresh })

//                         // 2) Change Authorization header
//                         Axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access

//                         // 3) return originalRequest object with Axios.
//                         return axios(originalRequest);
//                     }
//                 })
//                 .catch(err => {
//                 })
//         } else {
//             router.push({ name: "Home" })
//         }


//     })


export function getAuthHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem("token")
    console.log(token);
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}