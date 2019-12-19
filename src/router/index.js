import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Comm from '../views/Comm'


Vue.use(VueRouter)




const routes = [{
        path: '/home',
        // 重定向
        redirect: '/'
    },
    {
        path: "/",
        component: Comm,
        children: [{
            path: '/',
            name: "home",
            component: Home,
            meta: {
                title: '首页'
            }
        }],
    },
    {
        path: "/details",
        component: Comm,
        children: [{
            path: '/',
            name: "details",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Details.vue'),
            meta: {
                title: '首页'
            }
        }],
    },

    // {
    //     path: '/login',
    //     name: 'login',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/Login.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router