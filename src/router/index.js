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

Vue.use(Vuetify)

// import 'vuetify/dist/vuetify.min.css'
Vue.use(Router)
var building = {
  template: "<div class='flex display-1 font-weight-light'>Sorry,This page hasn't been built yet.</div>"
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
      component: building
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
      component: building
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
      component: building
    },
    {
      path: '/about',
      name: '关于',
      component: building
    }
  ]
})
