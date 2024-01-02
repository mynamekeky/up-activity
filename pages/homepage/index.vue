<template>
    <v-container>
        <v-row>
            <v-col>
                <div>
                    <!-- <v-form> -->
                    <v-text-field prepend-icon="search" label="Search" v-model="search" class="mx-3 mt-5"></v-text-field>
                    <!-- </v-form> -->
                </div>
                <div v-for="item in filterLists" class="mt-1">
                    <v-card>
                        <v-card-title style="padding-bottom: 0px;">
                            <div>
                                <div style="font-size: 17px; font-weight: 600;">{{ item.name }}</div>
                                <div style="font-size: 15px;"><span style="font-weight: 600;">รหัสสิทธิปรโยชน์</span> {{ item.code }}</div>
                                <div style="font-size: 15px;"><span style="font-weight: 600;">หน่วยงาน</span> {{ item.author }}</div>
                                <div style="font-size: 15px;"><span style="font-weight: 600;">ประเภท</span> {{ item.type }}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn color="primary" width="200" class="mx-auto">ดูเพิ่มเติม</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            lists: [],
            sitthi: this.$store.getters.getSetthi,
            search: null
        }
    },
    mounted() {
        // this.getData()
        // for ( item ) in this.sitthi
        this.lists = this.sitthi
        console.log(this.lists)
    },
    computed: {
        filterLists() {
            let data = this.lists
            if (this.search != null) {
                data = this.lists.filter((list) => {
                    return list.name.match(this.search) || list.type.match(this.search) || list.code.match(this.search) || list.author.match(this.search)
                })
            }
            return data
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped></style>
