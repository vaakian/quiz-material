<template>
  <v-layout justify-center row wrap text-xs-center>

    <v-flex xs12>
      <v-chip large :color="theme.tone" dark>
        <v-avatar>
          <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${userData.qq}&s=640`" alt="trevor">
        </v-avatar>
        {{ userData.username }}
      </v-chip>
    </v-flex>
    <!-- <v-divider></v-divider> -->
    <v-flex xs12>
      <v-avatar :tile="false" :size="100" color="grey lighten-4">
        <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${userData.qq}&s=640`" alt="">
      </v-avatar>
    </v-flex>
    <v-flex xs8>
      <v-text-field label="口号" v-model="profile.slogan">

      </v-text-field>
    </v-flex>
    <v-flex xs8>
      <v-text-field label="QQ号(头像源)" v-model="profile.qq">

      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-btn round :color="theme.tone" @click="setProfile" dark>save</v-btn>
    </v-flex>
  </v-layout>

</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        profile: {
          slogan: '',
          qq: ''
        }
      }
    },
    computed: {
      ...mapState([
        'userData',
        'theme',
        'mainUrl'
      ])
    },
    activated() {
      this.$store.state.tbTitle = '个人资料'
      this.profile.qq = this.userData.qq
      this.profile.slogan = this.userData.slogan
    },
    methods: {
      setProfile() {
        var request_url = this.mainUrl + 'user/setProfile'
        var userData = this.userData
        userData.qq = this.profile.qq
        userData.slogan = this.profile.slogan
        this.axios.get(request_url, {
          params: userData
        }).then(rsp => {
          var data = rsp.data
          if (data.status == 200) {
            localStorage.setItem('userData', JSON.stringify(this.userData))
            this.$store.state.userData = JSON.parse(localStorage.getItem('userData'))
            this.$store.dispatch('showMsg', {
              msg: '修改成功~',
              timeout: 2000
            })
          } else if (data.status == 403) {
            this.$store.dispatch('showMsg', {
              msg: '你啥都没改呀~',
              timeout: 2000
            })
          } else {
            this.$store.dispatch('showMsg', {
              msg: data.data.msg,
              timeout: 2000
            })
          }
        }).catch(e => {
          console.log(e)
          this.$store.dispatch('networkErr')
        })
      }
    }
  }
  //  如果没有保存的话，头像变了，怎么办，刷新一下？
  // 如果修改成功，还要 localStorage.setItem('userData', JSON.stringify(this.userData))

</script>
