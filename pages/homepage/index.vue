<template>
    <v-container>
        <v-row>
            <v-col>
                <v-data-iterator :items="lists" :page.sync="page" :items-per-page.sync="perPage" hide-default-footer>
                    <template v-slot:header>
                        <div class="d-flex justify-content-between">
                            <v-text-field label="Search" v-model="search" class="mx-3 mt-5"
                                @keyup.enter="getDataSitthi(search)"></v-text-field>
                            <v-btn color="primary" class="mt-7" @click="getDataSitthi(search)">
                                <v-icon>search</v-icon>
                            </v-btn>
                        </div>
                        <div class="mb-2 text-right">
                            จำนวนสิทธิที่เกี่ยวข้อง {{ lists.length }} สิทธิ
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
                                            @click="viewData(item.id)">ดูเพิ่มเติม</v-btn>
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
            search: '',
            page: 1,
            perPage: 5,
        }
    },
    mounted() {
        liff.init({
            liffId: '2001510620-12zg0AQD'
        }).then(async () => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(async profile => {
                    this.$store.dispatch('setLine', profile);
                    await this.checkData()
                    await this.getDataSitthi(this.$route.query.search)
                })
            } else {
                liff.login()
            }
        })
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
        numberOfPages() {
            return Math.ceil(this.lists.length / this.perPage)
        },
    },
    methods: {
        async checkData() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const data = await fetch(`http://localhost:8080/users/findOneWithLineID/${this.$store.getters.getLine.userId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (!result.data) {
                        this.$router.push('/register')
                    }
                })
                .catch(error => console.log('error', error));
            return data
        },
        viewData(id) {
            this.$router.push({ path: '/homepage/sitthi/', query: { id } })
        },
        async getDataSitthi(search) {
            let data = []
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            if (search) {
                this.$router.push({ path: '/homepage?search=', query: { search } })
                data = await fetch(`http://localhost:8080/sitthi?search=${search}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        this.lists = result
                    })
                    .catch(error => console.log('error', error));
            } else {
                data = await fetch(`http://localhost:8080/sitthi?search=`, requestOptions)
                    .then(response => response.json())
                    .then(result => { this.lists = result })
                    .catch(error => console.log('error', error));
            }

            return data
        },
        async searchSitthi(search) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            if (search) {
                this.$router.push({ path: '/homepage?search=', query: { search } })
                this.list = await fetch(`http://localhost:8080/sitthi?search=${search}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        this.lists = result
                    })
                    .catch(error => console.log('error', error));
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
