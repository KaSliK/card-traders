<template>
<h1>You seuccessfully logged out</h1>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            this.$store.dispatch('destroyToken')
                .then(() => {
                this.$router.push({ name: 'Home' })
            }).catch(() => this.$router.push({ name: 'Home' }))
        }

    }
</script>

<style scoped>

</style>
