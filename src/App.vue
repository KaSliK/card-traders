<template>
  <v-app style="background-color: lightgray">
    <v-content class="mx-4 mb-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/about" v-if="isLogged">About</router-link>
      <router-link to="/login" v-else>Login</router-link>
      <v-btn type="button" @click="logout()" v-if="isLogged">
        Logout
      </v-btn>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'isLogged'
      ])
    },

    methods: {
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
