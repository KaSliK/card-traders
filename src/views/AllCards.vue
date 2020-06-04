<template>

   <v-container>
      <v-layout class="justify-space-around">
         <v-flex class="xs12 sm5 ma-3">
            <v-select
                  :items="this.categories"
                  item-text="name"
                  item-value="id"
                  label="Select category"
                  solo
                  v-model="category"
            ></v-select>
         </v-flex>
         <v-flex class="xs12 sm5 ma-3">
            <v-select
                  :items="this.subCategories"
                  item-text="name"
                  item-value="id"
                  label="Select Subcategory"
                  solo
                  v-model="subCategory"
            ></v-select>
         </v-flex>
      </v-layout>
      <v-layout class="row wrap">
         <v-flex class="xs12 md4 lg2" v-for="card in cards" :key="card.id">
            <v-card class="ma-1">
               <v-container class="fluid mx-3">
                  <v-layout class="row">
                     <v-flex>
                        <v-img :src="card.image">
                        </v-img>
                     </v-flex>
                     <v-flex>
                        <v-card-title>
                           <v-card-actions>
                              <v-btn>
                              </v-btn>
                           </v-card-actions>
                        </v-card-title>
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
              subCategories: null,
              cards: null,
           }
       },
       mounted() {
        this.categories = this.$store.getters.categories
        this.subCategories = this.$store.getters.subCategories

       },
       watch: {
           category: function () {
              this.getCards()
           }
       },
       methods: {
           getCards: function () {
              axios.get(`/api/cards/c/${this.category}`).then(response => {
                 this.cards = response.data.data
                 console.log(response.data.data)
              })
           }

       }
    }
</script>

<style scoped>

</style>
