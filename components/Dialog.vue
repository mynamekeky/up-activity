<template>
    <v-dialog v-model="getDialog.isShow" max-width="500px" transition="dialog-transition" persistent>
        <v-card>
            <v-card-title primary-title>
                Error
            </v-card-title>
            <v-card-text class="pt-5" v-html="getDialog.message">
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="hideDialog">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    computed: {
        getDialog() {
            return this.$store.getters.getDialog
        }
    },
    methods: {
        hideDialog() {
            this.$store.dispatch('setDialog', {
                isShow: false,
                title: '',
                message: '' 
            })
        }
    }
}
</script>