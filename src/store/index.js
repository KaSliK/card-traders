import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

axios.defaults.baseURL = 'http://ct.zobacztu.pl'


export default new Vuex.Store({
  state: {
   user: null,
   token: localStorage.getItem('access_token') || null,
   categories: [],
   subCategories: []
  },

  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
          state.token = null
    },
     addCategory(state, payload) {
       state.categories.push(payload)
     },
     addSubCategory(state, payload) {
        state.subCategories.push(payload)
     }
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
                       const token = response.data.data.token
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
             //axios.post('http://localhost:8000/login', {
                axios.post('/api/login', {
                 email: credentials.email,
                 password: credentials.password,
             })
                 .then(response => {
                      const token = response.data.data.token
                    //const token = response.data.token
                     localStorage.setItem('access_token', token)
                     context.commit('retrieveToken', token)
                     resolve(response)
                 })
                 .catch(error => {
                     reject(error)
                 })
         })


   },
     retrieveInfo() {
         return new Promise((resolve, reject) => {
             axios.get('/api/users/details')
                 .then(response => {
                     resolve(response)
                 })
                 .catch(error => {
                     reject(error)
                 })
         })
     },
    getCategories({commit}) {
       return new Promise( (resolve, reject) => {
          axios.get('/api/categories').then(response => {
             for (let i=0 ; i<response.data.data.length ; i++) {
                const category = {
                   name: response.data.data[i].name,
                   id: response.data.data[i].id
                }
                commit('addCategory', category)
             }
          }).catch(error => {
             reject(error)
          })
       })
    },
    getSubCategories({commit}) {
       return new Promise( (resolve, reject) => {
          axios.get('/api/subcategories').then(response => {
             for (let i=0 ; i<response.data.data.length ; i++) {
                const subCategory = {
                   name: response.data.data[i].name,
                   id: response.data.data[i].id
                }
                commit('addSubCategory', subCategory)
             }
             resolve(response)
          }).catch(error => {
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
    },
     categories(state) {
       return state.categories
     },
     subCategories(state) {
        return state.subCategories
     }

  }
})
