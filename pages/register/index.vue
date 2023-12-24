<style scoped src="@/assets/styles/register.css"></style>
<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" class="mt-7 text-center">
                    <div class="progress-container">
                        <ul id="progressbar" style="padding-left: 0%;">
                            <li class="active" id="step1">
                                <strong>ขั้นตอนที่ 1</strong>
                            </li>
                            <li id="step2">
                                <strong>ขั้นตอนที่ 2</strong>
                            </li>
                        </ul>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" class="mt-1">
                    <div class="text-center">
                        <img v-if="getLine.pictureUrl == ''" src="@/assets/images/pre-image.jpg" class="pre-img">
                        <img v-else :src="getLine.pictureUrl" class="pre-img">
                    </div>
                </v-col>
                <v-col cols="12" class="text-center">
                    <div class="">
                        <template v-if="getLine.displayName == ''">
                            Display Name
                        </template>
                        <template v-else>
                            {{ this.getLine.displayName }}
                        </template>
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-form>
                        <div class="mx-12">
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
                            <v-radio-group v-model="radios">
                                <div style="display: flex;">
                                    <div style="margin-top: 0; font-weight: 300; margin-right: 1rem;">
                                        เพศ
                                    </div>
                                    <v-radio label="หญิง" :value="1" style="margin-bottom: 0%; margin-right: 10px;"
                                        @click="chooseGender(1)"></v-radio>
                                    <v-radio label="ชาย" :value="2" @click="chooseGender(2)"></v-radio>
                                </div>
                            </v-radio-group>
                        </div>
                        <div class="text-center">
                            <v-btn color="primary" class="next-btn" @click="next">ต่อไป</v-btn>
                        </div>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_PHONE = /^[0]([0-9]{9})*$/
const REGEX_NUMBER = /^[0-9]*$/
export default {
    mounted() {
        liff.init({
            liffId: '2001510620-12zg0AQD'
        }).then(() => {
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    this.$store.dispatch('setLine', profile);
                    this.isDone();
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
    data() {
        return {
            form: {
                firstname: this.$store.getters.getRegister.firstname,
                lastname: this.$store.getters.getRegister.lastname,
                birthday: this.$store.getters.getRegister.birthday,
                email: this.$store.getters.getRegister.email,
                phone: this.$store.getters.getRegister.phone,
                gender: this.$store.getters.getRegister.gender
            },
            modal: false,
            emailValidated: false,
            phoneValidated: false,
            emailRules: [value => this.emailValidator(value)],
            phoneRules: [value => this.phoneValidator(value)],
            radios: null,
        }
    },
    methods: {
        async isDone() {
            await this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).get().then((res) => {
                if (res.data() != null) {
                    this.$router.push('/menu');
                }
            });
        },
        chooseGender(gender) {
            this.form.gender = gender
            console.log(gender)
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
        next() {
            if (this.validate()) {
                this.$store.dispatch('setRegister', this.form)
                this.$router.push('/register/step2')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.progress-container {
    text-align: center;
    margin-bottom: 20px;
    width: 294px;
    display: inline-block;
}

#progressbar {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    color: lightgrey;
}

#progressbar li {
    flex: 1;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    position: relative;
}

#progressbar li.active {
    color: #1976D2;
}

.progress {
    height: 15px;
    background-color: lightgray;
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar {
    background-color: #1976D2;
    width: 50%;
    height: 100%;
    transition: width 0.4s ease-in-out;
}
</style>