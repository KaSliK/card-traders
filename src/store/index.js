import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)




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
       state.categories = payload
     },
     addSubCategory(state, payload) {
        state.subCategories = payload
     },
     saveUserInfo(state, payload) {
        state.user = payload
        localStorage.setItem("user", JSON.stringify(payload));
     },
     clearUserData(state) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        state.token=null
        state.user=null
        location.reload()
     },
     addOneCard(state, card) {
        card.qty++
        Vue.set(state.user.cards, card.id, card)
     },
     subtractOneCard(state, card) {
        card.qty--
        Vue.set(state.user.cards, card.id, card)
     },
     deleteCard(state, card) {
        card.qty = 0
        Vue.set(state.user.cards, card.id, card)
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
                axios.post('/api/login', {
                 email: credentials.email,
                 password: credentials.password,
             })
                 .then(response => {
                     const token = response.data.data.token
                     localStorage.setItem('access_token', token)
                     context.commit('retrieveToken', token)
                     resolve(response)
                 })
                 .catch(error => {
                     reject(error)
                 })
         })
   },
     retrieveInfo({commit}) {
         return new Promise((resolve, reject) => {
             axios.get('/api/users/details')
                 .then(response => {
                    commit('saveUserInfo', response.data.data)
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
             var category = []
             for (let i=0 ; i<response.data.data.length ; i++) {
                category.push({
                   "name": response.data.data[i].name,
                   "id": response.data.data[i].id
                })

             }
             commit('addCategory', category)
          }).catch(error => {
             reject(error)
          })
       })
    },
    getSubCategories({commit}) {
       return new Promise( (resolve, reject) => {
          axios.get('/api/subcategories').then(response => {
             var subCategory = []
             for (let i=0 ; i<response.data.data.length ; i++) {
                subCategory.push({
                   name: response.data.data[i].name,
                   id: response.data.data[i].id
                })

             }
             commit('addSubCategory', subCategory)
             resolve(response)
          }).catch(error => {
             reject(error)
          })
       })

    },
    logout ({ commit }) {
      commit('clearUserData')
    },
    addOneCard(context, card) {
      context.commit('addOneCard', card)
    },
    subtractOneCard(context, card) {
       context.commit('subtractOneCard', card)
    },
    deleteCard(context, card) {
       context.commit('deleteCard', card)
    }
  },
  getters : {
    loggedIn(state) {
      return state.token !== null
    },
     token(state) {
       return state.token
     },
     categories(state) {
       return state.categories
     },
     subCategories(state) {
        return state.subCategories
     },
     userCards(state) {
       if(state.user) return state.user.cards
        return
     },
     user(state) {
       return state.user
     }
  }
})
