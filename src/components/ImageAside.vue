<script setup lang="ts">
import {reactive, ref, computed} from 'vue'
import AsideList from '~/components/AsideList.vue';
import {getImageClassList, createImageClass, udpateImageClass} from '~/api/image_class.js'
import FormDrawer from './FormDrawer.vue'
import {toast} from '~/composables/util.js'
const loading = ref(false)
const list = ref([])
const activeId = ref(0)
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
function getData(p=null){
    if(typeof p == 'number'){
        currentPage.value = p
    }
    loading.value = true
    getImageClassList(currentPage.value, limit.value).then(res=>{
        console.log(res);
        total.value = res.totalCount
        list.value = res.list
        let item = list.value[0]
        if(item){
            activeId.value = item.id
        }
    }).finally(()=>{
        loading.value = false
    })
}
getData()
const editId = ref(0)
const drawerTitle = computed(()=>editId.value ? "修改" : "新增")
const formDrawerRef = ref(null)
const handleCreate = ()=>{
    editId.value = 0
    form.name = ""
    form.order = 50
    formDrawerRef.value.open()
}
function handleEdit(e){
    editId.value = e.id
    form.name = e.name
    form.order = e.order
    formDrawerRef.value.open()
    activeId.value = e.id
    console.log(e);
    
}
const form = reactive({
    name:"",
    order: 50
})
const rules = {
    name: [{
        required: true,
        message: "图库分类名称不能为空",
        trigger: "blur"
    }]

}
const formRef = ref(null)
const handleSubmit = ()=>{
    formRef.value.validate((valid)=>{
        if(!valid) return
        formDrawerRef.value.showLoading()
        const fun = editId.value ? udpateImageClass(editId.value, form) : createImageClass(form)
        fun.then(res=>{
            toast(drawerTitle.value+"成功")
            getData(editId.value ? currentPage.value : 1)
            formDrawerRef.value.close()
        }).finally(()=>{
            formDrawerRef.value.hideLoading()
        })
    })
    
}
defineExpose({
    handleCreate
})
</script>

<template>
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList @edit="handleEdit(item)" :active="activeId == item.id" v-for="(item, index) in list" :key="index">
                {{ item.name }}
            </AsideList>
        </div>
        <div class="bottom">
            <el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" background layout="prev, next" :total="total" />
        </div>

    </el-aside>
    <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false" >
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <!-- <el-input v-model="form.order"></el-input> -->
                <el-input-number v-model="form.order" :min="0" :max="1000"/>
            </el-form-item>

        </el-form>
        
    </FormDrawer>
</template>

<style>
.image-aside{
    border-right: 1px solid #eeeeee;
    position: relative;
}
.image-aside .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom{
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;

    @apply flex items-center justify-center
}

</style>