<template>
  <div>
    <v-navigation-drawer v-model="$store.state.drawer" :mini-variant="mini" :class="$store.state.theme.tone" width="200"
      fixed dark temporary>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <template>
            <v-list-tile-avatar>
              <img v-if="$store.state.userData.qq" :src="`http://q1.qlogo.cn/g?b=qq&nk=${$store.state.userData.qq}&s=640`">
              <img v-else src="http://bpic.588ku.com/element_origin_min_pic/00/90/87/5856f0d166eeffb.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="$store.state.userData.username">{{ $store.state.userData.username }}</v-list-tile-title>
              <v-list-tile-title v-else>未登录</v-list-tile-title>
            </v-list-tile-content>
          </template>
          
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>
      <v-list class="pa-1">

        <v-list-tile to="/login"  v-if="!$store.state.userData.username">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>登录</v-list-tile-title>

            </v-list-tile-content>
          </v-list-tile>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>首页</v-list-tile-title>

          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/search">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>搜索</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to="/info">
          <v-list-tile-action>
            <v-icon>flag</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>高考数据</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to="/examDate">
          <v-list-tile-action>
            <v-icon>timer</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>高考日历</v-list-tile-title>
        </v-list-tile>
<!-- 
        <v-list-tile to="/rank">
          <v-list-tile-action>
            <v-icon>equalizer</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>用户排名</v-list-tile-title>
        </v-list-tile> -->

        <v-list-tile to="/theme">
          <v-list-tile-action>
            <v-icon>color_lens</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>设置主题</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>
        <v-list-group prepend-icon="account_circle" :v-show="$store.state.userData.username">
          <v-list-tile slot="activator">
            <v-list-tile-title>我的</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/user/chart">
            <v-list-tile-title>统计图</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>insert_chart_outlined</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile to="/user/fav">
            <v-list-tile-title>我的收藏</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>favorite_border</v-icon>
            </v-list-tile-action>
          </v-list-tile>


          <v-list-tile to="/user/profile">
            <v-list-tile-title>个人资料</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>face</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile to="/user/custom">
            <v-list-tile-title>上传题目</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>cloud_upload</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-divider></v-divider>


        <v-list-group prepend-icon="fingerprint">
          <v-list-tile slot="activator">
            <v-list-tile-title>其他</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/contribution">
          <v-list-tile-action>
            <v-icon>local_florist</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>打赏</v-list-tile-title>
        </v-list-tile>
        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>关于作者</v-list-tile-title>
        </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mini: false,
        right: false
      }
    }
  }

</script>

