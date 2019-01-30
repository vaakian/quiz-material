<template>
  <div id="search">
    <v-toolbar style="padding:10px 0" :color="$store.state.theme.tone" dark>
      <v-text-field @keyup.enter="qSearch" v-model="keyword" class="mx-2" flat label="关键词两位最佳~" prepend-inner-icon="search"
        solo-inverted></v-text-field>
      <v-btn :color="$store.state.theme.tone" @click="qSearch" large style="margin-bottom: 12px;">搜索</v-btn>
    </v-toolbar>
    <v-expansion-panel v-if="result.length">
      <v-expansion-panel-content v-for="(item, i) in result" :key="i">
        <div slot="header" v-html="(i+1)+'.'+item.titleFixed"></div>
        <v-card>
          <v-card-text class="centered">
            <v-layout align-center justify-center>
              <table class="v-datatable v-table theme--light">
                <tr>
                  <td class="text-xs-center" v-html="item.A"></td>
                  <td class="text-xs-center" v-html="item.B"></td>
                </tr>
                <tr>
                  <td class="text-xs-center" v-html="item.C"></td>
                  <td class="text-xs-center" v-html="item.D"></td>
                </tr>
                <tr>
                  <td class="text-xs-center">答案[<strong style="color:green">{{ item.answer }}</strong>]</td>
                  <td class="text-xs-center">分类[<strong>{{ item.category }}</strong>]</td>
                </tr>
              </table>
            </v-layout>
            <v-divider></v-divider>
            <div style="margin-left: 10px;">
              <p v-if="item.ana" style="font-weight: bold; color: green">{{ item.ana }}</p>
              <p v-else>
                解释:<span style="color: #666">万维无解释</span>

              </p>
            </div>
            <v-divider></v-divider>
            <v-layout align-center justify-center>
              <p>
                <a :href="'https://baidu.com/s?wd=' + item.title" target="view_window">Baidu</a> |
                <a :href="'https://cn.bing.com/search?q=' + item.title" target="view_window">Bing</a> |
                <a :href="'https://www.google.com/search?&q=' + item.title" target="view_window">Google</a>
              </p>

              <v-tooltip right>
                <v-btn flat icon slot="activator" :color="$store.state.theme.tone" @click="$store.dispatch('addFav', item.ID)">
                  <v-icon>favorite</v-icon>
                </v-btn>
                <span>{{ $store.state.favMsg ? $store.state.favMsg: '收藏' }}</span>
              </v-tooltip>
              <v-tooltip right>
                <v-btn flat icon slot="activator" :color="$store.state.theme.tone" @click="$store.dispatch('noteEdit', {id: item.ID, usr: $store.state.userData.username})">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>便签</span>
              </v-tooltip>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    
    <v-alert :color="$store.state.theme.tone" v-else :value="true" type="info" outline style="margin: 20px 5px;">
      还没有搜到任何题目~
    </v-alert>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        result: [],
        keyword: ''
      }
    },
    activated() {
      // console.log(this.$store.state.tbTitle)
      // console.log('shit')
      this.$store.state.tbTitle = '搜索'
    },
    computed: {},
    methods: {
      qSearch() {
        if (!this.keyword) {
          this.$store.dispatch('showMsg', {
            msg: '你得输入关键词啊~',
            timeout: 1700
          })
          return;
        }
        var me = this
        var request_url = this.$store.state.mainUrl + 'search'
        this.$store.state.showLoading = true
        this.axios.get(request_url, {
          params: {
            keyword: this.keyword
          }
        }).then((rsp) => {
          //
          this.$store.state.showLoading = false
          let data = rsp.data
          if (!data['data']['row_count']) {
            this.$store.dispatch('showMsg', {
              msg: '未搜索到任何结果，请简化你的关键词再试试~',
              timeout: 1700
            })
            return;
          }
          this.result = data['data']['result']
          this.result.map((item) => {
            item.titleFixed = item.title.replace(this.keyword,
              `<span style="color: red">${this.keyword}</span>`)
            item.A = item.A.replace(this.keyword, `<span style="color: red">${this.keyword}</span>`)
            item.B = item.B.replace(this.keyword, `<span style="color: red">${this.keyword}</span>`)
            item.C = item.C.replace(this.keyword, `<span style="color: red">${this.keyword}</span>`)
            item.D = item.D.replace(this.keyword, `<span style="color: red">${this.keyword}</span>`)
          })
          var msg = `匹配到${data['data']['row_count']}题`
          if (data['data']['row_count'] > 100)
            msg = `匹配到${data['data']['row_count']}题, 考虑性能只显示前100条结果, 请更改你的关键词再试试~`
          this.$store.dispatch('showMsg', {
            msg: msg,
            timeout: 1700
          })
        })
      }
    }

  }

</script>
<style>
  table {
    width: 100%;
  }

  td {
    padding: 5px 0;
  }

</style>
