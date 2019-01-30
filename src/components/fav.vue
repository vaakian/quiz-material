<template>
  <div id="fav">
    <v-expansion-panel v-if="questions.length">
      <v-expansion-panel-content v-for="(item, i) in questions" :key="i">
        <div slot="header">
          <span v-html="((page-1)*15+i+1)+'.'+item.title"></span>
        </div>
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
                  <td class="text-xs-center">[<strong>{{fmtDate(item.time) }}</strong>]</td>
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
              <!-- 收藏按钮 -->
              <v-tooltip right>
                <v-btn flat icon slot="activator" :color="$store.state.theme.tone" @click="$store.dispatch('rmFav', item.ID)">
                  <v-icon>delete_outline</v-icon>
                </v-btn>
                <span>取消收藏</span>
              </v-tooltip>
              <!-- 收藏按钮 -->
              <!-- 便签按钮 -->
              <v-tooltip right>
                <v-btn flat icon slot="activator" :color="$store.state.theme.tone" @click="$store.dispatch('noteEdit', {id: item.ID, usr: $store.state.userData.username})">
                  <v-icon>edit</v-icon>
                </v-btn>
                <span>便签</span>
              </v-tooltip>
              <!-- 便签按钮 -->
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-alert type="error" :value="true" v-else>
      还没有收藏任何题目呢~
    </v-alert>
    <!-- 分页 -->
    <v-layout justify-center>
      <v-pagination style="position: fixed; bottom: 0; background: white;" :color="$store.state.theme.tone" v-show="length>1"
        v-model="page" :length="length" :total-visible="7" :refresh="favRf" fixed></v-pagination>
    </v-layout>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        questions: [],
        page: 1,
        length: 0,
        cg: 0
      }
    },
    computed: {
      favRf() {
        var p = this.page
        this.updateQuestion()
        return false
      }
    },
    activated() {
      this.updateQuestion()
      this.$store.state.tbTitle = '我的收藏'
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
            date.length) +
          " " + hour.substring(hour.length - 2, hour.length) + ":" +
          minute.substring(minute.length - 2, minute.length) + ":" +
          second.substring(second.length - 2, second.length);
      },
      updateQuestion() {
        this.$store.state.showLoading = true
        var request_url = this.$store.state.mainUrl + 'user/listfav'
        this.axios.get(request_url, {
          params: {
            usr: this.$store.state.userData.username,
            token: this.$store.state.userData.token,
            cg: this.cg,
            page: this.page
          }
        }).then((rsp) => {
          this.$store.state.showLoading = false
          if (rsp.data.status == 200) {
            var _length = parseInt(rsp.data.data.row_count / 15)
            _length = rsp.data.data.row_count % 15 ? _length + 1 : _length
            this.length = parseInt(_length.toFixed())
            this.questions = rsp.data.data.result
            // console.log(this.questions)
          } else {
            this.$store.dispatch('showMsg', {
              msg: 'server error,please contact to admin.',
              timeout: 3000
            })
          }
        }).catch((e) => {
          this.$store.dispatch('showMsg', {
            msg: '您的网络似乎有些问题……',
            timeout: 3000
          })
          console.log(e)
        })
      }
    }
  }

</script>
