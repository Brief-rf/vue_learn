import {createStore} from "vuex";
import {getInfo, login, updatepassword} from "~/api/manager.js";
import {removeToken, setToken} from "~/composables/auth.js";

const store = createStore({
    state (){
        return {
            // 用户信息
            user:{}
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user){
            state.user = user
        }
    },
    actions:{
        getinfo({commit}){
            return new Promise((resolve, reject)=>{
                getInfo().then(res=>{
                    commit("SET_USERINFO", res)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        login({commit}, {username, password}){
            return new Promise((resolve, reject)=>{
                login(username, password).then(res=>{
                    setToken(res.token)
                    resolve(res)
                }).catch(err=>{reject(err)})
            })
        },
        // 退出登录
        logout({commit}){
            removeToken()
            commit("SET_USERINFO", {})
        },
        // 修改密码
        updatepassword({commit}, {oldpassword, password, repassword}){
            return new Promise((resolve, reject)=> {
                updatepassword(oldpassword, password, repassword).then(res=>{
                    console.log(res)
                    removeToken()
                    commit("SET_USERINFO", {})
                }).catch(err=>{reject(err)})
            })
        }
    },

})


export default store