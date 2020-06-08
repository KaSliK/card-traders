<template>
   <v-container>
      <h1 class="xs12 text-center">Karty użytkowników</h1>
      <v-row>
         <v-col cols="12" sm="6" md="4" class=" offset-md-4 offset-sm-3">
            <v-text-field
                  clearable
                  ref="form"
                  label="Id użytkownika"
                  placeholder="Podaj liczbę"
                  outlined
                  v-model="id"
                  :rules="isNumberRule"
            ></v-text-field>
         </v-col>
      </v-row>
      <v-row v-if="loading" >
         <v-col cols="12" sm="4" lg="2" v-for="n in 3" :key="n">
            <v-skeleton-loader
                  type="card"
            ></v-skeleton-loader>
         </v-col>
      </v-row>

      <v-row v-if="cards != null && cards.length === 0 && id != 0 && id != ''">
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
               Ten użytkownik nie ma żadnych kart lub podałeś zły identyfikator.
               Wpisz ponownie numer identyfikacyjny
            </v-banner>
         </v-col>
      </v-row>

      <v-layout class="row wrap">
         <v-flex class="xs12 sm6 md4 lg3 xl2" v-for="card in cards" :key="card.id">
            <v-card elevation="10" class="ma-2">
               <v-container class="fluid py-0 px-2">
                  <v-layout class="row">
                     <v-flex class="xs6">
                        <v-img :src="card.image">
                        </v-img>
                     </v-flex>
                     <v-flex class="xs6">
                        <v-layout fill-height class="column ">
                           <v-card-title class="justify-center">
                              {{card.category.name}}
                           </v-card-title>
                           <v-layout class=" row wrap align-end justify-center">
                              <v-flex class="shrink">
                                 <v-card-text>
                                    <span class="caption">Ty posiadasz: {{card.qty}}</span>
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
   import {checkQty, getCardsId} from "../services/checkQtyService";

   export default {
        name: "someoneCards",
       data() {
           return {
              loading: false,
              cards: null,
              id: null,
              myCards: this.$store.getters.userCards,
              myCardsId: null,
              isNumberRule: [
                 v => v==null ||  v == '' || !isNaN(parseFloat(v)) || 'Id to liczba ',
                 v => (v > 0 || v == '') || 'Id jest liczbą dodatnią',
              ],

           }
       },
       mounted() {
          this.myCardsId = getCardsId(this.myCards)

       },
       watch: {
           id: function () {
              if(this.validateField() === true && this.id != '') {
                 this.loading=true
                 this.cards = null

                 this.getOtherUserCards()

              }
           }
       },
       methods: {
           getOtherUserCards: function () {
              axios.get(`api/cards/u/${this.id}`).then(response => {
                 checkQty(this.cards= response.data.data, this.myCardsId)
                 this.loading=false
              })

           },
          validateField () {
             return this.$refs.form.validate()
          },
       },

    }
</script>

<style scoped>

</style>
