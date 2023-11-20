import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/HomeView.vue"
import UserLogin from "../components/user/UserLogin.vue"
import MyPage from "../components/user/MyPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: UserLogin
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: MyPage
    },
    {
      path: '/myplan',
      name: 'myplan',
      component: () => import('../components/plan/MyPlan.vue')
    },
    {
      path: '/detailPlan/:planIdx',
      name: 'detailPlan',
      component: () => import('../components/plan/UpdatePlan.vue'),
      props: true
    },
    {
      path: '/makeplan',
      name: 'makeplan',
      component: () => import('../components/plan/MakePlan.vue')
    },
    {
      path: '/savedplan',
      name: 'savedplan',
      component: () => import('../components/plan/SavedPlan.vue')
    },
    // {
    //   path: '/updateplan/:planIdx',
    //   name: 'updateplan',
    //   component: () => import('../components/plan/UpdatePlan.vue'),
    //   props: true
    // },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityView.vue')
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('../views/RecommendView.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
  ]
})

export default router
