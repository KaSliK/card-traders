<template>
    <nav>
        <v-app-bar app flat clipped color="#f6ecd8">
            <v-app-bar-nav-icon v-if="loggedIn" class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <router-link
                      to="/"
                      tag="span"
                      style="cursor: pointer"
                >
                    CardTraders
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn fab small router :to="'/'" v-if="!loggedIn" text color="grey">
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn router :to="'/logout'" v-if="loggedIn" text color="grey">
                <span class="d-none d-sm-flex">Wyloguj</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
            <v-btn router :to="'/login'" v-if="!loggedIn" text color="grey">
                <span class="d-none d-sm-flex">Logowanie</span>
                <v-icon right>mdi-login</v-icon>
            </v-btn>
            <v-btn router :to="'/register'" v-if="!loggedIn" text color="grey">
                <span class="d-none d-sm-flex">Rejestracja</span>
                <v-icon right>mdi-account-plus-outline</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer temporary v-if="loggedIn" color="#f5f5dc" app v-model="drawer" >
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon >{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

    </nav>

</template>

<script>
    import { mapGetters } from 'vuex'
    export default {


        name: "Navbar",
        computed: {
            ...mapGetters([
                'isLogged',
            ]),
            loggedIn() {
                return this.$store.getters.loggedIn
            }
        },
        data() {
            return {
                drawer: false,
                links: [
                    {icon: 'mdi-cards-outline', text: 'Strona główna', route: '/'},
                    {icon: 'mdi-account', text: 'Mój profil', route: '/profil'},
                    {icon: 'mdi-cards', text: 'Wszystkie karty', route: '/wszystkie_karty'},
                    {icon: 'mdi-cards', text: 'Moje karty', route: '/moje_karty'},
                    {icon: 'mdi-cards', text: 'Wystawione na wymianę', route: '/karty_wystawione_na_wymiane'},
                    {icon: 'mdi-information-variant', text: 'O nas', route: '/about'},

                ],
            }
        },
        methods: {
            logout () {
                this.$store.dispatch('logout')
            }
        }
    }

</script>

<style scoped>

</style>
