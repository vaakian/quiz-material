<template>

  <v-layout justify-center>
    <v-flex xs12>
      <v-container fluid grid-list-md>
        <v-card class="mx-auto" :color="theme.tone" dark>

          <v-card-title>
            <v-icon large left>
              perm_identity
            </v-icon>
            <span class="title font-weight-light">{{ userData.username }}</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-avatar :tile="false" :size="100" color="grey lighten-4">
                <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${userData.qq}&s=640`" alt="">
              </v-avatar>
              <v-spacer></v-spacer>
          </v-card-actions>
          <v-layout justify-center align-center row wrap>
            
            <v-flex xs10>
              <span>口号(将会显示在做题页面底端)</span>
            </v-flex>
            <v-flex xs10>
              <v-textarea light solo label="口号" v-model="profile.slogan" auto-grow>

              </v-textarea>
            </v-flex>
            <v-flex xs10>
              <span>QQ号(头像源)</span>
            </v-flex>
            <v-flex xs10>
              <v-text-field light solo label="QQ号" v-model="profile.qq">

              </v-text-field>
            </v-flex>
            
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn round large :color="theme.tone + ' lighten-1'" @click="setProfile" dark>save</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-actions>
            
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img class="elevation-6" :src="`http://q1.qlogo.cn/g?b=qq&nk=${userData.qq}&s=640`"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ userData.username }}</v-list-tile-title>
              </v-list-tile-content>
              
              <v-layout align-center justify-end>
                <v-icon class="mr-1">turned_in_not</v-icon>
                <span class="subheading mr-2">{{ fmtDate(userData.time) }}</span>
                <span class="mr-1">·</span>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-container>
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
      this.$store.dispatch('usrLogin')
      setTimeout(() => {
        this.profile.qq = this.userData.qq
        this.profile.slogan = this.userData.slogan
      }, 300)

    },
    methods: {
      fmtDate(unixtimestamp) {
        var unixtimestamp = new Date(unixtimestamp * 1000);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2,
            date.length)
      },
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
