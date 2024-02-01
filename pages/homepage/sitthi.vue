<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="mt-1">
                <v-btn text class="pl-0" @click="back">
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM2 7H1L1 9H2L2 7Z"
                            fill="#005ACD" />
                    </svg>
                    <div style="font-size: 13px; color: #1976D2;" class="pl-2">
                        ย้อนกลับ
                    </div>
                </v-btn>
                <div class="text-center">
                    <!-- <img v-if="list.type == undefined" src="@/assets/images/logo_bg.png" class="img_header">
                    <img v-else :src="require(`@/assets/images/${list.img_type}`)" class="img_header"> -->

                    <img v-if="list.type == 'เสียชีวิต'" src="@/assets/images/dead.png" class="img_header">
                    <img v-else-if="list.type == 'ชราภาพ'" src="@/assets/images/old.png" class="img_header">
                    <img v-else-if="list.type == 'ทุพพลภาพ'" src="@/assets/images/kid_sick.png" class="img_header">
                    <img v-else-if="list.type == 'เจ็บป่วย'" src="@/assets/images/sick.png" class="img_header">
                    <img v-else-if="list.type == 'สงเคราะห์บุตร'" src="@/assets/images/family.png" class="img_header">
                    <img v-else-if="list.type == 'คลอดบุตร'" src="@/assets/images/babe.png" class="img_header">
                    <img v-else-if="list.type == 'ว่างงาน/ส่งเสริมอาชีพ'" src="@/assets/images/kid_rich.png"
                        class="img_header">
                    <img v-else src="@/assets/images/logo_bg.png" class="img_header">
                </div>
            </v-col>
            <v-col>
                <v-row>
                    <v-col cols="4" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            รหัสสิทธิประโยชน์
                        </div>
                    </v-col>
                    <v-col cols="8" style="padding-bottom: 0;">
                        <div>
                            {{ list.code }}
                        </div>
                    </v-col>

                    <v-col cols="4" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            ชื่อนโยบาย
                        </div>
                    </v-col>
                    <v-col cols="8" style="padding-bottom: 0;">
                        <div>
                            {{ list.name }}
                        </div>
                    </v-col>

                    <v-col cols="4" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            ประเภทของเงินสวัสดิการ
                        </div>
                    </v-col>
                    <v-col cols="8" style="padding-bottom: 0;">
                        <div>
                            {{ list.type }}
                        </div>
                    </v-col>

                    <v-col cols="4" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            จำนวนเงินที่ต้องจ่าย
                        </div>
                    </v-col>
                    <v-col cols="8" style="padding-bottom: 0;">
                        <div>
                            {{ list.cost_title }}
                        </div>
                    </v-col>

                    <v-col cols="4" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            ผู้ออกนโยบาย
                        </div>
                    </v-col>
                    <v-col cols="8" style="padding-bottom: 0;">
                        <div>
                            {{ list.author }}
                        </div>
                    </v-col>
                    <v-col cols="12" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            รายละเอียดของสิทธิประโยชน์
                        </div>
                        <div class="ml-1" style="white-space: pre-line;">
                            {{ list.description }}
                        </div>
                    </v-col>
                    <v-col cols="12" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            เงื่อนไข
                        </div>
                        <div class="ml-1" style="white-space: pre-line;">
                            {{ list.condition }}
                        </div>
                    </v-col>
                    <v-col cols="12" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            เอกสารแนะนำ
                        </div>
                        <div class="ml-1">
                            {{ list.tool }}
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            list: this.$store.getters.getSetthi[this.$route.query.id - 1],
        }
    },
    mounted() {
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        },
    },
    methods: {
        back() {
            if (this.$route.query.search) {
                let search = this.$route.query.search
                this.$router.push({ path: '/homepage?search=', query: { search } })
            } else {
                this.$router.push('/homepage')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.img_header {
    //width: 100px;
    height: 100px;
    background-color: rgba(241, 241, 241, 0.39);
    border-radius: 10%;
}
</style>
