import axios from "axios";


export default {
   getCards
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

