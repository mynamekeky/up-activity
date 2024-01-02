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
                สถานภาพ
            </div>
            <v-form>
                <v-col>
                    <v-select label="เลือกสถานภาพของท่าน" :items="['โสด', 'สมรส', 'หย่าร้าง', 'ม่าย', 'แยกกันอยู่']"
                        v-model="form.status" :menu-props="{ offsetY: true }" readonly></v-select>
                    <div class="mt-3" style="font-size: 17px;">
                        คุณลักษณะครอบครัว
                    </div>
                    <div>
                        <p class="mt-1" style="font-size: 13px;">โปรดเลือกลักษณะครอบครัวของท่าน(เลือกได้มากกว่า 1 ข้อ)
                        </p>
                        <v-checkbox v-model="form.family_type" label="มีสมาชิกครอบครัวเป็นเกษตรกร"
                            value="มีสมาชิกครอบครัวเป็นเกษตรกร" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="มีเด็กอายุต่ำกว่า 6 ปีบริบูรณ์ จำนวน 1 คน"
                            value="มีเด็กอายุต่ำกว่า 6 ปีบริบูรณ์ จำนวน 1 คน" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="มีเด็กอายุต่ำกว่า 6 ปีบริบูรณ์ มากกว่า 1 คน"
                            value="มีเด็กอายุต่ำกว่า 6 ปีบริบูรณ์ มากกว่า 1 คน" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="มีเด็กที่รับเลี้ยงจากบ้านพักเด็กและครอบครัว"
                            value="มีเด็กที่รับเลี้ยงจากบ้านพักเด็กและครอบครัว" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="มีสมาชิกครอบครัวเป็นผู้ติดเชื้อ HIV (โรคเอดส์)"
                            value="มีสมาชิกครอบครัวเป็นผู้ติดเชื้อ HIV (โรคเอดส์)" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="มีสมาชิกครอบครัวเป็นผู้พิการหรือคนชรา"
                            value="มีสมาชิกครอบครัวเป็นผู้พิการหรือคนชรา" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="ไม่มีครอบครัว เช่น กำพร้า ถูกทอดทิ้ง ฯลฯ"
                            value="ไม่มีครอบครัว เช่น กำพร้า ถูกทอดทิ้ง ฯลฯ" hide-details readonly></v-checkbox>
                        <v-checkbox v-model="form.family_type" label="ไม่มีลักษณะดังที่กล่าวมา"
                            value="ไม่มีลักษณะดังที่กล่าวมา" hide-details readonly></v-checkbox>
                    </div>
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="editStatus">แก้ไขข้อมูล</v-btn>
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
                status: '',
                family_type: []
            },
            modal: false,
            radios: null,
            selected: null
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
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).collection("info").doc("status").get().then((res) => {
                if (res.data() != null || undefined) {
                    this.form.status = res.data().status
                    this.form.family_type = res.data().family_type
                }
            });

            return getProfile
        },
        validate() {
            let validate = true
            const errors = []
            let errorMsg = ''
            const validatorField = [
                'status',
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
        editStatus() {
            this.$router.push('/menu/status/editStatus')
        }
    }
};
</script>