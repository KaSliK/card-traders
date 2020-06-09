<template>
    <v-container fluid fill-height>
        <v-container>


            <v-row justify="center">
                <h1>Register</h1>
            </v-row>
            <v-row justify="center" >
                <v-alert v-if="successMessage" class="mt-4" type="success" style="width: 300px;">
                    <div>{{successMessage}}</div>
                </v-alert>
            </v-row>
            <v-row justify="center" >
                <v-alert class="mt-4" v-if="serverErrors" type="error" style="width: 300px;">
                    <div v-for="(value,key) in serverErrors" :key="key">{{value[0]}}</div>
                </v-alert>
            </v-row>
            <v-row justify="center">
                <v-form v-model="valid" style="width: 300px;">
                    <v-container>
                        <v-row>
                    <v-text-field
                            prepend-icon="mdi-account-circle-outline"
                            type="string" label="Imię" v-model="name"  required ></v-text-field>
                        </v-row>
                        <v-row>
                    <v-text-field
                            prepend-icon="mdi-account-circle"
                            type="email" label="Email" v-model="email" :rules="emailRules" required ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field
                                    prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  @click:append="showPassword = !showPassword"
                                  :type="showPassword ? 'text' : 'password'"
                                  label="Hasło" :rules="passwordRules" v-model="password"></v-text-field>
                        </v-row>
                        <v-row>
                    <v-text-field prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  @click:append="showPassword = !showPassword"
                                  :type="showPassword ? 'text' : 'password'"
                                  label="Powtórz hasło" v-model="c_password" :rules="passwordRules"></v-text-field>
                        </v-row>
                        <v-row>
                    <v-btn id="register" class="mt-4" block type="submit" @click.prevent="register" :loading="loading">Zarejestruj</v-btn>
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
                showPassword: false,
                valid: false,
                loading: false,
                email: '',
                name: '',
                password: '',
                c_password: '',
                serverErrors: '',
                successMessage: '',
                nameRules: [
                    v => !!v || 'Imię jest wymagane',
                ],
                emailRules: [
                    v => !!v || 'Musisz podać E-mail',
                    v => /.+@.+/.test(v) || 'E-mail musi być poprawny',
                ],
                passwordRules: [
                    v => !!v || 'Musisz podać hasło',
                    v => (this.password === v) || 'Hasła muszą się zgadzać'
                ],
            }
        },
        methods: {
            register () {
                if(this.valid) {
                    this.$store.dispatch('register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        c_password: this.c_password
                    })
                    .then(() => {
                        this.successMessage = 'Rejestracja przebiegła pomyślnie'
                        this.$router.push({ name: 'Login', params: { dataSuccessMessage: this.successMessage} })
                    })
                    .catch(error => {
                        this.serverErrors = Object.values(error.response.data.error)
                    }).finally(() => {
                    this.loading = false;
                    })
                }
            },
        }
    }

</script>
