<template>
  <el-card shadow="never" class="border-0">
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex items-center justify-end">
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </div>

        </el-col>
      </el-row>


    </el-form>
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
      <el-tooltip
          effect="dark"
          content="刷新数据"
          placement="top"
      >
        <el-button text @click="getData">
          <el-icon :size="20"><Refresh /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员" width="200">
        <template #default="{row}">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="ml-3">
              <h6>
                {{row.username}}<br>
                <small>ID:{{row.id}}</small>
              </h6>

            </div>
          </div>
        </template>

      </el-table-column>
      <el-table-column label="所属角色" align="center">
        <template #default="{row}">
          {{row.role?.name || "-"}}
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120">
        <template #default="{row}">
          <el-switch :disabled="row.super === 1" :loading="row.statusLoading" :model-value="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange($event, row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
          <div v-else>
            <el-button @click="handleEdit(scope.row)" type="primary" size="small" text>修改</el-button>
            <el-popconfirm title="是否要删除该管理员？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button @click="" type="primary" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="flex items-center justify-center mt-5" @current-change="getData" :current-page="currentPage" :page-size="limit" background layout="prev, pager, next" :total="total" />
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="content">
          <el-input v-model="form.password" placeholder="密码" ></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar"/>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="选择所属角色">
            <el-option v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>
</template>


<script setup>
import {createManager, deleteManager, getManagerList, updateManager, updateManagerStatus} from "~/api/manager.js";
import {computed, reactive, ref} from "vue";
import FormDrawer from "~/components/FormDrawer.vue";
import ChooseImage from "~/components/ChooseImage.vue";
import {toast} from "~/composables/util.js";
import { useInitTable } from "../../composables/useCommon";
const roles = ref([])

const {searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData} = useInitTable({
          searchForm:{
            keyword: ""
          },
          getList:getManagerList,
          onGetListSuccess:(res)=>{
            total.value = res.totalCount
            tableData.value = res.list.map(o => {
                o.statusLoading = false
                return o
            })
            roles.value = res.roles
            
          }
        })
const editId = ref(0)
const drawerTitle = computed(()=>editId.value ? "修改" : "新增")

const handleDelete =  (id)=>{
  loading.value = true
  deleteManager(id).then(res=>{
    toast("删除成功")
    getData()
  }).finally(()=>{
    loading.value = false

  })


}
// getData()
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  username:"",
  password:"",
  role_id:null,
  status: 1,
  avatar: ""
})
const rules = {
  // title: [{
  //   required: true,
  //   message: '公告标题不能为空',
  //   trigger: 'blur'
  // }],
  // content: [{
  //   required: true,
  //   message: '公告内容不能为空',
  //   trigger: 'blur'
  // }]
}
const handleSubmit = ()=>{
  formRef.value.validate((valid) => {
    if(!valid)return
    formDrawerRef.value.showLoading()
    console.log(editId.id, form)
    const fn = editId.value ? updateManager(editId.value, form) : createManager(form)
    fn.then(res=>{
      toast(drawerTitle.value + "成功")
      // 修改刷新当前页 新增刷新第一页
      getData(editId.value ? false : 1)
      formDrawerRef.value.close()

    }).finally(()=>{
      formDrawerRef.value.hideLoading()
    })
  })
}
//重置表单
function resetForm(row=false){
  if(formRef.value){
    formRef.value.clearValidate()
  }
  if(row){
    for (const k in form){
      form[k] = row[k]
    }
  }
}
function handleEdit(row){
  editId.value = row.id
  resetForm(row)
  formDrawerRef.value.open()

}
const handleCreate = ()=>{
  editId.value = 0
  resetForm({
    username:"",
    password:"",
    role_id:null,
    status: 1,
    avatar: ""
  })
  formDrawerRef.value.open()
}
const handleStatusChange = (status, row)=>{
  row.statusLoading = true
  updateManagerStatus(row.id, status).then((res)=>{
    toast("修改状态成功")
    row.status = status
  }).finally(()=>{
    row.statusLoading = false
  })

}
</script>