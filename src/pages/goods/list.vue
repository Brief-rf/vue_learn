<template>
  <div class="flex items-center">
    <input class="search_input" type="text">
    <button class="search_button"><el-icon><Search /></el-icon></button>
  </div>
</template>


<style>
.search_input{
  padding: 50px;
  height: 100px;
  font-size: large;
  width: 800px;
  border-radius: 50px;
}
.search_input:hover{
  transition: all duration-500;
  @apply bg-gray-200
}
.search_button{
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  @apply text-5xl
}
.search_button:hover{
  color: blue;
  background-color: gray;
}
</style>