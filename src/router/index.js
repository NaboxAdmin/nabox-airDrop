import Vue from 'vue'
import VueRouter from 'vue-router'
import { BasicLayout, LoginLayout } from "../layout";
Vue.use(VueRouter);

const mainRoutes = [{
    path:'/',
    name:'index',
    redirect: '/index',
    component: BasicLayout,
    meta: {
      keepAlive: true
    },
    children:[
        {
            path:'/index',
            name:'home',
            component:() => import('../views/home'),
            meta: {
                title:'Home'
            }
        },
        {
            path:'/square',
            name:'square',
            component:() => import('../views/square'),
            meta: {
                title:'Square'
            }
        },
        {
            path:'/gift',
            name:'gift',
            component:() => import('../views/giftCard'),
            meta: {
                title:'Gift'
            }
        },
        {
            path:'/createAirdrop',
            name:'createAirdrop',
            component:() => import('../views/createAirdrop'),
            meta: {
                title:'CreateAirdrop'
            }
        },
        {
            path:'/airdropHistory',
            name:'airdropHistory',
            component:() => import('../views/createAirdrop/history'),
            meta: {
                title:'AirdropHistory'
            }
        }
    ]
 }, {
    path:'*',
    redirect: '/404',
}];

const router = new VueRouter({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.BASE_URL,
    routes: [...mainRoutes]
});

export default router;
