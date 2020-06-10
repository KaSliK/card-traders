<template>
  <v-app style="background: #f6ecd8">
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    components: { Navbar },
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      },
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
