<template>
  <div class="hello">

    <div id="options" @keyup.left="qLast" @keyup.enter="qNext">
      <v-progress-linear :color="theme.tone" v-model="quizProgress"></v-progress-linear>
      <div v-if="showAnswerBtn" style="position: absolute; top: 0;left:0; right: 0;text-align:center">
        <v-chip :color="theme.tone" text-color="white">
          {{ $store.state.examData.fmtSec }}
        </v-chip>
      </div>
      <h4>
        <!-- 题号图标 + 收藏 -->
        <v-tooltip top>
          <v-btn outline icon small flat :color="theme.tone" slot="activator" @click="addFav(questions[qIndex]['ID'])">
            {{ (qIndex+1) }}
          </v-btn>
          <span>{{ $store.state.favMsg }}</span>
        </v-tooltip>
        <!-- 题号图标 + 收藏 -->
        {{ questions[qIndex].title }}
      </h4>
      
      <p class="caption mx-5" style="color: #666" v-show="questionOptions.isfav">{{ fmtDate(questions[qIndex].time) }}</p>
      <v-btn depressed block class="opt-btn" :color="optionStyles.A" @click="optJudge('A')">{{ questions[qIndex].A }}</v-btn>
      <v-btn depressed block class="opt-btn" :color="optionStyles.B" @click="optJudge('B')">{{ questions[qIndex].B }}</v-btn>
      <v-btn depressed block class="opt-btn" :color="optionStyles.C" @click="optJudge('C')">{{ questions[qIndex].C }}</v-btn>
      <v-btn depressed block class="opt-btn" :color="optionStyles.D" @click="optJudge('D')">{{ questions[qIndex].D }}</v-btn>
      <!-- <v-layout align-center justify-center>
        <v-btn flat class="opt-btn" v-show="!$store.state.hideGroupLink">
          <a style="text-decoration: none;" href="https://jq.qq.com/?_wv=1027&amp;k=5iQT2Hb" target="view_window">点我加入群聊<br>【计算机技能高考】952346968</a>
        </v-btn>
      </v-layout> -->
      <div id="option-btns" >
        <!-- 收藏按钮 -->
        <v-layout align-center justify-center>
          <v-tooltip v-show="!questionOptions.isfav" top>
            <v-btn fab small flat slot="activator" :color="theme.tone" @click="addFav(questions[qIndex]['ID'])">
              <v-icon>favorite</v-icon>
            </v-btn>
            <span>{{ $store.state.favMsg ? $store.state.favMsg: '收藏' }}</span>
          </v-tooltip>
          <!-- 添加笔记按钮 -->
          <v-tooltip top>
            <v-btn fab small flat slot="activator" @click="$store.dispatch('noteEdit', {id: questions[qIndex]['ID'], usr: userData.username})"
              :color="$store.state.theme.tone">
              <v-icon>edit</v-icon>
            </v-btn>
            <span>便签</span>
          </v-tooltip>
          <!-- 屏蔽q按钮 -->
          <v-tooltip top>
            <v-btn fab small flat slot="activator" @click="$store.dispatch('addblock', questions[qIndex]['ID'])" :color="$store.state.theme.tone">
              <v-icon>block</v-icon>
            </v-btn>
            <span>{{ $store.state.favMsg ? $store.state.favMsg: '屏蔽这题' }}</span>
          </v-tooltip>
          <!-- <PublicNotes /> -->

        </v-layout>
        <!-- 收藏按钮结束 -->
        <div class="switch-btn">
          <v-btn rised large dark :color="theme.tone" @click="qLast">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-btn rised large dark :color="theme.tone" @click="qNext">
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </div>
        <v-btn rised block dark :color="theme.tone" @click="showAnswer" v-show="!$store.state.showAnswerBtn">显示答案</v-btn>
        <!-- 组件区域 -->
        <qSetting />
        <score />

        <!-- 口号区域 -->
        <v-layout justify-center>
          <span v-show="userData.slogan" class="title font-weight-regular">
            {{ userData.slogan }}</span>
        </v-layout>

        <!-- 测试结束 -->
        <v-dialog v-model="doneDilog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              测试结束
            </v-card-title>

            <v-card-text>
              本次测试已结束，查看成绩or继续做题？
              <p class="caption font-weight-light">
                <v-icon>info</v-icon>
                点击对话框以外的地方可关闭对话框
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn :color="theme.tone" flat @click="showScore()">
                查看成绩
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :color="theme.tone" flat @click="randQuestion();doneDilog = false">
                继续做题
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>

        <!-- 测试结束 -->
        <!-- 公告 -->
        
        <!-- <v-dialog v-model="msg.dilog" width="500" height="600">
          <v-card>
        <v-card-title class="headline">新消息</v-card-title>

        <v-card-text>
          <p v-html="msg.content" v-if="msg.dilog">
         </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="msg.dilog = false"
          >
            ignore
          </v-btn>
        </v-card-actions>
      </v-card>
         
        </v-dialog> -->
      </div>

    </div>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    mapActions
  } from 'vuex'
  import Score from '@/components/tools/score'
  import QSetting from '@/components/tools/qSetting'
  // import PublicNotes from '@/components/tools/publicNotes'
  import {
    setTimeout, setInterval
  } from 'timers';
  export default {
    components: {
      QSetting,
      Score
      // PublicNotes
    },
    name: 'index',
    data() {
      return {
        doneDilog: false,
        // msg: {
        //   dilog: false,
        //   content: ``
        // }
      }
    },
    activated() {
      this.$store.state.tbTitle = '考试'
    },
    watch: {
      "$store.state.examData.second": function(to, from) {
        var secondTime = parseInt(this.$store.state.examData.second);
          var minuteTime = 0;
          var hourTime = 0; 
          if (secondTime > 60) {
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            if (minuteTime > 60) {
              hourTime = parseInt(minuteTime / 60);
              minuteTime = parseInt(minuteTime % 60);
            }
          }
          var result = ""
            result = parseInt(hourTime) + "小时" + parseInt(minuteTime) + "分" +parseInt(secondTime) + "秒";
        this.$store.state.examData.fmtSec = result
      }
    },

    created() {
      let url = this.$store.state.mainUrl
      this.axios.get(url + 'version', {
        params: {
          version: 2.1
        }
      }).then(rsp => {
        let data = rsp.data
        if(data.status == 301) {
          this.msg.dilog = true
          this.msg.content = data.html
        }
      })
    },
    mounted() {
      this.$store.commit('turnDrawer', false)
      if (this.$store.state.questions.length <= 1)
        this.randQuestion()
    },
    computed: {
      ...mapState([
        'userData',
        'mainUrl',
        'questions',
        'questionOptions',
        'qIndex',
        'showAnswerBtn',
        'optionStyles',
        'theme'

      ]),
      quizProgress() {
        return (this.qIndex + 1) / this.questions.length * 100
      }
    },
    methods: {
      ...mapActions([
        'randQuestion',
        'qIndexInc',
        'qIndexDec',
        'showMsg',
        'addFav',
        'clOption',
        'examData'
      ]),
      showScore() {
        clearInterval(this.$store.state.examData.timer)
        this.$store.state.generateScore = true;
        this.$store.state.showScore = !this.$store.state.showScore
        this.doneDilog = false
      },
      qLast() {
        if (this.qIndex <= 0) {
          // 提示到底了
          this.showMsg({
            msg: '到顶啦！',
            timeout: 1000
          })
          return;
        }
        this.clOption()
        this.qIndexDec()
        this.optJudge(this.$store.state.usrAnswers[this.qIndex])
      },
      qNext() {
        if (this.qIndex >= this.questions.length - 1) {
          this.showMsg({
            msg: '到底啦！',
            timeout: 1000
          })
          return;
        }
        this.clOption()
        this.qIndexInc()
        this.optJudge(this.$store.state.usrAnswers[this.qIndex])
      },
      showAnswer() {
        let answer = this.questions[this.qIndex].answer
        this.$store.state.optionStyles[answer] = this.theme.tone
      },
      optJudge(answer) {
        // console.log(this.$store.state.generateScore)
        this.clOption() //清空颜色
        this.$set(this.$store.state.usrAnswers, this.qIndex, answer) //保存答案
        if (this.qIndex >= this.questions.length - 1) { // 最后一题
          if (this.$store.state.usrAnswers[this.qIndex]) // 有答案
            setTimeout(() => (this.doneDilog = true), 500)
        }
        if (this.showAnswerBtn) { //是考试模式
          this.$store.state.optionStyles[answer] = `light ${this.theme.tone}`
          return;
        }


        // 非考试模式
        let rightAnswer = this.questions[this.qIndex].answer
        if (answer == rightAnswer)
          this.$store.state.optionStyles[answer] = this.theme.tone
        else
          this.$store.state.optionStyles[answer] = 'error'
      },
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
      }
    }
  }

</script>
<style>
  .deep-purple {
    color: whilte;
  }

  .switch-btn {
    display: inline-block;
    /* max-width: 120%; */
    margin: 0 auto;
    white-space:nowrap;
  }
  .switch-btn button {
    /* display: inline-block;
    white-space:nowrap */
  }
  .switch-btn .v-btn {
    width: 135px;
    margin: 0 auto;
  }
  .opt-btn {
    text-transform: none !important;
  }
  #option-btns {
    /* margin: 0 auto; */
    width: 275px;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0px;
  }
</style>
