<template>
   <v-container>
      <h1 class="xs12 text-center">Karty użytkowników</h1>
      <h3 class="xs12 text-center">Podaj uzytkownika</h3>
      <v-row>
         <v-col cols="12" md="12">
            <v-text-field
                  class="xs3"
                  label="Id użytkownika"
                  placeholder="Podaj id użytkownika"
                  outlined
                  v-model="id"
            ></v-text-field>
         </v-col>
      </v-row>
      <v-row>
         <v-col cols="12" sm="4" lg="2" v-for="card in cards" :key="card.id">
            <v-card >
               <v-container class="fluid">
                  <v-layout class="wrap row">
                     <v-flex class="xs6">
                        <v-img :src="card.image">
                        </v-img>
                     </v-flex>
                     <v-flex class="xs6">
                        <v-card-title>
                           {{card.category.name}}
                        </v-card-title>
                        <v-card-text>
                           <span class="caption">Ty posiadasz: {{card.qty}}</span>
                        </v-card-text>
                     </v-flex>
                  </v-layout>
               </v-container>
            </v-card>
         </v-col>
      </v-row>

   </v-container>


</template>

<script>
   import axios from 'axios'
   import {checkQty, getCardsId} from "../services/checkQtyService";

   export default {
        name: "someoneCards",
       data() {
           return {
              cards: null,
              id: null,
              myCards: this.$store.getters.userCards,
              myCardsId: null,
           }
       },
       mounted() {
          this.myCardsId = getCardsId(this.myCards)
          console.log(this.myCardsId)
       },
       watch: {
           id: function () {
              this.getOtherUserCards()
           }
       },
       methods: {
           getOtherUserCards: function () {
              axios.get(`api/cards/u/${this.id}`).then(response => {
                 this.cards= response.data.data
                 checkQty(this.cards, this.myCardsId)
              })
           },
          /*checkQty: function () {
             this.myCards = this.$store.getters.userCards
             this.cards = this.cards.map((v) => {
                if(typeof(this.myCardsId[v.id]) == "object") {
                   v.qty = this.myCardsId[v.id].pivot.qty
                } else {
                   v.qty = 0
                }
                return v
             })
          },
          getCardsId: function () {
             /!* eslint-disable *!/
             var cardsId = {}
             Object.keys(this.myCards).map((k,v) =>{
                let index = parseInt(v)
                cardsId[this.myCards[index].id] = this.myCards[index]
             })
             return cardsId
          },*/
       },

    }
</script>

<style scoped>

</style>
