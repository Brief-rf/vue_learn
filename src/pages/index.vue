<template>
  <div>
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <template v-if="panels.length==0">
        <el-col :span="6" :offset="0" v-for="i in panels.length" :key="i">
            <el-skeleton style="width: 100%;height: 100%;" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
              <template #header>
                <div class="flex justify-between">
                  <el-skeleton-item variant="text" style="width: 25%;" />
                  <el-skeleton-item variant="text" style="width: 12%" />
                </div>
              </template>
              <el-skeleton-item variant="h1" style="width: 40%" />
              <el-divider />
              <div class="flex justify-between text-sm  text-gray-500">
                <el-skeleton-item variant="text" style="width: 30%" />
                <el-skeleton-item variant="text" style="width: 15%" />
              </div>
            </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm"> {{item.title}}</span>
              <el-tag
                  :type="item.unitColor?item.unitColor:'primary'"
                  effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <!-- {{ item.value }} -->
            <count-to :value="item.value" />
          </span>
          <el-divider />
          <div class="flex justify-between text-sm  text-gray-500">
            <span>{{item.subTitle}}</span>
            <span>{{item.subValue}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <IndexNavs/>
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexChart v-permission="['getStatistics3,GET']"/>
      </el-col>
      <el-col :span="12" :offset="0" v-permission="['getStatistics2,GET']">
        <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods"/>
        <IndexCard class="mt-4" title="交易提示" tip="需要立即处理的交易订单" :btns="order"/>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {getStatistics1,getStatistics2} from "~/api/index.js";
import {ref} from "vue";
import CountTo from "~/components/CountTo.vue";
import IndexNavs from "~/components/IndexNavs.vue";
import IndexChart from "~/components/IndexChart.vue";
import { ElCol } from "element-plus";
import IndexCard from "~/components/IndexCard.vue";

const panels = ref([])
const goods = ref([])
const order = ref([])
getStatistics1().then(res => {
  panels.value = res.panels
})
getStatistics2().then(res => {
  goods.value = res.goods
  order.value = res.order
  
})

</script>


<style scoped>


</style>