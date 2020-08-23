import { authHeader } from "./api"
import axios from "axios"
import store, { ACCESS_TIMEOUT } from "../store/index"
import getAuthHeader from "./api"
import FormData from "form-data";

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

// TODO: fix
export async function isAuthenticated() {
    const access = localStorage.getItem("token"), refresh = localStorage.getItem("user");

    if (access !== null && refresh !== null) {
        return true // <-- c-c-c-combo breaker!
        let _now = new Date().getTime()
        if (access !== null && (_now - store.state.auth.accessTimeset < ACCESS_TIMEOUT)) {
            // Set auth token because its likey to be unset on reloads.
        }
    }
    return false
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
            return Promise.reject("Query to /api/settings/ failed")
        }
        const res = await axios.get("", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).catch(err => {
            return Promise.reject("Query to /api/ failed")
        })
        if (res.data) {
            data.pk = res.data.pk
        }

        return data
    } else {
        return {} // return other users settings?!
    }

}

export async function getProfile(id) {
    const auth = await isAuthenticated()
    if (!auth) {
        console.log("Settings Auth rejected");
        return Promise.reject("Client must be logged in to access this feature")
    }
    let _data
    const { data } = await axios.get("/profile/" + id + "/", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).catch(async err => {
        await store.dispatch("refreshLogin")
        const { data } = await axios.get("/profile/" + id + "/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        return data
    })
    if (!data) {

        console.log("Settings Query rejected");
        return Promise.reject("Query to api failed")
    }

    return data
}


/**
 * https://github.com/MadsAW/WeTravel-backend/blob/master/docs/user/profile.md
 * @param {Number} id 
 * @param {description: string, interests: [Number], tastes: [Number]} data 
 */
export async function updateProfile(id, data) {
    const auth = await isAuthenticated()
    if (!auth) {
        console.log("Settings Auth rejected");
        return Promise.reject("Client must be logged in to access this feature")
    }
    const config = {
        method: "post",
        url: `/api/profile/${id}/`,
        data: {
            ...data
        },
    }
    return await axios(config)
}


export async function uploadProfilePicture(file) {
    let fd = new FormData();
    fd.append("image", file);
    let res = await axios.post(
        "/profile/picture/",
        {
            fd,
        },
        {
            headers: {
                "content-type":
                    "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            },
            multipart: {
                chunked: false,
                data: [
                    {
                        "Content-Disposition": `form-data; name="filedata"; filename="${"image"}"`,
                        body: JSON.stringify(fd),
                    },
                ],
            },
        }
    );
    return res
}

export async function getFollowers(id) {
    const config = {
        method: "get",
        url: `/follow/${id}/followers/`,
        data: {
            pk: id
        }
    }
    return await axios(config)
}

export async function getFollowing(id) {
    const config = {
        method: "get",
        url: `/follow/${id}/following/`,
        data: {
            pk: id
        }
    }
    return await axios(config)
}

export async function followUser(id) {
    const config = {
        method: "post",
        url: "/follow/",
        data: {
            pk: Number(id),
        },
    };
    return await axios(config)
}

export async function unfollowUser(id) {
    const config = {
        method: "delete",
        url: "/follow/",
        data: {
            pk: Number(id),
        },
    };
    return await axios(config)
}


export async function logout() {
    // remove user from local storage to log user out
    await store.dispatch("logout")
}



// export const responserWrapper = async (query) => {
//     const { data } = await query
//     if (!data)
// }