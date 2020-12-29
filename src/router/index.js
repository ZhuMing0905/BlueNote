import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    redirect:'/home',
    children:[
      {
        path:'/home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        redirect:'/home/list',
        meta: {
          active:0
        },
        children:[
          {
            path:'/home/list',
            name:'NoteList',
            component: () => import('../views/Home/NoteList.vue'),
            meta: {
              active:0
            }
          },
          {
            path:'/home/article',
            name:'Article',
            component: () => import('../views/Home/NoteArticle.vue'),
            meta: {
              active:0
            }
          }
        ]
      },
      {
        path:'/note',
        name:'Note',
        component: () => import('../views/Add/AddNote.vue'),
        meta: {
          active:1
        }  
      },      
      {
        path:'/search',
        name:'Search',
        component: () => import('../views/Search/Search.vue'),
        meta: {
          active:2
        }
      },
      {
        path:'/about',
        name:'About',
        component: () => import('../views/About/About.vue'),
        redirect:'/about/home',
        meta: {
          active:3
        },
        children:[
          {
            path:'/about/home',
            name:'AboutHome',
            component: () => import('../views/About/Home.vue'),
            meta: {
              active:3,
              title: "个人中心",
              leftArrowShow: false
            }
          },
          {
            path:'/about/avatar',
            name:'Avatar',
            component: () => import('../views/About/Avatar.vue'),
            meta: {
              active:3,
              title: "修改头像",
              leftArrowShow: true
            }
          }
        ]
      }
      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  routes
});

export default router;
