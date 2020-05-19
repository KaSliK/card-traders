import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

axios.defaults.baseURL = 'http://ct.zobacztu.pl'

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('access_token') || null
  },

  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
          state.token = null
    },
  },

    actions: {
      register(context, data) {
          return new Promise((resolve, reject) => {
              axios.post('/api/users/register', {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  c_password: data.c_password
              })
                  .then(response => {

                      resolve(response)
                  })
                  .catch(error => {
                      localStorage.removeItem('access_token')
                      context.commit('destroyToken')
                      reject(error)
                  })
          })
      },
      destroyToken(context) {
          axios.defaults.headers.common['Authorization'] = 'Bearer' + context.state.token
          if(context.getters.loggedIn)
          {
              return new Promise((resolve, reject) => {
                  axios.post('')
                      .then(response => {
                          const token = response.data.success.token
                          localStorage.setItem('access_token', token)
                          context.commit('destroyToken')
                          resolve(response)
                      })
                      .catch(error => {
                          localStorage.removeItem('access_token')
                          context.commit('destroyToken')
                          reject(error)
                      })
              })
          }
      },
      retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
          axios.post('/api/login', {
            email: credentials.email,
            password: credentials.password,
          })
              .then(response => {
                const token = response.data.success.token
                localStorage.setItem('access_token', token)
                context.commit('retrieveToken', token)
                resolve(response)
              })
              .catch(error => {
                reject(error)
              })
        })
      },

    logout ({ commit }) {
      commit('clearUserData')
    }
  },
  getters : {
    loggedIn(state) {
      return state.token !== null
    }
  }
})
