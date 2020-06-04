<template>
    <v-container>
        <h1>Profil</h1>
        <p>Witaj {{userInfo.name}}</p>
        <v-layout class="text-center">
            <v-flex class="xs12">
                <h1>Twoje karty</h1>
            </v-flex>
        </v-layout>
        <v-layout class="row wrap">
            <v-flex class="xs12 sm4 md4 lg2" v-for="card in userInfo.cards" :key="card.id">
                <v-card class="ma-1">
                    <v-container class="fluid">
                        <v-layout class="wrap row">
                            <v-flex class="xs6">
                                <v-img :src="card.image">
                                </v-img>
                            </v-flex>
                            <v-flex class="xs6">
                                <v-card-title>
                                   {{card.name}}
                                </v-card-title>
                                <v-card-text>
                                    Ilość: {{card.pivot.qty}}
                                </v-card-text>
                                <v-card-actions>
                                    <v-layout class="row justify-center pa-0 ma-0">
                                        <v-btn block class="ma-1">Sprzedałem</v-btn>
                                        <v-btn block class="ma-1">Dostałem</v-btn>
                                        <v-btn block class="ma-1">Wystaw</v-btn>
                                    </v-layout>

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
    export default {
        name: "Profile",
        data() {
            return {
                userInfo: [],
            }
        },
        created() {
            this.$store.dispatch('retrieveInfo')
                .then(response => {
                    this.userInfo = response.data.data
                    console.log(this.userInfo.cards)
                })
        }
    }
</script>

<style scoped>

</style>
