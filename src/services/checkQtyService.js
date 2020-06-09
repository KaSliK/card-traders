export function checkQty(cards, myCardsId) {
   cards = cards.map((v) => {
      if(typeof(myCardsId[v.id]) == "object") {
         v.qty = myCardsId[v.id].qty
      } else {
         v.qty = 0
      }
      return v
   })
}
export function checkQtyForOtherUser(cards, myCardsId) {
   cards.map((v) => {
      if(typeof(myCardsId[v.id]) == "object") {
         v.qtyOfUser = myCardsId[v.id].qty
      } else {
         v.qtyOfUser = 0
      }
      return v
   })
}
