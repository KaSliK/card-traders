export function checkQty(cards, myCardsId) {
   cards = cards.map((v) => {
      if(typeof(myCardsId[v.id]) == "object") {
         v.qty = myCardsId[v.id].pivot.qty
      } else {
         v.qty = 0
      }
      return v
   })
}
export function getCardsId(myCards) {
   /* eslint-disable */
   var cardsId = {}
   Object.keys(myCards).map((k,v) =>{
      let index = parseInt(v)
      cardsId[myCards[index].id] = myCards[index]
   })
   return cardsId
}
