<template>
    <v-container fluid fill-height>
        <v-container>
            <v-row justify="center">
                <h1>Login</h1>
            </v-row>
            <v-row justify="center" >
                <v-alert v-if="serverError" type="error" class="mt-4" style="width: 300px;">
                    {{serverError}}
                </v-alert>
            </v-row>
            <v-row justify="center">
                <v-form action="#" v-model="valid" style="width: 300px;">
                    <v-container>
                        <v-row >
                            <v-text-field type="email" @keyup.enter="login" label="Email" v-model="email" :rules="emailRules" ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field @keyup.enter="login" type="password" label="Hasło" v-model="password" required></v-text-field>
                        </v-row>
                        <v-row>
                            <v-btn class="mt-4" block v-on:click.prevent.stop="login" >Login</v-btn>
                        </v-row>
                    </v-container>

                </v-form>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                valid: false,
                email: '',
                password: '',
                serverError: '',
                emailRules: [
                    v => !!v || 'Musisz podać E-mail',
                    v => /.+@.+/.test(v) || 'E-mail musi być poprawny',
                ],
            }
        },

        methods: {
            login () {
                if(this.valid) {
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
                }


            },

        }
    }
</script>
