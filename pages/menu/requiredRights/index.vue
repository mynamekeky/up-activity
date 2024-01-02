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
                สิทธิที่ต้องการ
            </div>
            <v-form>
                <v-col>
                    <div>
                        <p class="mt-1" style="font-size: 13px;">สิทธิที่ท่านต้องการ (สามารถเลือกได้มากกว่า 1 อย่าง)
                        </p>
                        <v-checkbox v-model="form.required_rights_type" label="คลอดบุตร" value="คลอดบุตร"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.required_rights_type" label="สงเคราะห์บุตร" value="สงเคราะห์บุตร"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.required_rights_type" label="เจ็บป่วย" value="เจ็บป่วย"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.required_rights_type" label="ว่างงาน/ส่งเสริมอาชีพ"
                            value="ว่างงาน/ส่งเสริมอาชีพ" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.required_rights_type" label="ทุพพลภาพ" value="ทุพพลภาพ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.required_rights_type" label="ชราภาพ" value="ชราภาพ"
                            hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.required_rights_type" label="เสียชีวิต" value="เสียชีวิต"
                            hide-details readonly></v-checkbox>
                    </div>
                    <div class="mt-8">
                        <p style="font-size: 16px; font-weight: 500;">ระบุจำนวนเงินที่สามารถใช้จ่ายได้ต่อเดือน<br>(ไม่รวมที่จ่ายอยู่ในปัจจุบัน) </p>
                        <v-text-field v-model="form.cost_per_month" name="cost_per_month" label="ระบุจำนวนเงิน" id="id" readonly></v-text-field>
                    </div> 
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="editData">แก้ไขข้อมูล</v-btn>
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
                required_rights_type: [],
                cost_per_month: ''
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
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("requiredRights").get().then((res) => {
                if (res.data() != null || undefined) {
                    this.form.required_rights_type = res.data().required_rights_type
                    this.form.cost_per_month = res.data().cost_per_month
                }
            });

            return getProfile
        },
        back() {
            this.$router.push('/menu')
        },
        editData() {
            this.$router.push('/menu/requiredRights/editRequiredRights')
        }
    }
};
</script>