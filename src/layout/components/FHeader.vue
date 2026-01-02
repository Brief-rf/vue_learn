<script setup>
import {FullScreen} from "@element-plus/icons-vue";
import {logout} from "~/api/manager.js";
import {useFullscreen} from "@vueuse/core";
import FormDrawer from "~/components/FormDrawer.vue";
import {useLogout, useRepassword} from "~/composables/useManager.js";
const {isFullscreen, toggle} = useFullscreen()
const {
  formDrawerRef,
  form,
  rules,
  formRef,
  handleRepassword,
  openRePasswordForm
} = useRepassword()
const {hangleLogout} = useLogout()

function handleRefresh(){
  location.reload()
}


function handleCommand(event){
  if(event == "logout"){
    hangleLogout()
  } else if(event== 'rePassword'){
    // drawer.value = true
    console.log("修改密码")
    // formDrawerRef.value.open()
    openRePasswordForm()
  }
}

</script>
<template>
  <div class="f-header">
    <span class="w-[250px] flex justify-center text-xl font-thin">
    <el-icon class="mr-1"><ElementPlus/></el-icon>
      若飞编程
    </span>
    <el-icon class="flex justify-center w-[42px] h-[100%] icon-btn" @click="$store.commit('handleAsideWidth')">
      <Fold v-if="$store.state.asideWidth == '250px'"/>
      <Expand v-else/>
    </el-icon>
    <el-tooltip
        effect="dark"
        content="刷新"
        placement="bottom"
    >
      <el-icon @click="handleRefresh" class="flex justify-center w-[42px] h-[100%] icon-btn">
        <Refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center h-[100%]">
      <el-tooltip
          effect="dark"
          :content="isFullscreen?'退出全屏':'全屏'"
          placement="bottom"
      >
        <el-icon @click="toggle"  class="flex justify-center w-[42px] h-[100%] icon-btn">
          <full-screen v-if="!isFullscreen"/>
          <aim v-else/>
        </el-icon>
      </el-tooltip>
      <el-dropdown class="h-[64px] icon-btn flex justify-center items-center" @command="handleCommand">
        <span class="flex items-center text-light-50 h-[100%]">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar"/>
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="handleRepassword">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" style="max-width: 100%" size="small">
      <el-form-item prop="oldpassword"  label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码" type="password" show-password style="width: 100%">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="form.password" placeholder="请输新密码" type="password" show-password
                  style="width: 100%"/>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model="form.repassword" placeholder="请输新密码" type="password" show-password
                  style="width: 100%"/>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<style scoped>
.f-header{
  @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 h-[64px] items-center
}
.icon-btn {
  cursor: pointer;

}
.icon-btn:hover {
  @apply bg-indigo-600;
}
</style>