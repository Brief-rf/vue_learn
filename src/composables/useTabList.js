import {ref} from 'vue'
import {useRoute, onBeforeRouteUpdate} from 'vue-router'
import {useCookies} from '@vueuse/integrations/useCookies'
import {router} from "~/router";

export function useTabList(){
    const route = useRoute()
    const cookie = useCookies()
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path:"/"
        },
    ])
    function addTab(tab){
        let noTab = tabList.value.findIndex(t=>t.path==tab.path) == -1
        if(noTab){
            tabList.value.push(tab)
        }
        cookie.set("tabList", tabList.value)
    }
// 初始化标签导航列表
    function initTabList(){
        let tbs = cookie.get("tabList")
        if(tbs){
            tabList.value = tbs
        }
    }
    initTabList() // 每次刷新就执行
    onBeforeRouteUpdate((to, from)=>{
        activeTab.value = to.path
        addTab({
            title:to.meta.title,
            path:to.path
        })
    })
    const removeTab = (targetName) => {
        let tabs = tabList.value
        let a = activeTab.value
        if(a == targetName){
            tabs.forEach((tab, index)=>{
                if(tab.path == targetName){
                    const nextTab = tabs[index+1] || tabs[index-1]
                    if(nextTab){
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab=>tab.path != targetName)
        cookie.set("tabList", tabList.value)
        router.push(a)
    }
    const changeTab = (t)=>{
        activeTab.value = t
        router.push(t)
    }
    function handleClose(c){
        if(c == "clearAll"){
            activeTab.value = "/"
            tabList.value = [{
                title: "后台首页",
                path: "/"
            }]
            router.push("/")
        } else if(c == "clearOther"){
            // 过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(tab=>tab.path == "/" || tab.path == activeTab.value)
        }
        cookie.set("tabList", tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}