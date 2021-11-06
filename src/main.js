import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);

import App from './App'

// 引入暴露的api接口
import api from './api/index.js'

import utils from './utils/utils.js'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils

App.mpType = 'app'

const app = new Vue({
	...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
// RouterMount(app, router, '#app')
// #endif

app.$mount(); //为了兼容小程序及app端必须这样写才有效果
