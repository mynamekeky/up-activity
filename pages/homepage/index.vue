<template>
    <div class="">
        <v-app-bar color="primary" dark dense>
            <v-toolbar-title text="light">
                UP-Activity
            </v-toolbar-title>
            <div class="ml-auto">
                <v-btn flat :elevation="0" @click="home" color="primary">
                    <v-icon left>home</v-icon>
                    Home
                </v-btn>
                <v-btn flat :elevation="0" @click="register" color="primary">
                    <v-icon left>face</v-icon>
                    Sign Up
                </v-btn>
                <v-btn flat :elevation="0" @click="login" color="primary">
                    <v-icon left>lock_open</v-icon>
                    Sign In
                </v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<script>

export default {
    methods: {
        home() {
            this.$router.push('/')
        },
        register() {
            this.$router.push('/register')
        },
        login() {
            this.$router.push('/login')
        }
    }
};
</script>