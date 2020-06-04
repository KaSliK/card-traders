<template>

   <v-container class="" fill-height>
      <TwiceImage />
      <v-container row class="wrapper my-5  flex-column align-center">
         <v-layout align-center justify-center>
            <v-flex class="xs12 md9" >
               <v-card color="#f5e7cf" shaped class="pa-4 text-center opacity">
                  Czy ty również zaraziłeś się manią na TWICE?<br>
                  Tak jak my zbierasz karty najlepszych piosenkarek na świecie?<br>
                  Chciałbyś poznać ludzi podzielających z Tobą pasję?<br>
                  Rozmawiaj, wymieniaj się kartami, dołącz do nas, aplikacji z największą społecznością TWICE.<br>
                  ZAPRASZAMY
               </v-card>
            </v-flex>
         </v-layout>
      <v-container>
         <v-row justify="center">
            <div class="justify-center">
               <v-btn x-large class="my-2 sm12" color="#fcf8ed">Aplikacja desktopowa</v-btn>
            </div>
         </v-row>
         <v-row justify="center">
            <v-btn x-large class="my-2 sm12" color="#fcf8ed">Aplikacja mobilna</v-btn>
         </v-row>
      </v-container>


      </v-container>
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
    .opacity {
        opacity: 0.86;
    }
</style>
