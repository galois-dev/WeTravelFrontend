import Vue from 'vue'
import Vuex from 'vuex'
import * as userService from "../utils/userService";
import router from "../router/index"
import createPersistedState from "vuex-persistedstate";
import Axios from "../utils/api"
import axios from 'axios'

Vue.use(Vuex)
export const ACCESS_TIMEOUT = 900000;
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    renderingHints: {
      lang: "EN",

    },
    auth: {
      access: localStorage.getItem('token') || '',
      accessTimeset: Number,
      refresh: localStorage.getItem('refresh') || ''
    },
    UserSettings: {
      firstname: "",
      lastname: "",
      email: "",
      country: "",
      gender: "",
      brithyear: -1,
      meta: {
        loaded: false
      }
    }
  },
  mutations: {
    async loginSuccess(state, { access, refresh }) {
      state.auth = {
        access: access, refresh: refresh, accessTimeset: new Date().getTime()
      };
      console.log(access, refresh);
      localStorage.setItem('token', access)
      localStorage.setItem('user', refresh)
      axios.defaults.headers.common['Authorization'] = "Bearer " + access

    },
    async refreshAccess(state, { access }) {
      state.auth = { access: access, refresh: state.auth.refresh }
      axios.defaults.headers.common['Authorization'] = "Bearer " + access;
      localStorage.setItem('token', access)

    },
    async logout(state) {
      state.auth = {};
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + "no-access";
    },
    registerRequest(state, user) {
      state.status = { registering: true };
    },
    registerSuccess(state, user) {
      state.status = {};
    },
    registerFailure(state, error) {
      state.status = {};
    },
    push_initial_settings(state, settings) {
      let _now = new Date().getTime()

      if (localStorage.getItem("user") !== null && _now - state.auth.accessTimeset < ACCESS_TIMEOUT) {

        this.dispatch("refreshLogin")

      } else {
        if (state.auth.refresh !== null) {
          // dispatch("refreshLogin")
        }
      }
    }
  },
  actions: {
    // Takes arguments so is not self driven
    async login({ dispatch, commit }, { access, refresh }) {
      commit('loginSuccess', { access, refresh });
      router.push({ path: 'Inspiration' });
    },

    // Takes no args, is self driven.
    async refreshLogin({ dispatch, commit }) {
      const access = await userService.refreshAccess()
      console.log(access);
      if (!access) {
        router.push({ path: 'Home' }) //Logout if refresh failed
        return { status: "error" }
      } else {
        commit('refreshAccess', { access })
        return { status: "success" }
      }; // Refresh acess token if it didnt
    },

    // Takes no args, is self driven.
    async logout({ commit }) {
      userService.logout();
      commit('logout');
      router.push({ path: 'Home' })
    },

    async querySettings({ dispatch, commit }) {
      const { firstname, lastname, email, isPublic, country, gender, birthyear, } = await userService.getSettings()
    },

    async init_settings({ dispatch, commit }) {
      commit("push_initial_settings")
    },

  },
  modules: {
  }
})
