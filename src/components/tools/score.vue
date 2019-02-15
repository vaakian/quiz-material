<template>
  <v-layout row justify-center align-center>
    <v-dialog style="background: white" v-model="$store.state.showScore" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card v-if="$store.state.generateScore" id="score">
        <v-tabs v-model="active" :color="$store.state.theme.tone" dark slider-color="white">
          <v-btn icon dark @click="$store.state.generateScore = false;$store.state.showScore = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-tab ripple>成绩</v-tab>
          <v-tab-item>
            <v-alert :value="true" type="success" class="display-1" v-show="score['right_count'] == $store.state.questions.length">
              恭喜你全部答对啦！
            </v-alert>
            <v-chip v-if="$store.state.showAnswerBtn" class="mx-2" large :color="$store.state.theme.tone" text-color="white">
              <v-icon left>account_circle</v-icon>
              {{ $store.state.examData.fmtSec }}
            </v-chip>
            <v-card class="mx" style="margin: 10px;">
              <v-toolbar card dense>
                <v-toolbar-title>
                  <span class="subheading">得分</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <p class="flex display-1 font-weight-bold"><span style="color: green;">{{ score['score'] }}</span> /
                  100.00</p>
              </v-card-text>
            </v-card>

            <v-card class="mx" style="margin: 10px;">
              <v-toolbar card dense>
                <v-toolbar-title>
                  <span class="subheading">做对</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <p class="flex display-1 font-weight-bold"><span style="color: green;">{{ score['right_count'] }}</span>
                  / {{ $store.state.questions.length }}</p>

              </v-card-text>

            </v-card>

            <v-alert :value="true" type="info" class="mx-2" :color="$store.state.theme.tone" outline>
              点击左上角关闭“×”可回到做题现场不会清除数据，右上角“继续做题”则会重新抽题。

            </v-alert>
          </v-tab-item>

          <v-tab ripple>错题</v-tab>
          <v-tab-item v-if="score['right_count'] != $store.state.questions.length">

            <!-- 写错题 -->
            <v-expansion-panel v-if="$store.state.usrAnswers.length">
              <v-expansion-panel-content v-for="(item, i) in $store.state.questions" :key="i" v-show="$store.state.usrAnswers[i] != item.answer">
                <div slot="header">
                  <span v-html="(i+1)+'.'+item.title"></span>
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
                          <td class="text-xs-center">分类[<strong>{{ item.category }}</strong>]</td>
                        </tr>
                        <tr>
                          <td class="text-xs-center">我的[<span class="font-weight-bold" style="color: red">{{
                              $store.state.usrAnswers[i] ? $store.state.usrAnswers[i]:'未选' }}</span>]</td>
                          <td class="text-xs-center">难度[<span class="font-weight-bold">{{ item.hard }}</span>]</td>
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
                        <v-btn fab flat icon small slot="activator" :color="$store.state.theme.tone" @click="$store.dispatch('addFav', item.ID)">
                          <v-icon>favorite</v-icon>
                        </v-btn>
                        <span>{{ $store.state.favMsg ? $store.state.favMsg: '收藏' }}</span>
                      </v-tooltip>
<!-- 便签 -->
                      <v-tooltip top>
                        <v-btn fab flat icon small  slot="activator" @click="$store.dispatch('noteEdit', {id: item.ID, usr: $store.state.userData.username})"
                          :color="$store.state.theme.tone">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <span>便签</span>
                      </v-tooltip>


                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-tab-item>
          <v-tab-item v-else>
            <v-alert :value="true" type="success" class="display-1">
              恭喜你全部答对啦！
            </v-alert>
          </v-tab-item>
          <v-spacer></v-spacer>
          <v-btn dark flat @click="$store.state.generateScore = false;$store.state.showScore = false;$store.dispatch('randQuestion');">继续做题</v-btn>
        </v-tabs>
      </v-card>

    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    data() {
      return {
        active: 0,
      }
    },
    computed: {
      score() {
        var usrAnswers = this.$store.state.usrAnswers
        var questions = this.$store.state.questions

        if (usrAnswers) {
          var _score = 0
          for (var i = 0; i < usrAnswers.length; i++) {
            if (usrAnswers[i] == questions[i].answer)
              ++_score
          }
        }
        var data = {
          score: (_score / questions.length * 100).toFixed(2),
          right_count: _score
        }
        return data
      }
    },
    methods: {

    }
  }
</script>
