import axios from "axios";

export default {
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
            reject(error)
         })
   })
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
      axios.get('/api/categories')
         .then(response => {
            var category = []
            for (let i=0 ; i<response.data.data.length ; i++) {
               category.push({
                  "name": response.data.data[i].name,
                  "id": response.data.data[i].id
               })
            }
            commit('addCategory', category)
         })
         .catch(error => {
            reject(error)
         })
   })
},
   getSubCategories({commit}) {
   return new Promise( (resolve, reject) => {
      axios.get('/api/subcategories')
         .then(response => {
            var subCategory = []
            for (let i=0 ; i<response.data.data.length ; i++) {
               subCategory.push({
                  name: response.data.data[i].name,
                  id: response.data.data[i].id
               })
            }
            commit('addSubCategory', subCategory)
            resolve(response)
         })
         .catch(error => {
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
}
