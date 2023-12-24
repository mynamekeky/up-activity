<template>
    <div>
        <v-app-bar color="primary" dark dense>
            <v-toolbar-title text="light" class="mx-auto mt-2">
                <img src="@/assets/images/logo_bg.png" width="40" height="40">
            </v-toolbar-title>
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