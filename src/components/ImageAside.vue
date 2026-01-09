<script setup lang="ts">
import {ref} from 'vue'
import AsideList from '~/components/AsideList.vue';
import {getImageClassList} from '~/api/image_class.js'
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
function ttt(e){
    console.log(e);
    activeId.value = e.id
}
</script>

<template>
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList @click="ttt(item)" :active="activeId == item.id" v-for="(item, index) in list" :key="index">
                {{ item.name }}
            </AsideList>
        </div>
        <div class="bottom">
            <el-pagination @current-change="getData" :current-page="currentPage" :page-size="limit" background layout="prev, next" :total="total" />
        </div>

    </el-aside>
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