import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/users',
          component: resolve => require(['../components/page/Users.vue'], resolve),
          meta: { title: '用户列表' }
        },
        {
          path: '/channel',
          component: resolve => require(['../components/page/Channel.vue'], resolve),
          meta: { title: '渠道配置' }
        },
        {
          path: '/examine',
          component: resolve => require(['../components/page/Examine.vue'], resolve),
          meta: { title: '用户兑换列表' }
        },
        {
          path: '/channeladclick',
          component: resolve => require(['../components/page/Channeladclick.vue'], resolve),
          meta: { title: '渠道点击广告数据' }
        },
        {
          path: '/clickaddata',
          component: resolve => require(['../components/page/Clickaddata.vue'], resolve),
          meta: { title: '点击广告列表' }
        },
        {
          path: '/loadaddata',
          component: resolve => require(['../components/page/Loadaddata.vue'], resolve),
          meta: { title: '加载广告列表' }
        },
        {
          path: '/daycoins',
          component: resolve => require(['../components/page/DayCoins.vue'], resolve),
          meta: { title: '每日金币消耗' }
        },
        {
          path: '/table',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve),
          meta: { title: '单页推广配置' }
        },
        {
          path: '/index',
          component: resolve => require(['../components/page/Index.vue'], resolve),
          meta: { title: '首页' }
        },
        {
          path: '/kaming',
          component: resolve => require(['../components/page/Kaming.vue'], resolve),
          meta: { title: 'kaming' }
        },
        {
          path: '/miniappad',
          component: resolve => require(['../components/page/MiniappAd.vue'], resolve),
          meta: { title: '首页miniapp配置' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue')
    // }
  ]
})
