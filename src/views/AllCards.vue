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
            ></v-select>
         </v-flex>
      </v-layout>
      <v-layout class="row wrap">
         <v-flex class="xs12 sm4 md4 lg2" v-for="card in cards" :key="card.id">
            <v-card class="ma-1">
               <v-container class="fluid">
                  <v-layout class="row">
                     <v-flex class="xs6">
                        <v-img :src="card.image">
                        </v-img>
                     </v-flex>
                     <v-flex class="xs6">
                           <v-card-title>
                              <h2>{{card.category.name}}</h2>
                              <h6>{{card.subcateogry.name}}</h6>
                           </v-card-title>
                           <v-card-actions class="justify-center">
                              <v-btn >Posiadam</v-btn>
                           </v-card-actions>
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
    export default {
        name: "AllCards",
       data() {
           return {
              category: null,
              subCategory: null,
              categories: null,
              subCategories: [],
              cards: null,
           }
       },
       mounted() {
        this.categories = this.$store.getters.categories,
        this.subCategories = this.$store.getters.subCategories,
        this.subCategories.push({name: 'Wszystkie'})

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
              })
              } else {
                 console.log(this.subCategory)
               axios.get(`/api/cards/${this.category}/${this.subCategory}`).then(response => {
                   this.cards = response.data.data

                  })
               }
           }
       }
    }
</script>

<style scoped>

</style>
