<template>
   <v-container>

   <v-flex class="pb-6 xs12 d-flex justify-center">
      <v-flex class="xs12 md4">
         <v-card
               class="pa-3 xs12 text-center"
               color="#f2dcae"
               elevation="7"
         >
            <h2>Wystawione na wymianę</h2>
            <h4>Wkrótce</h4>
         </v-card>
      </v-flex>
   </v-flex>

   <v-layout class="row wrap">
      <v-flex class="xs12 sm6 md4 lg3 xl2" v-for="offer in offers" :key="offer.id">
         <v-card elevation="10" class="ma-2">
            <v-container class="fluid py-0 px-2">
               <v-layout class="row">
                  <v-flex class="xs6">
                     <v-img :src="'http://ct.zobacztu.pl/images/'+offer.card_offered.image">
                        <div class="subheading">Wymienia</div>
                     </v-img>
                  </v-flex>
                  <v-flex class="xs6">
                     <v-img :src="'http://ct.zobacztu.pl/images/'+offer.card_wanted.image">
                        <div class="subheading">Poszukuje</div>
                     </v-img>
                  </v-flex>
               </v-layout>
               <v-flex class="xs12 text-center">
                  <h4 >{{offer.user.name}}</h4>
               </v-flex>
               <v-flex class="xs12 text-center">
                  <h4 >{{offer.status}}</h4>
               </v-flex>
            </v-container>
         </v-card>
      </v-flex>
   </v-layout>
   </v-container>
</template>

<script>
   import axios from "axios";
    export default {
        name: "Profile",
       data() {
           return {
              cards: null,
              offers: null,
              users: null,
           }
       },
       created() {
           axios.get('api/offers').then(response => {
              this.offers = response.data.data
           })
          }
    }
</script>

<style scoped>

</style>
