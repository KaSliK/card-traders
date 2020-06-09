export default {
   loggedIn (state) {
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



