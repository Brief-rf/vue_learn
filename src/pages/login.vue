<template>
  <el-row class="min-h-screen">
    <el-col :lg="16" :md="12" class="bg-indigo-500 flex items-center justify-center">
      <div>
        <div class="text-light-50 text-left font-bold text-5xl mb-4">欢迎光临</div>
        <div class="text-light-50">此站点是《vue3+vite实战商城后台开发》视频课程的演示地址，<a
            href="_blank"><b>点击立即学习</b></a></div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="bg-light-50 flex items-center justify-center flex-col">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center text-gray-400 my-5 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" style="width: 240px">
            <template #prefix>
              <el-icon class="el-input__icon">
                <user/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="Lock" v-model="form.password" placeholder="请输入密码" type="password" show-password
                    style="width: 240px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 240px" class="rounded-3xl bg-indigo-500" :loading="loading">登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script setup>
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {toast} from "~/composables/util.js";
const router = useRouter()
const store = useStore()
const form = reactive({
  username: "",
  password: ""
})
const rules = {
  username: [{
    required: true,
    message: "用户名不能为空",
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: "密码不能为空",
    trigger: 'blur'
  }]
}

const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
  formRef.value.validate((valid)=>{
    if(!valid){
      return false
    }
    loading.value = true

    store.dispatch("login", form).then(res=>{
      toast("登录成功")
      router.push("/")
    }).finally(()=>{
      loading.value = false
    })
  })
}
function onKeyUp(e){
  if(e.key == "Enter"){
    onSubmit()
  }
}
// 监听回车事件
onMounted(()=>{
  document.addEventListener("keyup", onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(()=>{
  document.removeEventListener("keyup", onKeyUp)
})



</script>



