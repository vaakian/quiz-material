import Vue from 'vue'
import Router from 'vue-router'
import _Index from '@/components/index'
import Vuetify from 'vuetify'
import Search from '@/components/search'
import Login from '@/components/login'
import Reg from '@/components/reg'
import Fav from '@/components/fav'
import Theme from '@/components/theme'
import Profile from '@/components/profile'
import About from '@/components/about'
import Contribution from '@/components/contribution'
import Chart from '@/components/chart'
import Info from '@/components/info'
import ExamDate from '@/components/examDate'
// 按需加载
// const Search = resolve => require(['@/components/search'], resolve)
// const Login = resolve => require(['@/components/login'], resolve)
// const Reg = resolve => require([ '@/components/reg'], resolve)
// const Fav = resolve => require([ '@/components/fav'], resolve)
// const Theme = resolve => require([ '@/components/theme'], resolve)
// const Profile = resolve => require([ '@/components/profile'], resolve)
// const About = resolve => require([ '@/components/about'], resolve)
// const Contribution = resolve => require([ '@/components/contribution'], resolve)
// const Chart = resolve => require([ '@/components/chart'], resolve)
// const Info = resolve => require([ '@/components/info'], resolve)
// const ExamDate = resolve => require([ '@/components/examDate'], resolve)
Vue.use(Vuetify)

// import 'vuetify/dist/vuetify.min.css'
Vue.use(Router)
var building = {
  template: "<div class='flex display-1 font-weight-light'>过完年再搞这个功能，你先到别处看看吧。</div>"
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: _Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/rank',
      name: 'rank',
      component: building
    },
    {
      path: '/theme',
      name: 'theme',
      component: Theme
    },
    {
      path: '/user/chart',
      name: '图表',
      component: Chart
    },
    {
      path: '/user/fav',
      name: '收藏',
      component: Fav
    },
    {
      path: '/user/profile',
      name: '资料',
      component: Profile
    },
    {
      path: '/user/custom',
      name: '上传',
      component: building
    },
    {
      path: '/contribution',
      name: '捐赠',
      component: Contribution
    },
    {
      path: '/about',
      name: '关于',
      component: About
    },
    {
      path: '/examDate',
      name: '日历',
      component: ExamDate
    }
  ]
})
