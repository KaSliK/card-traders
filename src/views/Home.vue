<template>

  <v-container class="" fill-height>
    <TwiceImage />
    <v-layout row class="wrapper my-5  flex-column align-center">
      <v-layout align-center justify-center>
        <v-flex class="xs6 md9" >
          <v-card color="#f5e7cf" shaped class="pa-4 text-center">
              Czy ty również zaraziłeś się manią na TWICE?<br>
              Tak jak my zbierasz karty najlepszych piosenkarek na świecie?<br>
            Chciałbyś poznać ludzi podzielających z Tobą pasję?<br>
            Rozmawiaj, wymieniaj się kartami, dołącz do nas, aplikacji z największą społecznością TWICE.<br>
            ZAPRASZAMY
            </v-card>
        </v-flex>
    </v-layout>



        <v-flex>
          <v-btn x-large class="ma-5" color="#fcf8ed">Aplikacja desktopowa</v-btn>
          <v-btn x-large class="ma-5" color="#fcf8ed">Aplikacja mobilna</v-btn>
        </v-flex>



    </v-layout>






  </v-container>






</template>

<script>
  import TwiceImage from "../components/TwiceImage.vue";
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    TwiceImage,

  }
}
</script>

<style lang="scss" scoped>
  .wrapper
  {
    z-index: 1;
  }
</style>
