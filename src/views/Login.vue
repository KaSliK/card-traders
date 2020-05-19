<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>


            <div>
                <h1>Login</h1>
                <v-form >
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
                password: ''
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

            },
        }
    }
</script>
