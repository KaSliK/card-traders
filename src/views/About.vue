<template>
  <v-container>
    <v-flex class="pb-6 xs12 d-flex justify-center">
      <v-flex class="xs12 md4">
        <v-card
              class="pa-3 xs12 text-center"
              color="#f2dcae"
              elevation="7"
        >
          <h2>Informacje o nas zostaną dodane wkrótce</h2>
          <div>Na chwilę obecną cieszcie się możliwością kolekcjonowania kart</div>
        </v-card>
      </v-flex>
    </v-flex>





      <v-footer
        fixed
        padless
        class="transparent"
      >
        <v-card
          flat
          tile
          width="100%"
          class="text-center transparent"
        >
          <v-card-text>
            <v-tooltip top
                       v-for="social in socials"
                       :key="social.icon">
              <template v-slot:activator="{ on }">
                <v-btn
                    class="mx-4 "
                    icon
                    :href="social.link" target="_blank"
                    :color="social.color"
                    v-on="on"
                  >
                <v-icon size="36px"> {{ social.icon }}</v-icon>
              </v-btn>
              </template>
              <span>{{social.text}}</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-footer>
</v-container>



</template>


<script>
  export default {
    data: () => ({
      testingCode: "1234",
      socials: [
        {icon: 'mdi-facebook', link: 'https://www.facebook.com/groups/231790743860864/', color: 'indigo', text: "Grupa na Facebooku"},
        {icon: 'mdi-email', link: '', color:'pink lighten-3', text: "wrazliiwy@gmail.com"}
      ],

    }),

}
</script>

<style scoped>


</style>
