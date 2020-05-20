<template>
    <v-container fluid fill-height>
        <v-container>


            <v-row justify="center">
                <h1>Register</h1>
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
                    <v-text-field type="string" label="Imię" v-model="name" :rules="nameRules" required ></v-text-field>
                        </v-row>
                        <v-row>
                    <v-text-field type="email" label="Email" v-model="email" :rules="emailRules" required ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field type="password" label="Hasło" v-model="password"></v-text-field>
                        </v-row>
                        <v-row>
                    <v-text-field type="password" label="Powtórz hasło" v-model="c_password" :rules="inputRules"></v-text-field>
                        </v-row>
                        <v-row>
                    <v-btn class="mt-4" block type="submit" @click.prevent="register">Rejestruj</v-btn>
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
                name: '',
                password: '',
                c_password: '',
                serverErrors: '',
                nameRules: [
                    v => !!v || 'Imię jest wymagane',
                ],
                emailRules: [
                    v => !!v || 'Musisz podać E-mail',
                    v => /.+@.+/.test(v) || 'E-mail musi być poprawny',
                ],
            }
        },
        methods: {
            register () {
                if(this.valid) {
                    this.$store
                        .dispatch('register', {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            c_password: this.c_password
                        })
                        .then(() => {
                            this.$router.push({ name: 'Login' })
                        })
                        .catch(error => {
                            this.serverErrors = Object.values(error.response.data.error)
                        })
                }

            },
        }
    }

</script>
