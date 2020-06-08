<template>
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
</template>

<script>
   export default {
      name: "MoveStartButton",
      data() {
         return {
            fab: false
         }
      },
      methods: {
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

</style>
