import {createRouter, createWebHashHistory} from "vue-router";
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import About from '~/pages/about.vue'
import GoodList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import CommentList from '~/pages/comment/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import CouponList from '~/pages/coupon/list.vue'

import NotFound from '~/pages/404.vue'
import Admin from "~/layout/admin.vue"

// 默认路由 所有用户都有
const routes = [
    {
        path: '/',
        name: 'admin',
        component: Admin,
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "登录页面"
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: "关于页面"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: {
            title: ""
        }
    },
]
const asyncRoutes = [
    {
        path: "/",
        name: "/",
        component: Index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: "/goods/list",
        name: "/goods/list",
        component: GoodList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: "/category/list",
        name: "/category/list",
        component: CategoryList,
        meta: {
            title: "分类管理"
        }
    },
    {
        path: "/user/list",
        name: "/user/list",
        component: UserList,
        meta: {
            title: "用户管理"
        }
    },
    {
        path: "/order/list",
        name: "/order/list",
        component: OrderList,
        meta: {
            title: "订单管理"
        }
    },
    {
        path: "/comment/list",
        name: "/comment/list",
        component: CommentList,
        meta: {
            title: "评价管理"
        }
    },
    {
        path: "/image/list",
        name: "/image/list",
        component: ImageList,
        meta: {
            title: "图库管理"
        }
    },
    {
        path: "/notice/list",
        name: "/notice/list",
        component: NoticeList,
        meta: {
            title: "公告管理"
        }
    },
    {
        path: "/setting/base",
        name: "/setting/base",
        component: SettingBase,
        meta: {
            title: "配置管理"
        }
    },
    {
        path: "/coupon/list",
        name: "/coupon/list",
        component: CouponList,
        meta: {
            title: "优惠券管理"
        }
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 动态添加路由的方法
export function addRoutes(menus){
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e=>{
            let item = asyncRoutes.find(o=>o.path ==e.frontpath)
            if(item && !router.hasRoute(item.path)){
                router.addRoute("admin", item)
                hasNewRoutes = true
            }
            if(e.child && e.child.length>0){
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    findAndAddRoutesByMenus(menus)
    // console.log(router.getRoutes())
    return hasNewRoutes
}