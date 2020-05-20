<template>
    <v-container>
        <h1>Profil</h1>
        <p>Witaj {{userInfo.name}}</p>
    </v-container>


</template>



<script>
    export default {
        name: "Profile",
        data() {
            return {
                userInfo: [],
            }
        },
        created() {
            this.$store.dispatch('retrieveInfo')
                .then(response => {
                    this.userInfo = response.data.success
                    console.log(this.userInfo)
                })
        }
    }
</script>

<style scoped>

</style>
