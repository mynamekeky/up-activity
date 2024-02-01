<template>
    <v-container>
        <v-row>
            <v-col>
                <v-data-iterator :items="filterLists" :page.sync="page" :items-per-page.sync="perPage" hide-default-footer>
                    <template v-slot:header>
                        <v-text-field prepend-icon="search" label="Search" v-model="search"
                            class="mx-3 mt-5"></v-text-field>
                        <div class="mb-2 text-right">
                            จำนวนสิทธิที่เกี่ยวข้อง {{ filterLists.length }} สิทธิ
                        </div>
                    </template>

                    <template v-slot:default="props">
                        <v-row>
                            <v-col v-for="(item, idx) in props.items" :key="item.id">
                                <v-card>
                                    <v-card-title style="padding-bottom: 0px;">
                                        <div>
                                            <div style="font-size: 17px; font-weight: 600;">{{ item.name }}</div>
                                            <div style="font-size: 15px;"><span
                                                    style="font-weight: 600;">รหัสสิทธิปรโยชน์</span> {{
                                                        item.code }}</div>
                                            <div style="font-size: 15px;"><span style="font-weight: 600;">หน่วยงาน</span> {{
                                                item.author
                                            }}</div>
                                            <div style="font-size: 15px;"><span style="font-weight: 600;">ประเภท</span> {{
                                                item.type }}
                                            </div>
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn color="primary" width="200" class="mx-auto"
                                            @click="viewData(item.id, search)">ดูเพิ่มเติม</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:footer>
                        <v-row class="no-gutters mt-2" align="center" justify="center">
                            <div class="text-center mx-auto grow">
                                <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
                            </div>
                        </v-row>
                    </template>
                </v-data-iterator>
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
            search: null,
            page: 1,
            perPage: 5,
        }
    },
    mounted() {
        this.lists = this.sitthi
        this.search = this.$route.query.search
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
        numberOfPages() {
            return Math.ceil(this.filterLists.length / this.perPage)
        },
        filterLists() {
            let data = this.lists
            if (this.search != null) {
                data = this.lists.filter((list) => {
                    return list.name.match(this.search) || list.type.match(this.search) || list.code.match(this.search)
                })
            }
            return data
        }
    },
    methods: {
        viewData(id, search) {
            if (this.$route.query.search) {
                search = this.$route.query.search
                this.$router.push({ path: '/homepage/sitthi/', query: { id, search } })
            } else {
                this.$router.push({ path: '/homepage/sitthi/', query: { id } })
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
