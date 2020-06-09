import Vue from 'vue'
export default {
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
}
