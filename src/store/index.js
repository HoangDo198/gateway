import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axiosInstance';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Applang: localStorage.getItem('Applang') || null,
    appname: localStorage.getItem('Appname') || null,
    dialog: false
  },
  mutations: {
    getApplang(state, langs) {
      state.Applang = langs;
    },
    getAppname(state, name) {
      state.appname = name;
    },
    getdialog(state, sts) {
      state.dialog = sts;
    }
  },
  getters: {
    checkState(state) {
      if (Array.isArray(state.Applang)) {
        return state.Applang;
      } else {
        return state.Applang.split(",") || null;
      }
    },
    getdialog: state => state.dialog,
    getAppname(state) {
      return state.appname;
    } 
  },
  actions: {
    getAppname({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('/getCodeByApp', {
          params: {
            application: payload.application,
            code: payload.code
          }
        }).then(res => {
          const languages = res.data.data;
          const name = payload.application;
          localStorage.setItem('Applang', languages);
          localStorage.setItem('Appname', name);
          resolve(res);
          commit('getApplang', languages);
          commit('getAppname', name);
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      })
    },
    getdialog({commit}, sts) {
      commit('getdialog', sts);
    }
  },
  modules: {}
})
