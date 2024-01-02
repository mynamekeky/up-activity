<template>
    <v-container>
        <v-col cols="12">
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
            <div class="text-center mt-1 mb-6" style="font-size: 18px; font-weight: 500; color: #1976D2;">
                สิทธิและสวัสดิการปัจจุบัน
            </div>
            <v-form>
                <v-col>
                    <div>
                        <p class="mt-1" style="font-size: 13px;">ปัจจุบันท่านได้รับสิทธิประโยชน์หรือสวัสดิการใดบ้าง
                            (เลือกได้มากกว่า 1 ข้อ)
                        </p>
                        <v-checkbox v-model="form.right_type" label="เบี้ยยังชีพผู้สูงอายุ" value="เบี้ยยังชีพผู้สูงอายุ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="เบี้ยยังชีพคนพิการ" value="เบี้ยยังชีพคนพิการ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="เงินอุดหนุนเพื่อเลี้ยงดูเด็กแรกเกิด"
                            value="เงินอุดหนุนเพื่อเลี้ยงดูเด็กแรกเกิด" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="บัตรสวัสดิการแห่งรัฐ" value="บัตรสวัสดิการแห่งรัฐ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="ประกันสังคมมาตรา33" value="ประกันสังคมมาตรา33"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="ประกันสังคมมาตรา39" value="ประกันสังคมมาตรา39"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="ประกันสังคมมาตรา40" value="ประกันสังคมมาตรา40"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="กองทุนการออมแห่งชาติ" value="กองทุนการออมแห่งชาติ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="ฌาปนกิจสงเคราะห์สมาชิกและลูกค้าธนาคารเพื่อการเกษตร"
                            value="ฌาปนกิจสงเคราะห์สมาชิกและลูกค้าธนาคารเพื่อการเกษตร" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="สวัสดิการรักษาพยาบาลข้ารายการของญาติ"
                            value="สวัสดิการรักษาพยาบาลข้ารายการของญาติ" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="เงินบำนาญข้าราชการ" value="เงินบำนาญข้าราชการ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="กรมธรรม์วันละบาท ธนาคารเพื่อการเกษตรและสหกรณ์ (ธกส.)"
                            value="กรมธรรม์วันละบาท ธนาคารเพื่อการเกษตรและสหกรณ์ (ธกส.)" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type"
                            label="กรมธรรม์เพิ่มรัก 2 12/10 ธนาคารเพื่อการเกษตรและสหกรณ์ (ธกส.)"
                            value="กรมธรรม์เพิ่มรัก 2 12/10 ธนาคารเพื่อการเกษตรและสหกรณ์ (ธกส.)" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="กรมธรรม์ทวีรัก ๙๙ ธนาคารเพื่อการเกษตรและสหกรณ์ (ธกส.)"
                            value="กรมธรรม์ทวีรัก ๙๙ ธนาคารเพื่อการเกษตรและสหกรณ์ (ธกส.)" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.right_type" label="ไม่ได้รับสิทธิหรือสวัสดิการใดๆ"
                            value="ไม่ได้รับสิทธิหรือสวัสดิการใดๆ" hide-details readonly></v-checkbox>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-checkbox v-model="form.other" hide-details readonly class="shrink mr-2 mt-0" label="อื่นๆ"></v-checkbox>
                            </v-col>
                            <v-col>
                                <v-text-field :disabled="!form.other" v-model="form.other_value"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="editRights">แก้ไขข้อมูล</v-btn>
                </div>
            </v-form>
        </v-col>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                other: false,
                right_type: [],
                other_value: ''
            },
            modal: false,
            other: false,
        };
    },
    mounted() {
        liff.init({
            liffId: '2001510620-12zg0AQD'
        }).then(() => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(async profile => {
                    this.$store.dispatch('setLine', profile);
                    await this.loadData();
                })
            } else {
                liff.login();
            }
        })
    },
    computed: {
        getLine() {
            return this.$store.getters.getLine;
        }
    },
    methods: {
        async loadData() {
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("rights").get().then((res) => {
                if (res.data() != null || undefined) {
                    this.form.other = res.data().other
                    this.form.other_value = res.data().other_value
                    this.form.right_type = res.data().right_type
                }
            });

            return getProfile
        },
        back() {
            this.$router.push('/menu')
        },
        editRights() {
            this.$router.push('/menu/rights/editRights')
        }
    }
};
</script>