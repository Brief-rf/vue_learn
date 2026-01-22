<template>
    <el-main class="image-main" v-loading="loading">
            <div class="top p-3">
                <el-row :gutter="10">
                    <el-col v-for="(item, index) in list" :key="index" :span="6" :offset="0">
                        <el-card shadow="hover" class="relative mb-3" :body-style="{'padding':0}">
                            <el-image :src="item.url" style="width: 100%;" fit="cover" class="w-full h-[150px]"></el-image>
                            <div class="image-title"> {{ item.name }}</div>
                            <div class="flex items-center justify-center p-2">
                                <el-button type="primary" size="small" text>重命名</el-button>
                                <el-button type="primary" size="small" text>删除</el-button>
                                
                            </div>
                            
                        </el-card>
                        
                    </el-col>
                </el-row>
                
            </div>
            <div class="bottom">
                <el-pagination 
                @current-change="getData" 
                :current-page="currentPage"
                :page-size="limit" 
                background 
                layout="prev, pager, next" 
                :total="total" />

            </div>
        </el-main>
</template>
<script setup>
import { ref } from 'vue';
    import { getImageList } from '~/api/image.js';
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const list = ref([])
const loading = ref(false)
const image_class_id = ref(0)
const activeId = ref(0)
function getData(p=null){
    if(typeof p == 'number'){
        currentPage.value = p
    }
    loading.value = true
    console.log(image_class_id.value, currentPage.value);
    
    getImageList(image_class_id.value, currentPage.value).then(res=>{
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
// 根据分类id重新加载图片列表
const loadData=(id)=>{
    currentPage.value = 1
    image_class_id.value = id
    getData()
}
defineExpose({
    loadData
})
</script>
<style>

.image-main{
    position: relative;
}


.image-main .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-main .bottom{
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;

    @apply flex items-center justify-center
}
.image-title{
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-500 px-2 py-1
}


</style>