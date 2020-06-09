<template>
   <v-container>
      <v-layout class="justify-space-around">
         <v-flex class="xs12 sm5 ma-3">
            <v-select
                  :items="categories"
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
                  clearable
                  :items="subCategories"
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
         <v-flex class="xs12 sm6 md4 lg3 xl2" v-for="card in cards" :key="card.id">
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
                              <v-layout row>
                              <v-flex class="xs12 text-center"><h4 >{{card.category.name}}</h4></v-flex>

                              <v-flex class="xs12 text-center"><h6>{{card.subcategory.name}}</h6></v-flex>
                              </v-layout>
                           </v-card-title>
                           <v-card-actions class="justify-center">
                              <v-btn icon @click="addOneCard(card);refresh()" >
                                 <v-icon>mdi-plus</v-icon>
                              </v-btn>
                              <v-btn icon @click="subtractOneCard(card);refresh()">{{card.id}}
                                 <v-icon>mdi-minus</v-icon>
                              </v-btn>
                           </v-card-actions>
                           <v-card-text class="text-center">
                              <span class="caption ">Posiadana ilość: {{card.qty}}</span>
                           </v-card-text>
                     </v-flex>
                  </v-layout>
               </v-container>
            </v-card>
         </v-flex>
      </v-layout>
      <v-btn v-model="refreshData" v-if="refreshData==='refresh'"></v-btn>
      <move-start-button/>
   </v-container>
</template>

<script>
   import {mapGetters} from 'vuex'
   import {checkQty, /*getCardsId*/} from "../services/checkQtyService";
   import MoveStartButton from "../components/MoveStartButton";
   import CardsService from "../services/CardsService";

   export default {
      name: "AllCards",
       components: {MoveStartButton},
       data() {
           return {
              category: null,
              subCategory: null,
              cards: null,
              myCardsId: null,
              refreshData: 0,
           }
       },
       mounted() {
         this.myCardsId = (this.userCards)
       },
       computed: {
          ...mapGetters([
             'categories',
             'subCategories',
             'userCards'
          ])
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
              CardsService.getCards(this.category, this.subCategory)
                 .then(response => {
                    this.cards = response.data.data
                    checkQty(this.cards, this.myCardsId)
              })
           },
          addOneCard: function (card) {
             CardsService.addCard(card)
          },
          subtractOneCard: function (card) {
             CardsService.subtractCard(card)
          },
          refresh: function() {
             this.refreshData = (this.refreshData==0) ? 1 : 0;
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
