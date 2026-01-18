import axios from 'axios'
import {getToken} from "~/composables/auth.js";
import {toast} from "~/composables/util.js";
import store from "~/store/index.js";
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API
})

service.interceptors.request.use(function (config) {
    // 往header头自动添加token
    const token = getToken('admin-token')
    if (token){
        config.headers['token'] = token
    }
    return config
}, function (error){
    return Promise.reject(error)
})
service.interceptors.response.use(function (response) {
    return response.data.data
}, function (error){

    const msg = error.response.data.msg || "请求失败"
    if(msg == "非法token，请先登录！"){
        store.dispatch("logout").finally(()=>location.reload())
    }
    toast(msg, 'error')
    return Promise.reject(error)
})

export default service