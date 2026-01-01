<script setup>
const asideMenus = [
  {
    "name":"后台面板",
    "icon":"help",
    "child":[{
      "name":"主控台",
      "icon":"home-filled",
      "frontpath":"/"
    }]
  },
  {
    "name":"商城管理",
    "icon":"shopping-bag",
    "child":[{
      "name":"商品管理",
      "icon":"shopping-cart-full",
      "frontpath":"/goods/list"
    }]
  },
]

</script>

<template>
  <div class="f-menu">
    <el-menu
        default-active="2"
        class="border-0"
        :collapse="false"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu v-if="item.child && item.child.length>0" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
      </template>


    </el-menu>
  </div>

</template>

<style scoped>
.f-menu{
  width: 250px;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow: auto;

  @apply shadow-md fixed bg-light-50;
}
</style>