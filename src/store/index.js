import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import search from './modules/search.js'
// 使用vuex
Vue.use(Vuex)

// 判断环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		search
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
