<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>

            <div>
                <h1>Register</h1>
                <v-form @submit.prevent="register">
                    <v-alert v-if="serverErrors" type="error">
                        <div v-for="(value,key) in serverErrors" :key="key" >
            {{value[0]}}</div>

                    </v-alert>
                    <v-text-field type="string" label="name" v-model="name" required></v-text-field>
                    <v-text-field type="email" label="email" v-model="email" required></v-text-field>
                    <v-text-field type="password" label="password" v-model="password" required></v-text-field>
                    <v-text-field type="password" label="repeat password" v-model="c_password" required></v-text-field>
                    <v-btn type="submit">register</v-btn>
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
                name: '',
                password: '',
                c_password: '',
                serverErrors: ''
            }
        },
        methods: {
            register () {
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
            },
        }
    }

</script>
