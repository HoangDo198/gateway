import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axiosInstance';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Applang: localStorage.getItem('Applang') || null,
    appname: localStorage.getItem('Appname') || null,
  },
  mutations: {
    getApplang(state, langs) {
      state.Applang = langs;
    },
    getAppname(state, name) {
      state.appname = name;
    }
  },
  getters: {
    checkState(state) {
      if (Array.isArray(state.Applang)) {
        return state.Applang;
      } else {
        return state.Applang.split(",");
      }
    }
  },
  actions: {
    getAppname({
      commit
    }, appname) {
      return new Promise((resolve, reject) => {
        axios.get('/getSupportedLanguageByApp', {
          params: {
            application: appname
          }
        }).then(res => {
          const languages = res.data.data;
          const name = appname;
          localStorage.setItem('Applang', languages);
          localStorage.setItem('Appname', name);
          resolve(res);
          commit('getApplang', languages);
          commit('getAppname', name);
        }).catch(err => {
          console.log(err);
          reject(err);
          localStorage.removeItem('Applang');
          localStorage.removeItem('Appname');
        })
      })
    }
  },
  modules: {}
})
