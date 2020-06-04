<template>
    <div class="twiceImage">
    </div>

</template>

<script>
    export default {
        name: "TwiceImage",
    }
</script>

<style lang="scss" scoped>
    .twiceImage{
        position:fixed;
        width: 100%;
        height: 100vh;

        top:0;
        left:0;
        background-image: url('../assets/mainLogo.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 60% 0;
        justify-content:center;
    }

</style>
