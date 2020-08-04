import { authHeader } from "./api"
import axios from "axios"
import store, { ACCESS_TIMEOUT } from "../store/index"
import getAuthHeader from "./api"

export async function login(username, password) {
    const { data, status, statusTExt } = await axios.post('/token/', { username, password },)
    console.log(status);
    if (status !== 200) {
        return Promise.reject("Login auth failed")
    } else {
        return Promise.resolve({ data, status })
    }
}

export async function refreshAccess() {
    const refresh = localStorage.getItem("user")
    if (refresh) {
        const { data: { access } } = await axios.post("/token/refresh/",
            { refresh: refresh })
        return access
    }
    return {}
}

export async function isAuthenticated() {
    const access = localStorage.getItem("token"), refresh = localStorage.getItem("user");

    if (access !== null && refresh !== null) {
        return true
        let _now = new Date().getTime()
        if (access !== null && (_now - store.state.auth.accessTimeset < ACCESS_TIMEOUT)) {
            // Set auth token because its lieky to be unset on reloads.
        }
    } else return false
}


export async function getSettings(id = -1) {
    const auth = await isAuthenticated()
    if (!auth) {
        console.log("Settings Auth rejected");
        return Promise.reject("Client must be logged in to access this feature")

    }
    if (id === -1) {
        console.log("Getting settings data");
        let _data
        const { data } = await axios.get("/settings/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).catch(async err => {
            await store.dispatch("refreshLogin")
            const { data } = await axios.get("/settings/", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            _data = data;
        })
        if (!data && !_data) {

            console.log("Settings Query rejected");
            return Promise.reject("Query to api failed")
        }

        return data ? data : _data ? _data : () => { return Promise.reject("No data found") }
    } else {
        return {} // return other users settings?!
    }

}

export async function logout() {
    // remove user from local storage to log user out
    await store.dispatch("logout")
}



// export const responserWrapper = async (query) => {
//     const { data } = await query
//     if (!data)
// }