import {router,addRoutes} from '~/router/index.js'
import {getToken} from "~/composables/auth.js";
import {hideFullLoading, showFullLoading, toast} from "~/composables/util.js";
import store from "~/store/index.js";

// 全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next)=>{
    // 显示loading
    showFullLoading()
    const token = getToken()
    // 没有登录强制跳转登录页
    if(!token && to.path != "/login"){
        toast("没有登陆", 'error')
        return next({
            path: "/login"
        })
    } else if(token && to.path == '/login'){
        toast("请勿重复登录", "error")
        return next({path:from.path?from.path:"/"})
    }
    // 如果用户登录了，自动获取用户信息，存储在vuex中
    let hasNewRoutes = false
    if(token && !hasGetInfo){
        let {menus} = await store.dispatch('getinfo')
        hasGetInfo = true
        hasNewRoutes=addRoutes(menus)
    }
    let title = (to.meta.title ? to.meta.title: "") + " Brief后台管理"
    document.title = title
    hasNewRoutes?next(to.fullPath):next()
})



// 全局后置守卫

router.afterEach((to, from)=>{
    hideFullLoading()
})