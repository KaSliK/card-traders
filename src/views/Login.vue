<template>
    <v-container fluid fill-height>
        <v-snackbar v-model="successSnackbar" :timeout="4000" top color="success">
            <span>Rejestracja przebiegła pomyślnie, teraz możesz się zalogować</span>
            <v-btn text color="white" @click="successSnackbar = false">Close</v-btn>
        </v-snackbar>

        <v-container>
            <v-row justify="center">
                <h1>Login</h1>
            </v-row>
            <v-row justify="center">
                <v-alert v-if="serverError" type="error" class="mt-4 justify-center" style="width: 300px;">
                    {{serverError}}
                </v-alert>
            </v-row>
            <v-row justify="center" >
                <v-alert v-if="successMessage" class="mt-4" type="success" style="width: 300px;">
                    <div>{{successMessage}}</div>
                </v-alert>
            </v-row>

            <v-row justify="center">
                <v-form action="#" v-model="valid" style="width: 300px;">
                    <v-container>
                        <v-row >
                            <v-text-field
                                    prepend-icon="mdi-account-circle"
                                    type="email" @keyup.enter="login" label="Email"
                                    v-model="email" :rules="emailRules"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                                    prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="showPassword = !showPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    label="Hasło" @keyup.enter="login"
                                    v-model="password" required></v-text-field>
                        </v-row>
                        <v-row>
                            <v-btn id="login" class="mt-4" block v-on:click.prevent.stop="login" :loading="loading" >Zaloguj</v-btn>
                        </v-row>
                    </v-container>

                </v-form>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',
        props: {
            dataSuccessMessage: {
                type: String,
            }
        },
        data () {
            return {
                showPassword: false,
                loading: false,
                valid: false,
                email: '',
                password: '',
                serverError: '',
                successSnackbar: this.dataSuccessMessage || false,
                successMessage: this.dataSuccessMessage,
                emailRules: [
                    v => !!v || 'Musisz podać E-mail',
                    v => /.+@.+/.test(v) || 'E-mail musi być poprawny',
                ],
            }
        },



        methods: {
            login () {
                if(this.valid) {
                    this.loading=true;
                    this.$store
                        .dispatch('retrieveToken', {
                            email: this.email,
                            password: this.password
                        })
                        .then(() => {
                            this.$router.push({ name: 'Profile' })
                        })
                        .catch(error => {
                            this.serverError= error.response.data.error
                            this.password = ''
                            this.successMessage = ''
                        })
                        .finally(() => {
                            this.loading = false;
                        })
                }


            },

        }
    }
</script>
