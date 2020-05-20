<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>


            <div>
                <h1>Login</h1>
                <v-alert v-if="serverError" type="error">
                    {{serverError}}
                </v-alert>
                <v-form action="#" @submit.prevent="login">
                    <v-text-field type="email" label="email" v-model="email" required></v-text-field>
                    <v-text-field type="password" label="password" v-model="password" required></v-text-field>
                    <v-btn v-on:click.prevent.stop="login" >Login</v-btn>
                </v-form>
            </div>



        </v-layout>

    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: '',
                serverError: ''
            }
        },

        methods: {
            login () {
                this.$store
                    .dispatch('retrieveToken', {
                        email: this.email,
                        password: this.password
                    })
                    .then((response)=> {
                        this.$router.push({ name: 'Home' })
                        console.log(response)
                    })
                    .catch(error => {
                    this.serverError= error.response.data.error
                        this.password = ''
                })

            },
        }
    }
</script>
