<template>
  <div class="search-box">
    <input
        type="text"
        v-model="searchText"
        placeholder="请输入搜索关键词"
        @input="onInput"
    />
    <button @click="search">搜索</button>
    <div v-if="hotSearchList.length" class="hot-search">
      <h3>热门搜索：</h3>
      <ul>
        <li v-for="item in hotSearchList" :key="item" @click="setSearchText(item)">
          {{ item }}
        </li>
      </ul>
    </div>
    <div v-if="historySearchList.length" class="history-search">
      <h3>历史搜索：</h3>
      <ul>
        <li v-for="item in historySearchList" :key="item" @click="setSearchText(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "", // 搜索框输入的内容
      hotSearchList: ["热门关键词1", "热门关键词2", "热门关键词3"], // 热门搜索列表
      historySearchList: [], // 历史搜索列表
    };
  },
  methods: {
    onInput() {
      // 输入框内容变化时触发的逻辑，可以在这里添加节流防抖等优化[^3^]
    },
    search() {
      // 搜索逻辑，可以在这里添加跳转到搜索结果页面等操作[^2^]
      if (this.searchText.trim()) {
        this.historySearchList = [
          ...new Set([this.searchText, ...this.historySearchList]),
        ]; // 更新历史搜索列表
      }
    },
    setSearchText(text) {
      this.searchText = text; // 设置搜索框内容为热门或历史搜索关键词
    },
  },
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.search-box input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}
.search-box button {
  padding: 8px 15px;
  font-size: 16px;
  background-color: #00a1d6;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.search-box button:hover {
  background-color: #0084b4;
}
.hot-search,
.history-search {
  margin-top: 20px;
}
.hot-search h3,
.history-search h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
.hot-search ul,
.history-search ul {
  list-style: none;
  padding: 0;
}
.hot-search li,
.history-search li {
  padding: 5px 0;
  cursor: pointer;
}
.hot-search li:hover,
.history-search li:hover {
  color: #00a1d6;
}
</style>