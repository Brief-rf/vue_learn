<template>
  <el-result
      icon="warning"
      title="网页不存在"
      sub-title="Please follow the instructions"
  >
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">返回主页</el-button>
    </template>
  </el-result>

</template>