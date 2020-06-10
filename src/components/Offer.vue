<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
<template>
   <v-dialog max-width="500px" v-model="dialog">
      <template v-slot:activator="{ on }">
         <v-btn color="#ccb993" v-on="on">
            <span>Wystaw kartę na wymianę</span>

         </v-btn>
      </template>
      <v-card color="#fff1d1">
         <v-toolbar
            color="#e0bc67"
            class="mb-12"
            elevation="0"
         >
            <v-toolbar-title>Wystaw ofertę</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog=false">
               <v-icon>mdi-close-thick</v-icon>
            </v-btn>
         </v-toolbar>
            <v-flex class="xs12">
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
            <v-flex class="xs12">
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
            <v-flex class="xs12">
               <v-btn
                  block
                  color="#dbc08a"
                  :disabled="exposedCardId == null || expectedCardId== null"
                  @click="makeOffer"
               >Wystaw</v-btn>
            </v-flex>
         <v-layout>
            <v-flex class="xs6">
               <v-subheader>Twoje karty</v-subheader>
               <v-list-item
                     v-for="myCard in myCards"
                     :key="myCard.id"
                     v-if="myCard.qty>0"
                     @click="exposedCardId = myCard.id"
                     :class="[{'brown lighten-4' : exposedCardId === myCard.id}]"
               >
                  <v-list-item-avatar height="90px" width="90px">
                     <v-img :src="myCard.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="hidden-sm-and-down">
                     <v-list-item-title v-text="myCard.category.name"></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
            </v-flex>

            <v-flex class="xs6">
               <v-subheader>Jaką chcesz</v-subheader>
               <v-list-item
                     v-for="card in cards" :key="card.id"
                     @click="expectedCardId = card.id"
                     :class="[{'brown lighten-4' : expectedCardId === card.id}]"
               >
                  <v-list-item-avatar height="90px" width="90px">
                     <v-img :src="card.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="hidden-sm-and-down">
                     <v-list-item-title v-text="card.category.name"></v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
            </v-flex>
         </v-layout>

      </v-card>
      <move-start-button />
   </v-dialog>
</template>

<script>
   import {mapGetters} from 'vuex';

   import CardsService from "../services/CardsService";
   import MoveStartButton from "./MoveStartButton";
   export default {
      name: "Offer",
      components: {MoveStartButton},
      data() {
         return {
            dialog: false,
            loading: false,

            myCards: null,


            cards: null,
            category: null,
            subCategory: null,
            exposedCardId: null,
            expectedCardId: null,
         };
      },
      computed: {
         ...mapGetters([
            'categories',
            'subCategories',
            'userCards'
         ]),

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
               this.myCards = this.$store.getters.userCards

            CardsService.getCards(this.category, this.subCategory)
               .then(response => {
                  this.cards = response.data.data
               })
         },
         makeOffer: function () {
            //todo
         }
      }
   };
</script>

<style scoped>

</style>
