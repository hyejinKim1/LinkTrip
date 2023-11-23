import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/HomeView.vue"
import UserLogin from "../components/user/UserLogin.vue"
import MyPage from "../components/user/MyPage.vue"

import { useMemberStore } from "@/stores/member";

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
    {
      path: '/likearticle',
      name: 'likearticle',
      component: () => import('../components/community/LikeArticle.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/components/community/CommunityView.vue')
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('../views/RecommendView.vue')
    },
    {
      path: '/myArticle',
      name: 'myArticle',
      component: () => import('@/components/community/myArticle.vue')
    },
    {
      path: '/community/detailArticle/:articleIdx',
      name: 'detailArticle',
      component: () => import('@/components/community/detailArticle.vue')
    },
    {
      path: '/community/modifyArticle/:articleIdx',
      name: 'modifyArticle',
      component: () => import('@/components/community/articleModify.vue')
    },
    {
      path: '/createArticle/:planIdx',
      name: 'createArticle',
      component: () => import('@/components/community/createArticle.vue'),
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

export default router;

router.beforeEach((to, from, next) => { // 페이지를 이동하기 전에 호출되는 함수
  const memberStore = useMemberStore();
  if (to.fullPath !== "/" && to.fullPath !== "/login" && !memberStore.isLogin) {
    // /login으로 가고 있지 않고 로그인되어 있지 않으면 /login으로 redirect
    // 로그인하지 않은 상태에서 /를 요청하는 경우 (프로젝트가 처음 실행될 때)
    next("/login");
  } else if (to.fullPath == "/login" && memberStore.isLogin) {
    // /login으로 가고 있고 로그인되어 있으면 /으로 redirect
    // 로그인한 상태에서 /login을 요청하는 경우
    next("/");
  } else {
    next();
  }
});

