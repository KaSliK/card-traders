<template>
    <nav>
        <v-app-bar app flat clipped color="#f6ecd8">
            <v-app-bar-nav-icon v-if="isLogged" class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span>CardTraders</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn v-if="isLogged" text color="grey">
                <span>Wyloguj</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
            <v-btn router :to="'/login'" v-if="!isLogged" text color="grey">
                <span>Logowanie</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
            <v-btn router :to="'/register'" v-if="!isLogged" text color="grey">
                <span>Rejestracja</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer color="#f5f5dc" app v-model="drawer" >
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
                'isLogged'
            ])
        },
        data() {
            return {
                drawer: false,
                links: [
                    {icon: 'mdi-cards-outline', text: 'Home', route: '/'},
                    {icon: 'mdi-cards', text: 'Home', route: '/'},

                ],
            }
        }
    }

</script>

<style scoped>

</style>
