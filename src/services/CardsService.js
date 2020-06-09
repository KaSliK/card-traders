import axios from "axios";
import store from '../store'


export default {
   getCards,
   subtractCard,
   addCard
}
function getCards(category, subCategory) {
   if(subCategory === null) {
      return getCardsByCategory(category)
   } else {
      return getCardsByAndSubCategory(category, subCategory)
   }
}

function getCardsByCategory(category) {
   return axios.get(`/api/cards/c/${category}`)
}

function getCardsByAndSubCategory(category, subCategory) {
   return axios.get(`/api/cards/${category}/${subCategory}`)
}

function addCard(card) {
   axios.put(`/api/users/cards/add/${card.id}`)
   store.dispatch('addOneCard', card)
   return
}

function subtractCard(card) {
   if(card.qty>0) {
      axios.put(`/api/users/cards/sub/${card.id}`)
      store.dispatch('subtractOneCard', card)
   }
   return
}
