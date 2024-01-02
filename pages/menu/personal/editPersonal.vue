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
                แก้ไขคุณลักษณะส่วนตัว
            </div>
            <v-form>
                <v-col>
                    <div>
                        <p class="mt-1" style="font-size: 13px;">ท่านมีคุณลักษณะอย่างไร(เลือกได้มากกว่า 1 ข้อ)
                        </p>
                        <v-checkbox v-model="form.personal_type"
                            label="เคยเป็นผู้ประกันตนตามมาตรา 33 แห่งพระราชบัญญัติประกันสังคม"
                            value="เคยเป็นผู้ประกันตนตามมาตรา 33 แห่งพระราชบัญญัติประกันสังคม" hide-details></v-checkbox>
                        <v-checkbox v-model="form.personal_type" label="เป็นสมาชิกธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร"
                            value="เป็นสมาชิกธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร" hide-details></v-checkbox>
                        <v-checkbox v-model="form.personal_type" label="เป็นผู้ได้รับสิทธิ์ประโยชน์จากเงินบำนาญเบี้ยหวัดบำนาญพิเศษรวมถึง
เงินอื่นๆ ในลักษณะเดียวกัน" value="เป็นผู้ได้รับสิทธิ์ประโยชน์จากเงินบำนาญเบี้ยหวัดบำนาญพิเศษรวมถึง
เงินอื่นๆ ในลักษณะเดียวกัน" hide-details></v-checkbox>
                        <v-checkbox v-model="form.personal_type" label="เป็นผู้พิการ" value="เป็นผู้พิการ"
                            hide-details></v-checkbox>
                        <v-checkbox v-model="form.personal_type" label="ได้รับผลกระทบจากสถานการณ์ความไม่สงบชายแดนภาคใต้"
                            value="ได้รับผลกระทบจากสถานการณ์ความไม่สงบชายแดนภาคใต้" hide-details></v-checkbox>
                        <v-checkbox v-model="form.personal_type"
                            label="เป็นผู้ติดเชื้อ HIV (โรคเอดส์) ที่ไม่มีผู้อุปการะเลี้ยงดู"
                            value="เป็นผู้ติดเชื้อ HIV (โรคเอดส์) ที่ไม่มีผู้อุปการะเลี้ยงดู" hide-details></v-checkbox>
                        <v-row align="center">
                            <v-col cols="3">
                                <v-checkbox v-model="form.other" hide-details class="shrink mr-2 mt-0" label="อื่นๆ"
                                    @change="clearValue"></v-checkbox>
                            </v-col>
                            <v-col>
                                <v-text-field :disabled="!form.other" v-model="form.other_value"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="update">ยืนยัน</v-btn>
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
                personal_type: [],
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
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("personal").get().then((res) => {
                if (res.data() != null || undefined) {
                    this.form.personal_type = res.data().personal_type
                    this.form.other = res.data().other
                    this.form.other_value = res.data().other_value
                }
            });

            return getProfile
        },
        back() {
            this.$router.push('/menu')
        },
        async update() {
            await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("personal").update(this.form).then((res) => {
                this.$router.push('/menu/personal');
            })
        },
        clearValue() {
            this.form.other_value = '';
        },
    }
};
</script>