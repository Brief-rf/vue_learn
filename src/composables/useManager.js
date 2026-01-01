import {ref, reactive} from "vue";
import {useStore} from "vuex";
import {showModal, toast} from "~/composables/util.js";
import {useRouter} from "vue-router";
import {logout} from "~/api/manager.js";

export function useRepassword(){
    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const store = useStore()
    const router = useRouter()
    const openRePasswordForm = ()=>formDrawerRef.value.open()
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    const rules = {
        oldpassword: [{
            required: true,
            message: "旧密码不能为空",
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: "新密码不能为空",
            trigger: 'blur'
        }],
        repassword: [{
            required: true,
            message: "新密码不能为空",
            trigger: 'blur'
        }]
    }

    function handleRepassword(){
        formRef.value.validate((valid)=> {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            showModal("是否确认修改？").then(() => {
                store.dispatch("updatepassword", form).then(res => {
                    toast("修改成功")
                    router.push("/")
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
            }).catch(() => {
            })
        })
    }
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        handleRepassword,
        openRePasswordForm
    }
}


export function useLogout(){
    const store = useStore()
    const router = useRouter()
    function hangleLogout(){
        showModal("是否要退出登录？").then(()=>{
            logout().then(()=>{
                // 移除cookie中的token
                store.dispatch("logout")
                // 跳转回登录页
                router.push("/login")
                // 提示退出登录成功
                toast("退出登录成功")
            }).catch((err)=>{})
        }).catch(()=>{})
    }
    return {
        hangleLogout
    }
}