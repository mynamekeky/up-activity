<template>
    <v-app>
        <v-main class="py-3 px-5">
            <v-data-iterator :items="beers" :items-per-page.sync="ipp" :page.sync="page" hide-default-footer>
                <template v-slot:header>
                    <v-toolbar dark color="blue darken-3" class="mb-1">
                        <div class="headline white--text mr-2">
                            Cards Data Iterator
                            <div class="overline">With Pagination</div>
                        </div>
                    </v-toolbar>
                </template>
                <template v-slot:default="props">
                    <v-row>
                        <v-col v-for="(item, idx) in props.items" :key="item.name" :cols="(12 / itemsPerRow)">
                            <v-card class="fill-height">
                                <v-card-title>
                                    <span class="font-weight-light text-truncate">
                                        <span v-text="item.id"></span> {{ item.name }}
                                        <v-chip small outline class="blue--text"
                                            v-if="item.id.toString() === beers.length.toString()">last</v-chip>
                                    </span>
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <div v-html="item.tagline"></div>
                                    <v-chip v-text="item.first_brewed"></v-chip>

                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <v-row class="no-gutters mt-2" align="center" justify="center">
                        <div class="grow">
                            <span>Rows per page</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark text color="primary" class="ml-1" v-on="on">{{ rowsPerPage
                                    }}<v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(number, index) in rowsPerPageArray" :key="index"
                                        @click="updateRowsPerPage(number)">
                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                        <div class="text-center mx-auto grow">
                            <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
                        </div>
                        <v-spacer></v-spacer>
                        <span class="mr-4
                    grey--text">
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn small dark color="blue darken-3" class="mr-1" @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn small dark color="blue darken-3" class="ml-1" @click="nextPage">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            bottom: false,
            beers: [],
            rowsPerPageArray: [3, 4, 6],
            rowsPerPage: 4,
            page: 1
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.beers.length / this.ipp)
        },
        itemsPerRow() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 1
                case 'sm': return 2
                case 'md': return 3
                case 'lg': return 4
                case 'xl': return 6
            }
        },
        ipp() {
            return Math.ceil(this.rowsPerPage * this.itemsPerRow)
        }
    },
    methods: {
        getBeers() {
            // get items from the server
            this.$axios.get('https://api.punkapi.com/v2/beers?per_page=28')
                .then(response => {
                    this.beers = response.data
                })
        },
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
        updateRowsPerPage(number) {
            this.rowsPerPage = number
        },
    },
    created() {
        this.getBeers()
    }
}
</script>