<template>
  <v-app id="app">
    <loading />
    <msg />
    <navigation />
    <note />
    <v-toolbar dark :color="$store.state.theme.tone + ' darken-1'" fixed dense>
      <v-toolbar-side-icon @click="$store.commit('turnDrawer', true)"></v-toolbar-side-icon>
      <v-list-tile class="white--text" to="/">
        <v-icon>home</v-icon>
      </v-list-tile>

      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">{{ $store.state.tbTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon to="/search">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click="$store.dispatch('randQuestion')">
        <v-icon>cached</v-icon>
      </v-btn>
      <v-menu bottom left>
        <v-btn slot="activator" dark icon>
          <v-icon>more_vert</v-icon>
        </v-btn>

        <v-list v-if="$store.state.userData.username || $store.state.userData.token">
          <v-list-tile to="/user/chart">
            <v-list-tile-title>统计图</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/user/fav">
            <v-list-tile-title>我的收藏</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/user/profile">
            <v-list-tile-title>个人资料</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/user/custom">
            <v-list-tile-title>上传题目</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>注销</v-list-tile-title>
          </v-list-tile>

        </v-list>

        <v-list v-else>
          <v-list-tile to="/login">
            <v-list-tile-title>登录</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/reg">
            <v-list-tile-title>注册</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>


    </v-toolbar>

    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>


  </v-app>
</template>

<script>
  import Navigation from '@/components/tools/navigation'
  import Loading from '@/components/tools/loading'
  import Msg from '@/components/tools/msg'
  import Note from '@/components/tools/note'
  export default {
    name: 'App',
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    components: {
      Navigation,
      Loading,
      Msg,
      Note
    },
    created() {
      var tone = localStorage.getItem('tone')
      if (!tone || tone == 'null') {
        tone = 'primary theme--dark'

      }
      this.$store.state.theme.tone = tone
      this.$store.state.hideGroupLink = eval(localStorage.getItem('hideGroupLink'))
      console.log(this.$store.state.hideGroupLink)
      var userData = localStorage.getItem('userData') // 从本地查找用户
      if (userData) {
        this.$store.state.userData = JSON.parse(userData)
      }
    },
    methods: {
      logout() {
        localStorage.clear()
        location.reload()
      }
    },
    watch: {
      '$route'(to, from) {
        var arr = [
          '/',
          '/search',
          '/info',
          '/rank',
          '/theme',
          '/user/chart',
          '/user/fav',
          '/user/profile',
          '/user/custom',
          '/contribution',
          '/about'

        ]
        var compare = arr.indexOf(to.path) > arr.indexOf(from.path);
        this.transitionName = compare ? 'slide-right' : 'slide-left'
      }
    }
  }

</script>

<style>
  /* .primary--text {
  color: #666 !important;
  caret-color: #666 !important;
} */


  .child-view {
    position: absolute;
    width: 100%;
    transition: all .3s;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(0, -100%);
    transform: translate(0, -100%);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(0, 100%);
    transform: translate(0, 100%);
  }

  .application--wrap {
    height: auto;
    padding-top: 48px;
  }

  table tr:nth-child(1) td,
  table tr:nth-child(2) td {
    border: 1px solid rgb(178, 209, 247);
  }

  #app {
    font-size: 16px;
    /* padding-top: 48px; */
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 48px; */
  }

</style>
