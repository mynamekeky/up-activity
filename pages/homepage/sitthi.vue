<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="mt-1">
                <div class="text-center">
                    <img v-if="list.img_type == undefined" src="@/assets/images/logo_bg.png" class="img_header">
                    <img v-else :src="require(`@/assets/images/${list.img_type}`)" class="img_header">
                    <img v-if="list.img_author == undefined" src="@/assets/images/logo_bg.png" class="img_header">
                    <img v-else :src="require(`@/assets/images/${list.img_author}`)" class="img_header">
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
                            {{ list.cost }}
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
                        <div v-for="(item, index) in list.detail" class="ml-1" style="line-height: 1.3rem;">
                            {{ index + 1 }}. {{ item.title }}
                        </div>
                    </v-col>
                    <v-col cols="12" style="padding-bottom: 0;">
                        <div style="font-weight: 500;">
                            เงื่อนไข
                        </div>
                        <div v-for="(item, index) in list.condition" class="ml-1" style="line-height: 1.3rem;">
                            {{ index + 1 }}. {{ item.title }}
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
            list: [],
            sitthi: this.$store.getters.getSetthi
        }
    },
    mounted() {
        // this.getData()
        this.list = this.sitthi[0]
        console.log(this.list.tool)
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.img_header {
    width: 100px;
    height: 100px;
    background-color: rgba(241, 241, 241, 0.39);
    border-radius: 10%;
}
</style>
