<style scoped src="@/assets/styles/register.css"></style>
<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" class="mt-7 text-center">
                    <div class="progress-container">
                        <ul id="progressbar" style="padding-left: 0%;">
                            <li id="step1">
                                <strong>ขั้นตอนที่ 1</strong>
                            </li>
                            <li class="active" id="step2">
                                <strong>ขั้นตอนที่ 2</strong>
                            </li>
                        </ul>
                        <div class="progress">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12">
                    <v-form>
                        <div class="mx-12">
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
                        </div>
                        <div class="text-center">
                            <v-btn color="secondary" class="next-btn mr-6" @click="back" width="106.68">ย้อนกลับ</v-btn>
                            <v-btn color="primary" class="next-btn" @click="register" width="106.68">สมัครสมาชิก</v-btn>
                        </div>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                house_no: this.$store.getters.getRegister.house_no,
                village_no: this.$store.getters.getRegister.village_no,
                village: this.$store.getters.getRegister.village,
                province: this.$store.getters.getRegister.province,
                district: this.$store.getters.getRegister.district,
                subdistrict: this.$store.getters.getRegister.subdistrict,
            },
            modal: false
        }
    },
    methods: {
        validate() {
            let validate = true
            const errors = []
            let errorMsg = ''
            const validatorField = [
                'house_no',
                'village_no',
                'village',
                'province',
                'district',
                'subdistrict',
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
        register() {
            if (this.validate()) {
                this.$store.dispatch('setRegister', this.form)
                this.$fire.firestore.collection("members").doc(this.$store.getters.getLine.userId).set(this.$store.getters.getRegister).then((res) => {
                    this.$router.push('/menu');
                })
            }
        },
        back() {
            this.$store.dispatch('setRegister', this.form)
            this.$router.push('/register')
        }
    }
}
</script>
<style lang="scss">
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
    background-color: #1976D2;
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar {
    background-color: lightgray;
    width: 50%;
    height: 100%;
    transition: width 0.4s ease-in-out;
}
</style>