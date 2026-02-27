<template>
    <el-card shadow="never" class="border-0">
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
        <el-table-column prop="title" label="公告标题"/>
        <el-table-column prop="create_time" label="发布时间" width="180" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="small" text>修改</el-button>
            <el-popconfirm title="是否要删除该公告？" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button @click="" type="primary" size="small" text>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
          </el-table-column>
      </el-table>
      <el-pagination class="flex items-center justify-center mt-5" @current-change="getData" :current-page="currentPage" :page-size="limit" background layout="prev, pager, next" :total="total" />
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

    </el-card>
</template>


<script setup>
import {createNotice, getNoticeList, updateNotice, deleteNotice} from "~/api/notice.js";

import {computed, reactive, ref} from "vue";
import FormDrawer from "~/components/FormDrawer.vue";
import {toast} from "~/composables/util.js";
import { useInitTable } from "../../composables/useCommon";
const roles = ref([])

const {
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData} = useInitTable({
          getList:getNoticeList,
          
        })
const editId = ref(0)
const drawerTitle = computed(()=>editId.value ? "修改" : "新增")

const handleDelete =  (id)=>{
  loading.value = true
  deleteNotice(id).then(res=>{
    toast("删除成功")
    getData()
  }).finally(()=>{
    loading.value = false

  })


}
getData()
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  title: "",
  content: ""
})
const rules = {
  title: [{
    required: true,
    message: '公告标题不能为空',
    trigger: 'blur'
  }],
  content: [{
    required: true,
    message: '公告内容不能为空',
    trigger: 'blur'
  }]
}
const handleSubmit = ()=>{
  formRef.value.validate((valid) => {
    if(!valid)return
    formDrawerRef.value.showLoading()
    console.log(editId.id, form)
    const fn = editId.value ? updateNotice(editId.value, form) : createNotice(form)
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
    title: "",
    content: ""
  })
  formDrawerRef.value.open()
}
</script>