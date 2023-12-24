<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="form.firstname" name="name" label="ชื่อ" id="id" required></v-text-field>
                            <v-text-field v-model="form.lastname" name="name" label="นามสกุล" id="id"
                                required></v-text-field>
                            <v-text-field v-model="form.phone" :rules="phoneRules" @keypress="onlyNumber($event, 10)"
                                label="เบอร์โทรศัพท์"></v-text-field>
                            <v-text-field v-model="form.email" :rules="emailRules" name="อีเมล" label="Email" id="id"
                                required></v-text-field>
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
                            <v-radio-group v-model="form.gender" label="เพศ" style="margin-top: 0;">
                                <div style="display: flex;">
                                    <v-radio label="ชาย" value="male"
                                        style="margin-bottom: 0%; margin-right: 10px;"></v-radio>
                                    <v-radio label="หญิง" value="female"></v-radio>
                                </div>
                            </v-radio-group>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="form.house_no" name="house_no" label="บ้านเลขที่" id="id"
                                required></v-text-field>
                            <v-text-field v-model="form.village_no" name="village_no" label="หมู่ที่" id="id"
                                required></v-text-field>
                            <v-text-field v-model="form.village" name="village" label="หมู่บ้าน" id="id"
                                required></v-text-field>
                            <v-text-field v-model="form.subdistrict" name="subdistrict" label="แขวง/ตำบล" id="id"
                                required></v-text-field>
                            <v-text-field v-model="form.district" name="district" label="เขต/อำเภอ" id="id"
                                required></v-text-field>
                            <v-text-field v-model="form.province" name="province" label="จังหวัด" id="id"
                                required></v-text-field>
                        </v-col>
                    </v-row>
                    <div class="text-center">
                        <v-btn color="secondary" class="next-btn mr-6" width="106.68">ยกเลิก</v-btn>
                        <v-btn color="primary" class="next-btn" width="106.68">ยืนยัน</v-btn>
                    </div>
                </v-form>
            </v-col>
        </v-row>
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
                firstname: this.$store.getters.getRegister.firstname,
                lastname: this.$store.getters.getRegister.lastname,
                birthday: this.$store.getters.getRegister.birthday,
                email: this.$store.getters.getRegister.email,
                phone: this.$store.getters.getRegister.phone,
                gender: this.$store.getters.getRegister.gender,
                house_no: this.$store.getters.getRegister.house_no,
                village_no: this.$store.getters.getRegister.village_no,
                village: this.$store.getters.getRegister.village,
                province: this.$store.getters.getRegister.province,
                district: this.$store.getters.getRegister.district,
                subdistrict: this.$store.getters.getRegister.subdistrict,
            },
            profile: null,
            emailRules: [value => this.emailValidator(value)],
            phoneRules: [value => this.phoneValidator(value)]
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
            const getProfile = await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).get().then((res) => {
                this.form.firstname = res.data().firstname
                this.form.lastname = res.data().lastname
                this.form.birthday = res.data().birthday
                this.form.email = res.data().email
                this.form.phone = res.data().phone
                this.form.gender = res.data().gender
                this.form.house_no = res.data().house_no
                this.form.village_no = res.data().village_no
                this.form.village = res.data().village
                this.form.province = res.data().province
                this.form.district = res.data().district
                this.form.subdistrict = res.data().subdistrict
            });

            return getProfile
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
    }
};
</script>