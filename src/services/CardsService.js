import axios from "axios";
import store from '../store'

export default {
   getCards,
   subtractCard,
   addCard,
   deleteCard,
   getOtherUserCards,
   makeArrayFromObject
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
}

function subtractCard(card) {
   if(card.qty>0) {
      axios.put(`/api/users/cards/sub/${card.id}`)
      store.dispatch('subtractOneCard', card)
   }
}

function deleteCard(card) {
   for(let i=0 ; i<card.qty; i++) {
      axios.put(`/api/users/cards/sub/${card.id}`)
   }
   store.dispatch('deleteCard', card)
}

function getOtherUserCards(id) {
   return axios.get(`api/cards/u/${id}`)

}

function makeArrayFromObject(object) {
   return Object.keys(object).map((key) => {
      return object[key]
   })
}
