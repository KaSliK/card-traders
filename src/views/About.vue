<template>
  <v-container>
  <v-card
        color="#dbc08a"
  >
    <v-card-title >
       Znajdź karty użytkownika
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
            <v-list-item-title >Nick: {{inputUser.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </v-card>

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
                <v-card-title class="justify-center">
                  {{card.category.name}}
                </v-card-title>
                <v-layout class=" row wrap align-end justify-center">
                  <v-flex class="shrink">
                    <v-card-text>
                      <span class="caption">Ty posiadasz: {{card.qtyOfUser}}</span>
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
  import {checkQtyForOtherUser, /*getCardsId*/} from "../services/checkQtyService";
  export default {
    data() {
      return {
        entries: [],
        isLoading: false,
        inputUser: null,
        search: null,
        cards: null,
        myCards: this.$store.getters.userCards,
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
        this.loading=true
        this.cards = null
        this.getOtherUserCards()
      },
      search () {
        if (this.items.length > 0) return
        if (this.isLoading) return
        this.isLoading = true
        axios.get('api/users/list')
              .then(response =>{
                console.log(response.data.data)
                this.entries = response.data.data
              }).finally(() => (this.isLoading = false))
      },
    },
    methods: {
      getOtherUserCards: function () {
        axios.get(`api/cards/u/${this.inputUser.id}`)
              .then(response => {
                this.cards=response.data.data.cards
                this.cards = Object.keys(this.cards).map((key) => {
                  return this.cards[key]
                })
                checkQtyForOtherUser(this.cards, this.myCards)
                this.isLoading=false
              })

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
