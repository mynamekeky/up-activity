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
                ข้อมูลส่วนตัว
            </div>
            <v-form>
                <v-col>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="form.first_name" name="name" label="ชื่อ" id="id" readonly></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="form.last_name" name="name" label="นามสกุล" id="id"
                                readonly></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field v-model="form.email" name="อีเมล" label="อีเมล" id="id" readonly></v-text-field>
                    <v-text-field v-model="form.phone" label="เบอร์โทรศัพท์" readonly></v-text-field>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="form.birthday" label="วันเกิด" readonly>
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-radio-group v-model="radios" label="เพศ" style="margin-top: 0;">
                                <div style="display: flex;">
                                    <v-radio label="หญิง" :value="1" style="margin-bottom: 0%; margin-right: 10px;"
                                        readonly></v-radio>
                                    <v-radio label="ชาย" :value="2" readonly></v-radio>
                                </div>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-col>
                <div class="text-center mt-7">
                    <v-btn color="primary" class="next-btn" width="283" @click="editProfile">แก้ไขข้อมูล</v-btn>
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
                first_name: '',
                last_name: '',
                birthday: null,
                email: '',
                phone: '',
            },
            modal: false,
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
        async loadData() {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const data = await fetch(`http://localhost:8080/users/findOneWithLineID/${this.$store.getters.getLine.userId}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.statusCode === 404) {
                        this.$router.push('/register');
                    }
                    this.form.first_name = result.data.first_name
                    this.form.last_name = result.data.last_name
                    this.form.birthday = this.$dateFns.format(result.data.birthday, 'yyyy-MM-dd')
                    this.form.email = result.data.email
                    this.form.phone = result.data.phone
                    this.radios = result.data.gender
                    console.log(result)
                })
                .catch(error => console.log('error', error));

            return data
        },
        back() {
            this.$router.push('/menu')
        },
        editProfile() {
            this.$router.push('/menu/profile/editProfile')
        },
    }
};
</script>