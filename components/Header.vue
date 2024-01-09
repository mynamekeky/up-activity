<template>
    <div>
        <v-app-bar color="primary" dark dense>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title text="light" class="mx-auto mt-2" style="padding-left: 0px; padding-right: 20px;">
                <img src="@/assets/images/logo_bg.png" width="40" height="40">
            </v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <div style="font-size: 20px; font-weight: 500; color: #1976D2;" class="mb-3 mt-2 ml-1">
                    Mesitthi
                </div>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item @click="home">
                        <v-list-item-icon>
                            <v-icon color="primary">mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>หน้าหลัก</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="search">
                        <v-list-item-icon>
                            <v-icon color="primary">search</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>ข้อมูลสิทธิ</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="menu">
                        <v-list-item-icon>
                            <v-icon color="primary">mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>จัดการบัญชี</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

export default {
    data: () => ({
        drawer: false,
        group: null,
    }),
    methods: {
        home() {
            this.$router.push('/')
        },
        register() {
            this.$router.push('/register')
        },
        menu() {
            this.$router.push('/menu')
        },
        search() {
            this.$router.push('/homepage')
        }
    }
};
</script>