<template>
    <v-app id="login">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-2">
                            <v-toolbar dark :color="$store.state.theme.tone">
                                <v-toolbar-title>账号注册</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        :color="$store.state.theme.tone"
                                        prepend-icon="person"
                                        label="账号"
                                        type="text"
                                        v-model="usr"
                                        @keyup.enter="usrReg"
                                    ></v-text-field>
                                    <span class="caption mx-4 font-weight-light">Tip:账号和密码长度最少6位</span>
                                    <v-text-field
                                        :color="$store.state.theme.tone"
                                        prepend-icon="lock"
                                        label="密码"
                                        type="password"
                                        v-model="pwd"
                                        @keyup.enter="usrReg"
                                    ></v-text-field>
                                    <v-text-field
                                        
                                        :color="$store.state.theme.tone"
                                        prepend-icon="lock"
                                        label="确认密码"
                                        type="password"
                                        v-model="repwd"
                                        @keyup.enter="usrReg"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :color="$store.state.theme.tone" @click="usrReg">注册</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :color="$store.state.theme.tone" to="/login" flat>已有账号？点我登录</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            usr: "",
            pwd: "",
            repwd: ""
        };
    },
    
    activated() {
    
        this.$store.state.tbTitle = "注册";
    },
    methods: {
        usrReg() {
            var usr = this.usr;
            var pwd = this.pwd;
            var repwd = this.repwd;
            if (!usr || !pwd || !repwd) {
                this.$store.dispatch("showMsg", {
                    msg: "请填写完整！",
                    timeout: 1500
                });
                return;
            }
            if (pwd != repwd) {
                this.$store.dispatch("showMsg", {
                    msg: "两次输入的密码不一致！",
                    timeout: 1600
                });
                return;
            } else {
                if (usr.length < 6) {
                    this.$store.dispatch("showMsg", {
                        msg: "账号不符合要求，长度最少6位！",
                        timeout: 1700
                    });
                    return;
                }
                if (pwd.length < 6) {
                    this.$store.dispatch("showMsg", {
                        msg: "密码不符合要求，长度最少6位！",
                        timeout: 1700
                    });
                    return;
                }
            }

            var request_url = this.$store.state.mainUrl + "user/reg";
            this.axios
                .get(request_url, {
                    params: {
                        usr: this.usr,
                        pwd: this.pwd
                    }
                })
                .then(rsp => {
                    var status = rsp.data.status;
                    if (status == 200) {
                        this.$store.dispatch("showMsg", {
                            msg: `用户${usr}注册成功，密码${pwd}，请牢记您的账号信息~`,
                            timeout: 10000
                        });
                        setTimeout(() => {
                            this.$router.replace("/login");
                        }, 1500);
                    } else {
                        this.$store.dispatch("showMsg", {
                            msg: `账号${usr}已被注册，换个账号再试试吧~`,
                            timeout: 1600
                        });
                    }
                })
                .catch(e => {
                    this.$store.dispatch("showMsg", {
                        msg: "您的网络似乎有些问题……",
                        timeout: 1600
                    });
                });
        }
    }
};
</script>