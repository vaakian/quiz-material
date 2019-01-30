<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-2">
              <v-toolbar :color="$store.state.theme.tone">
                <v-toolbar-title>账号登录</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field :color="$store.state.theme.tone" prepend-icon="person" label="账号" type="text" v-model="usr" @keyup.enter="usrLogin"></v-text-field>
                  <v-text-field :color="$store.state.theme.tone" prepend-icon="lock" label="密码" type="password" v-model="pwd" @keyup.enter="usrLogin"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="$store.state.theme.tone" @click="usrLogin">登录</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-card-actions>
                <v-btn :color="$store.state.theme.tone" to="/reg" flat>没有账号？点我注册</v-btn>
                <v-spacer></v-spacer>
                <v-btn :color="$store.state.theme.tone" flat>忘记密码</v-btn>
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
        usr: '',
        pwd: ''
      }
    },
    activated() {
      this.$store.state.tbTitle = '登录'
    },
    methods: {
      usrLogin() {
        var request_url = this.$store.state.mainUrl + 'user/login'
        this.axios.get(request_url, {
          params: {
            usr: this.usr,
            pwd: this.pwd
          }
        }).then((rsp) => {
          var msg = `欢迎回来，${this.usr}!`
          if (rsp.data['status'] == 200) {
            var userData = rsp.data['data']
            this.$store.state.userData = userData
            localStorage.setItem('userData', JSON.stringify(userData))
            setTimeout(() => {
              this.$router.replace('/')
            }, 1000)
          } else {
            msg = `登录失败，账号或密码不正确！`
          }
          this.$store.dispatch('showMsg', {
            msg,
            timeout: 1600
          })
        })
      }
    }

  }

</script>
