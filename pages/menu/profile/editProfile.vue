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
                แก้ข้อมูลส่วนตัว
            </div>
            <v-form>
                <v-col>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="form.firstname" name="name" label="ชื่อ" id="id" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="form.lastname" name="name" label="นามสกุล" id="id"
                                required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="form.email" :rules="emailRules" name="อีเมล" label="Email" id="id"
                        required></v-text-field>
                    <v-text-field v-model="form.phone" :rules="phoneRules" @keypress="onlyNumber($event, 10)"
                        label="เบอร์โทรศัพท์"></v-text-field>
                    <v-row>
                        <v-col>
                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="form.birthday" persistent
                                width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="form.birthday" label="วันเกิด" prepend-icon="event" readonly
                                        v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="form.birthday" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="danger" @click="modal = false">ยกเลิก</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(form.birthday)">เลือก</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col>
                            <v-radio-group v-model="radios" label="เพศ" style="margin-top: 0;">
                                <div style="display: flex;">
                                    <v-radio label="หญิง" :value="1" style="margin-bottom: 0%; margin-right: 10px;"
                                        @click="chooseGender(1)"></v-radio>
                                    <v-radio label="ชาย" :value="2" @click="chooseGender(2)"></v-radio>
                                </div>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="update">ยืนยัน</v-btn>
                </div>
            </v-form>
        </v-col>
    </v-container>
</template>

<script>
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_PHONE = /^[0]([0-9]{9})*$/
const REGEX_NUMBER = /^[0-9]*$/
export default {
    data() {
        return {
            form: {
                firstname: '',
                lastname: '',
                birthday: null,
                email: '',
                phone: '',
                gender: null
            },
            modal: false,
            profile: null,
            emailRules: [value => this.emailValidator(value)],
            phoneRules: [value => this.phoneValidator(value)],
            radios: null,
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
        back() {
            this.$router.push('/menu/profile')
        },
        async loadData() {
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).get().then((res) => {
                this.form.firstname = res.data().firstname
                this.form.lastname = res.data().lastname
                this.form.birthday = res.data().birthday
                this.form.email = res.data().email
                this.form.phone = res.data().phone
                this.radios = res.data().gender
                this.form.gender = res.data().gender
                let data = res.data()
                return data
            });
            console.log(getProfile)
            return getProfile
        },
        chooseGender(gender) {
            this.form.gender = gender
        },
        phoneValidator(value) {
            this.phoneValidated = false
            if (value == '') {
                return 'required'
            }
            if (REGEX_PHONE.test(value) && value.length == 10) {
                this.phoneValidated = true
                return true
            }
            return "please input phone number"
        },
        emailValidator(value) {
            this.emailValidated = false
            if (value == '') {
                return 'required'
            }
            if (REGEX_EMAIL.test(value)) {
                this.emailValidated = true
                return true
            }
            return "email is Invalid"
        },
        onlyNumber(event, max) {
            if (event.target.value.length == 0) {
                if (event.key != 0) {
                    return event.preventDefault()
                }
            } else {
                if (!REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
                    return event.preventDefault()
                }
            }
        },
        validate() {
            let validated = true
            const errors = []
            let errorMsg = ''
            const validatorField = [
                'firstname',
                'lastname',
                'email',
                'birthday'
            ]
            validatorField.forEach((field) => {
                if (this.form[field] == '') {
                    validated = false
                    errors.push(`${field} can not be null`)
                }
            })
            if (!this.emailValidated) {
                validated = false
                errors.push(`email is Invalid`)
            }
            if (!this.phoneValidated) {
                validated = false
                errors.push(`please input phone number`)
            }
            if (!validated) {
                this.$store.dispatch('setDialog', {
                    isShow: true,
                    title: 'Form is error',
                    message: errors.map((error) => error + '<br/>').join('')
                })
            }
            console.log(errorMsg);
            return validated
        },
        async update() {
            if (this.validate()) {
                await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).update(this.form).then((res) => {
                    this.$router.push('/menu/profile');
                })
            }
        },
    }
};
</script>