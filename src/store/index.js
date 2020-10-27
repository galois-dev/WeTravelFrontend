import Vue from 'vue'
import Vuex from 'vuex'
import * as userService from "../utils/userService";
import * as saveboardService from "../utils/saveboardService"
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
      profile_image: "",
      firstname: "",
      lastname: "",
      email: "",
      country: "",
      language: "",
      gender: "",
      birthday: "",
      pk: "",
      meta: {
        loaded: false
      }
    },
    Saveboards: {
      boards: []
    },
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
      await localStorage.setItem('token', access)

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
    },
    updateMyUserSettings(state, { birthday, language, profile_image, email, firstname, lastname, gender, country, pk }) {
      state.UserSettings.profile_image = profile_image
      state.UserSettings.firstname = firstname
      state.UserSettings.lastname = lastname
      state.UserSettings.email = email
      state.UserSettings.language = language
      state.UserSettings.country = country
      state.UserSettings.gender = gender
      state.UserSettings.birthday = birthday
      state.UserSettings.pk = pk
      state.UserSettings.meta.loaded = true
    },
    push_all_saveboards(state, { boards }) {
      state.Saveboards.boards = boards;
    }
  },
  actions: {
    // Takes arguments so is not self driven
    async login({ dispatch, commit }, { access, refresh }) {
      commit('loginSuccess', { access, refresh });
      router.push({ path: 'Inspiration' });
    },
    async refreshMyUserSettings({ dispatch }) {
      // query
      const data = await userSerivce.getSettings()
      dispatch("pushUserSettings", data)
    },
    async pushUserSettings({ dispatch, commit }, data) {
      const {
        birthday,
        calendar_view,
        country,
        email,
        firstname,
        gender,
        language,
        lastname,
        profile_image,
        pk
      } = data

      commit("updateMyUserSettings", data)

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

    async querySaveboards({ commit }) {
      console.log("querySaveboards()");
      let boards = await saveboardService.getAllSaveboards()
      console.log(boards);
      commit("push_all_saveboards", boards.data)
    },
  },
  modules: {
  }
})