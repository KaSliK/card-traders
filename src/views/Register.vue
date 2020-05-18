<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>


            <div>
                <h1>Login</h1>
                <v-form @submit.prevent="register">
                    <v-text-field type="string" label="name" v-model="name" required></v-text-field>
                    <v-text-field type="email" label="email" v-model="email" required></v-text-field>
                    <v-text-field type="password" label="password" v-model="password" required></v-text-field>
                    <v-text-field  label="c_password" v-model="c_password" required></v-text-field>
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
                c_password: ''
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
                        this.$router.push({ name: 'About' })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        }
    }

</script>
