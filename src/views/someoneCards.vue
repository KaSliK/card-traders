<template>
   <v-container>
      <v-card
            color="#dbc08a"
      >
         <v-card-title class="px-0">
            <v-flex class="xs12 text-center">
               Znajdź karty użytkownika
            </v-flex>
         </v-card-title>
         <v-card-text>
            Wpisz jego ID bądź nazwę
         </v-card-text>
         <v-card-text>
            <v-autocomplete
                  v-model="inputUser"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="white"
                  hide-selected
                  hide-no-data
                  item-text="idname"
                  item-value="id"
                  label="Użytkownicy"
                  placeholder="Wpisz by wyszukać"
                  prepend-icon="mdi-database-search"
                  return-object
            ></v-autocomplete>
         </v-card-text>
         <v-divider></v-divider>
         <v-expand-transition>
            <v-list v-if="inputUser" color="#dbc08a">
               <v-list-item
               >
                  <v-list-item-content>
                     <v-list-item-subtitle>ID:{{inputUser.id}}</v-list-item-subtitle>
                     <v-list-item-title >Nazwa: {{inputUser.name}}</v-list-item-title>
                  </v-list-item-content>
               </v-list-item>
            </v-list>
         </v-expand-transition>
      </v-card>
      <v-row v-if="cardLoading" >
         <v-col cols="12" sm="4" lg="2" v-for="n in 3" :key="n">
            <v-skeleton-loader
                  type="card"
            ></v-skeleton-loader>
         </v-col>
      </v-row>

      <v-row v-if="cards != null && cards.length === 0 && inputUser">
         <v-col cols="12" sm="6" md="4" class="offset-md-4 offset-sm-3">
            <v-banner color="#dbc08a">
               <v-avatar
                     slot="icon"
                     color="#dbc08a"
                     size="40"
               >
                  <v-icon color="white" large>
                     mdi-exclamation-thick
                  </v-icon>
               </v-avatar>
               Ten użytkownik nie dodał żadnych kart do swojej kolekcji
            </v-banner>
         </v-col>
      </v-row>

      <v-layout class="row wrap">
         <v-flex class="xs12 sm6 md4 lg3 xl2" v-for="card in cards" :key="card.id">
            <v-card elevation="10" :class="[{'notHaving': card.qtyOfUser==0}, 'ma-2']">
               <v-container class="fluid py-0 px-2">
                  <v-layout class="row">
                     <v-flex class="xs6">
                        <v-img :src="card.image">
                        </v-img>
                     </v-flex>
                     <v-flex class="xs6">
                        <v-layout fill-height class="column ">
                           <v-layout row>
                              <v-flex class="xs12 text-center"><h4 >{{card.category.name}}</h4></v-flex>

                              <v-flex class="xs12 text-center"><h6>{{card.subcategory.name}}</h6></v-flex>
                           </v-layout>
                           <v-layout class=" row wrap align-end justify-center">
                              <v-flex class="shrink">
                                 <v-card-text class="text-center">
                                    <span class="caption">Ty posiadasz: {{card.qtyOfUser}}</span>
                                    <span class="caption"> Posiada: {{card.qty}}</span>
                                 </v-card-text>
                              </v-flex>
                           </v-layout>
                        </v-layout>
                     </v-flex>
                  </v-layout>
               </v-container>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>


<script>
   import axios from 'axios'
   import CardsService from "../services/CardsService";
   import {checkQtyForOtherUser} from "../services/checkQtyService";
   export default {
      data() {
         return {
            entries: [],
            isLoading: false,
            inputUser: null,
            search: null,
            cards: null,
            myCards: this.$store.getters.userCards,
            cardLoading: false,
         }
      },
      computed: {
         items () {
            return Object.keys(this.entries).map((key) => {
               this.entries[key].idname =this.entries[key].id +"  "+ this.entries[key].name
               return this.entries[key]
            })
         },
      },
      watch: {
         inputUser() {
            this.cards = null
            this.cardLoading=true
            CardsService.getOtherUserCards(this.inputUser.id)
               .then(response => {
                  this.cards = CardsService.makeArrayFromObject(response.data.data.cards)
                  checkQtyForOtherUser(this.cards, this.myCards)
                  this.cardLoading=false
               })
         },
         search () {
            if (this.items.length > 0) return
            if (this.isLoading) return
            this.isLoading = true
            axios.get('api/users/list')
               .then(response =>{
                  this.entries = response.data.data
               }).finally(() => (this.isLoading = false))
         },
      },
   }
</script>

<style scoped>
   .notHaving {
      opacity: 1;
      filter: grayscale(40%);
      filter: brightness(87%);
   }

</style>
