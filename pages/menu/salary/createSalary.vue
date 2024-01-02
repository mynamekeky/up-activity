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
                อาชีพและรายได้
            </div>
            <v-form>
                <v-col>
                    <div>
                        <p style="font-size: 16px; font-weight: 500;">อาชีพ</p>
                        <v-select label="เลือกอาชีพของท่าน" :items="job_value" v-model="form.job"
                            :menu-props="{ offsetY: true }"></v-select>
                    </div>
                    <div class="mt-8">
                        <p style="font-size: 16px; font-weight: 500;">ระบุรายได้ต่อปีของท่าน</p>
                        <v-text-field v-model="form.salary" name="salary" label="จำนวนเงิน" id="id"
                            required></v-text-field>
                    </div>
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="create">ยืนยัน</v-btn>
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
                job: '',
                salary: ''
            },
            modal: false,
            job_value: ['เกษตรกร', 'รับจ้างทั่วไป', 'ค้าขาย', 'เจ้าของธุรกิจ/ผู้ประกอบการ', 'ขับรถรับจ้าง', 'ลูกจ้างชั่วคราวของหน่วยงานราชการ', 'พนักงานส่วนท้องถิ่น', 'ลูกจ้างรายวันของบริษัทเอกชน', 'ลูกจ้างบริษัทเอกชน', 'รับงานมาทำที่บ้าน', 'ผู้รับใช้ในบ้าน', 'เก็บขยะหรือของเก่าขาย', 'อาชีพอิสระอื่นๆ', 'ว่างงาน']
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
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("salary").get().then((res) => {
                if (res.data() != null || undefined) {
                    this.$router.push('/menu/salary');
                }
            });

            return getProfile
        },
        validate() {
            let validate = true
            const errors = []
            let errorMsg = ''
            const validatorField = [
                'job',
                'salary'
            ]
            validatorField.forEach((field) => {
                if (this.form[field] == '') {
                    validate = false
                    errors.push(`${field} can not be null`)
                }
            })
            if (!validate) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: '',
                    message: errors.map((error) => error + '<br/>').join('')
                })
            }

            console.log(errorMsg);
            return validate
        },
        back() {
            this.$router.push('/menu')
        },
        async create() {
            if (this.validate()) {
                await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("salary").set(this.form).then((res) => {
                    this.$router.push('/menu/salary');
                })
            }
        },
    }
};
</script>