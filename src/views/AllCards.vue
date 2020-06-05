<template>

   <v-container>
      <v-layout class="justify-space-around">
         <v-flex class="xs12 sm5 ma-3">
            <v-select

                  :items="this.categories"
                  item-text="name"
                  item-value="id"
                  label="Piosenkarka"
                  solo
                  v-model="category"
                  background-color="#dbc08a"
            ></v-select>
         </v-flex>
         <v-flex class="xs12 sm5 ma-3">
            <v-select
                  :items="this.subCategories"
                  item-text="name"
                  item-value="id"
                  label="Album"
                  solo
                  v-model="subCategory"
                  background-color="#dbc08a"
            ></v-select>
         </v-flex>
      </v-layout>
      <v-layout class="row wrap">
         <v-flex class="xs12 sm4 md4 lg2" v-for="card in cards" :key="card.id">
            <v-card elevation="10" :class="[{'notHaving': card.qty==0}, 'ma-2']">
               <v-container class="fluid py-0 px-2">
                  <v-layout class="row">
                     <v-flex class="xs6">
                        <v-img
                           :src="card.image"
                        >
                        </v-img>
                     </v-flex>
                     <v-flex class="xs6 fill-height">
                           <v-card-title class="justify-center">
                              <h4>{{card.category.name}}</h4>
                              <h6>{{card.subcateogry.name}}</h6>
                           </v-card-title>
                           <v-card-actions class="justify-center">
                              <v-btn icon @click="addOneCard(card)" >
                                 <v-icon>mdi-plus</v-icon>
                              </v-btn>
                              <v-btn icon @click="subtractOneCard(card)">{{card.id}}
                                 <v-icon>mdi-minus</v-icon>
                              </v-btn>
                           </v-card-actions>
                           <v-card-text >
                              <span class="caption">Posiadana ilość: {{card.qty}}</span>
                           </v-card-text>
                     </v-flex>
                  </v-layout>
               </v-container>
            </v-card>
         </v-flex>
      </v-layout>
      <v-btn v-model="refreshData" v-if="refreshData==='refresh'"></v-btn>
      <v-btn
            x-small
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            color="#dbc08a"
            @click="toTop"
      >
         <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
   </v-container>
</template>

<script>
   import axios from 'axios'
    export default {
        name: "AllCards",
       data() {
           return {
              category: null,
              subCategory: null,
              categories: null,
              subCategories: [],
              cards: null,
              myCards: this.$store.getters.userCards,
              myCardsId: null,
              refreshData: 0,
              fab: false
           }
       },
       mounted() {
         this.categories = this.$store.getters.categories
         this.subCategories = this.$store.getters.subCategories
         this.subCategories.unshift({name: 'Wszystkie'})
         this.myCardsId = this.getCardsId()


       },
       computed: {

       },
       watch: {
           category: function () {
              this.getCards()
           },
           subCategory: function () {
              this.getCards()
           }
       },
       methods: {
           getCards: function () {
              if(!this.subCategory || this.subCategory === 'Wszystkie') {
                 axios.get(`/api/cards/c/${this.category}`).then(response => {
                    this.cards = response.data.data
                    this.checkQty()
              })
              } else {
               axios.get(`/api/cards/${this.category}/${this.subCategory}`).then(response => {
                  this.cards = response.data.data
                  this.checkQty()
                  })
               }

           },
          checkQty: function () {
              console.log(this.myCards)
             console.log(this.$store.getters.user)
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
             /* eslint-disable */
             var cardsId = {}
             Object.keys(this.myCards).map((k,v) =>{
                let index = parseInt(v)
                cardsId[this.myCards[index].id] = this.myCards[index]
             })
             return cardsId
          },
          addOneCard: function (card) {
             this.refreshData = (this.refreshData==0) ? 1 : 0;
             card.qty+=1
             console.log(this.refreshData)

          },
          subtractOneCard: function (card) {
             this.refreshData = (this.refreshData==0) ? 1 : 0;
             if(card.qty>0) card.qty-=1
             console.log(this.refreshData)
          },
          onScroll (e) {
             if (typeof window === 'undefined') return
             const top = window.pageYOffset ||   e.target.scrollTop || 0
             this.fab = top > 40
          },
          toTop () {
             this.$vuetify.goTo(0)
          }
       }
    }
</script>

<style scoped>

   .notHaving {
      opacity: 1;
      filter: grayscale(40%);
      filter: brightness(87%);
   }

</style>
