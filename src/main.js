import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createStore} from "vuex";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from './router'
import App from './App.vue'
// 导入windicss样式
import 'virtual:windi.css'
import 'nprogress/nprogress.css'
import store from "~/store/index.js";
import "./permission.js"

const app = createApp(App)
// 设置图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}

import permission from '~/directives/permission.js';
app.use(permission)
app.use(store)
app.use(ElementPlus)
app.use(router)


app.mount("#app")


