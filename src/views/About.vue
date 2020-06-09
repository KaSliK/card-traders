<template>
  <v-container>
  <h1>Informacje o nas zostaną dodane wkrótce</h1>
    <div>Na chwilę obecną cieszcie się możliwością kolekcjonowania kart</div>

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
