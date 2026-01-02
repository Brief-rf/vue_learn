import {createRouter, createWebHashHistory} from "vue-router";
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import About from '~/pages/about.vue'
import GoodList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
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