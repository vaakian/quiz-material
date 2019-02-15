import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mainUrl: '/api/',
    // mainUrl: 'https://pepe.store/api/',
    // mainUrl: '//10.10.10.143/api/',
    questions: [{
      title: 'loading……',
      A: '数据加载中……',
      B: '数据加载中……',
      C: '数据加载中……',
      D: '数据加载中……',
    }],
    questionOptions: {
      count: 10,
      isfav: 0,
      cg: 0
    },
    userData: {
      username: '',
      pwd: '',
      token: '',
      id: '',
      time: '',
      slogan: '',
      qq: '',
      //   avatar: `http://q1.qlogo.cn/g?b=qq&nk=${this.qq}&s=640`
    },
    optionStyles: {
      A: '',
      B: '',
      C: '',
      D: ''
    },
    examData: {
      second: 0,
      fmtSec: '',
      timer: 0
    },
    theme: {
      tone: ''
    },
    favMsg: '',
    favWatchVar: false, //实在是没办法了
    usrAnswers: [],
    hideGroupLink: false,
    generateScore: false,
    token: '',
    drawer: false,
    tbTitle: '应知刷题',
    showLoading: false,
    showScore: false,
    showNote: false,
    showPublicNotes: false,
    showAnswerBtn: false,
    noteText: '',
    noteID: NaN,
    allNotes: [],
    qIndex: 0,
    msg: {
      text: 'undefined!',
      show: false,
      timeout: 500
    }
  },
  mutations: {
    turnDrawer(state, value) {
      state.drawer = value
    },
    setTbTitle(state, title) {
      state.tbTitle = title
    }
    // SetUsername(state, username) {
    //     state.username = username;
    // }, context.cmmit('SetUsername', 'admin')
  },
  getters: {},
  actions: {
    networkErr(context) {
      console.log('networ error.')
      context.dispatch('showMsg', {
        msg: '您的网络似乎有些问题？',
        timeout: 6000
      })
      setTimeout(() => (context.state.showLoading = false), 300)
    },
    clOption(context) {
      context.state.optionStyles.A = ''
      context.state.optionStyles.B = ''
      context.state.optionStyles.C = ''
      context.state.optionStyles.D = ''
    },
    showMsg(context, {
      msg,
      timeout
    }) {
      context.state.msg['text'] = msg
      context.state.msg['timeout'] = timeout
      context.state.msg['show'] = true
    },
    qIndexInc(context) {
      context.state.qIndex++
    },
    qIndexDec(context) {
      context.state.qIndex--
    },
    randQuestion(context) {
      context.state.optionStyles = {
        A: '',
        B: '',
        C: '',
        D: ''
      } // 清空按钮样式
      context.state.usrAnswers = [] //清空用户答案
      const request_url = context.state.mainUrl + 'randQuestion' 
      let questionOptions = Object.assign({}, context.state.questionOptions)
      let isfav = context.state.questionOptions.isfav
      let usr = context.state.userData.username
      let token = context.state.userData.token
      questionOptions['usr'] = usr
      questionOptions['token'] = token
      console.log(isfav)
      if(isfav==0 && usr && token) { // 如果用户登录了，且不是抽收藏模式，那么isfav=2，屏蔽模式
        questionOptions['isfav'] = '2'
      }
      context.state.showLoading = true // 显示加载状态
      axios.get(request_url, {
        params: questionOptions
      }).then(function (rsp) {
        if (rsp.data.status = 200) {
          // setTimeout(() => (context.state.showLoading = false), 300)
          context.state.showLoading = false
          var questions = rsp.data['data']

          clearInterval(context.state.examData.timer) //关闭interval
          if (context.state.showAnswerBtn) {
            context.state.examData.second = 0 // 时间置0
            
            console.log('考試模式計時開始')
            context.state.examData.timer = setInterval(() => {
              ++context.state.examData.second
              // console.log(context.state.examData.second)
            }, 1000)
          }
          if (!questions.length) {
            context.dispatch('showMsg', {
              msg: '一题都没抽到唉，这类题你还没收藏过吧?重新设置一下吧~',
              timeout: 4000
            })
            context.state.questions = [{
              'title': '没抽到啊老铁，重新设置一下再抽题吧~',
              'A': '群',
              'B': '主',
              'C': '最',
              'D': '帅',
              'answer': 'shit'
            }]
            return;
          }
          context.state.questions = rsp.data['data'] // 获取成功更新questions
          context.state.qIndex = 0 //返回到第一题
          context.state.questionOptions.count = rsp.data['data'].length //可能获取不到那么多题，安全

        }
        // 关闭加载
      }).catch(function (e) {
        console.log('network error.')
        context.dispatch('networkErr')
        context.state.showLoading = false
      })
    },
    addNote(context, id) {
      var request_url = context.state.mainUrl + 'addnote'
      axios.get(request_url, {
        params: {
          id: id,
          usr: context.state.userData.username,
          token: context.state.userData.token,
          note: context.state.noteText
        }
      }).then((rsp) => {
        var status = rsp.data.status
        var msg = 'ok，便签已保存~'
        if (status != 200) {
          msg = rsp.data.data.msg
        }
        context.dispatch('showMsg', {
          msg: msg,
          timeout: 3000
        })
      }).catch((e) => {
        context.dispatch('networkErr')
      })
    },
    addFav(context, id) {
      context.state.favMsg = ''
      if (!context.state.userData.username) {
        context.state.favMsg = '未登录，请注册或登录后使用收藏功能~'
        context.dispatch('showMsg', {
          msg: '未登录，请注册或登录后使用收藏功能~',
          timeout: 4000
        })
        return;
      }
      const request_url = context.state.mainUrl + 'user/addfav'
      axios.get(request_url, {
        params: {
          usr: context.state.userData.username,
          token: context.state.userData.token,
          id: id
        }
      }).then((rsp) => {
        context.state.favMsg = true
        let status = rsp.data['status']
        var msg = '收藏成功~'
        if (status == 200) {

        } else {
          msg = '已经收藏过啦~'
        }
        // context.dispatch('showMsg',{msg: msg, timeout: 700})
        context.state.favMsg = msg
      })
    },
    rmFav(context, id) {
      var request_url = context.state.mainUrl + 'user/rmfav'
      axios.get(request_url, {
        params: {
          usr: context.state.userData.username,
          token: context.state.userData.token,
          id: id
        }
      }).then((rsp) => {
        //   删除成功后提示
        if (rsp.data.status == 200) {
          context.dispatch('showMsg', {
            msg: '已删除收藏~',
            timeout: 1000
          })
          context.state.favWatchVar = !context.state.favWatchVar
        } else
          context.dispatch('showMsg', {
            msg: 'server error.',
            timeout: 1000
          })
      }).catch((e) => {
        context.dispatch('networkErr')
      })
    },
    addblock(context, id) {
      context.state.favMsg = ''
      var request_url = context.state.mainUrl + 'user/addblock'
      axios.get(request_url, {
        params: {
          id: id,
          usr: context.state.userData.username,
          token: context.state.userData.token
        }
      }).then(rsp => {
        // http 200的时候
        if (rsp.data.status == 200)
          context.state.favMsg = '好的我再也不会出现了~'
        else
        context.state.favMsg = '不要重复屏蔽哦'
      }).catch(e => {
        // 出现错误的时候
        context.state.favMsg = '网络错误'
        context.dispatch('networkErr')
      })
    },
    isLogged(context) {
      if (context.state.userData.username) {
        setTimeout(() => {
          this.$router.replace('/')
        }, 1500)
      }
    },
    usrLogin(context) { // 每次登陆刷新一下用户信息
      var request_url = context.state.mainUrl + 'user/login'
      var userData = context.state.userData
      if (!userData.username) return;
      axios.get(request_url, {
        params: {
          usr: userData.username,
          pwd: userData.password
        }
      }).then((rsp) => {
        if (rsp.data['status'] == 200) {
          var userData = rsp.data['data']
          context.state.userData = userData
          localStorage.setItem('userData', JSON.stringify(userData))
        }
      })
    },
    getNotes(context, {
      id,
      usr
    }) { // 获取所有notes
      context.state.showLoading = true
      context.state.noteText = 'loading your note...'
      var request_url = context.state.mainUrl + 'getnotes'
      // http://localhost/api/getnotes?id=185&usr=admin
      axios.get(request_url, {
        params: {
          id: id,
          usr: usr
        }
      }).then((rsp) => {
        if (rsp.data.status == 200 && rsp.data.data.notes.length) {
          var notes = rsp.data.data.notes
          context.state.allNotes = notes // 所有notes
          context.state.noteText = notes[0].note //第一个是用户note
        } else {
          context.state.noteText = ''
        }
        setTimeout(() => (context.state.showLoading = false), 300)
      }).catch((e) => {
        console.log(e)
        context.state.noteText = ''
        context.dispatch('networkErr')
      })
    },
    noteEdit(context, {
      id,
      usr
    }) {
      if (!context.state.userData.username || !context.state.userData.token) {
        context.dispatch('showMsg', {
          msg: '你还没登录呢，请登录或注册后使用“便签”功能~',
          timeout: 3000
        })
        return;
      }
      context.state.noteID = id
      context.dispatch('getNotes', {
        id,
        usr
      })
      context.state.showNote = true
    }
  }
})
