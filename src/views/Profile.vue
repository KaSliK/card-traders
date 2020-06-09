<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
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
            <v-flex class="xs12 sm6 md4 lg3 xl2" v-for="card in userInfo.cards" :key="card.id" v-if="card.qty>0">
                <v-card class="ma-2">
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
                                    <v-card-actions>
                                            <v-layout class="row">
                                                <v-flex class="xs12 text-center">
                                                    <v-btn icon @click="addOneCard(card);refresh()" >
                                                        <v-icon>mdi-plus</v-icon>
                                                    </v-btn>
                                                    <v-btn icon @click="subtractOneCard(card);refresh()">
                                                        <v-icon>mdi-minus</v-icon>
                                                    </v-btn>
                                                    <v-btn icon @click="deleteCard(card);refresh()">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex class="xs12 text-center">
                                                    <v-btn>Wystaw</v-btn>
                                                </v-flex>
                                            </v-layout>
                                    </v-card-actions>
                                    <v-layout class=" row wrap align-end justify-center">
                                        <v-flex class="shrink">
                                            <v-card-text>
                                                Ilość: {{card.qty}}
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
        <v-btn v-model="refreshData" v-if="refreshData==='refresh'"></v-btn>
        <move-start-button></move-start-button>
    </v-container>


</template>



<script>
    import MoveStartButton from "../components/MoveStartButton";
    import CardsService from "../services/CardsService";
    export default {
        name: "Profile",
        components: {MoveStartButton},
        data() {
            return {
                userInfo: [],
                refreshData: 0,
            }
        },
        created() {
            this.$store.dispatch('retrieveInfo')
                .then(response => {
                    this.userInfo = response.data.data
                })
        },
        methods: {
            addOneCard: function (card) {
                CardsService.addCard(card)
            },
            subtractOneCard: function (card) {
                CardsService.subtractCard(card)
            },
            deleteCard: function(card) {
                CardsService.deleteCard(card)
            },
            refresh: function() {
                this.refreshData = (this.refreshData==0) ? 1 : 0;
            }
        }
    }
</script>

<style scoped>

</style>
