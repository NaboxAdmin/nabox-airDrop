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
