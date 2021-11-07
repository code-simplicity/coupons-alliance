const SEARCH_KEY = '__tbsearch__'
// 搜索保存的最大历史记录
const SEARCH_MAX = 12

// 插入数组的方法
function insertArray(array, val, compare, maxLen) {
	// 获取数组下标
	const index = array.findIndex(compare)
	if (index === 0) {
		return
	}
	if (index > 0) {
		array.splice(index, 1)
	}
	array.unshift(val)
	if (maxLen && array.length > maxLen) {
		// 删除最后一个元素，并且返回行的数组长度
		array.pop()
	}
}

// 删除数组元素
function deleteFromArray(array, compare) {
	const index = array.findIndex(compare)
	if (index > -1) {
		array.splice(index, 1)
	}
}

// 存储历史搜索数据
export function saveSearch(query) {
	let searches = []
	uni.getStorage({
		key: SEARCH_KEY,
		success: function(res) {
			searches = res.data
		}
	})
	insertArray(searches, query, item => {
		return item === query
	}, SEARCH_MAX)
	uni.setStorageSync(SEARCH_KEY, searches)
	return searches
}

// 读取搜索历史记录
export function getSearch() {
	let searches = []
	uni.getStorage({
		key: SEARCH_KEY,
		success: function(res) {
			searches = res.data
		}
	})
	return searches
}

// 删除单个搜索历史记录
export function deleteSearch(query) {
	let searches = []
	uni.getStorage({
		key: SEARCH_KEY,
		success: function(res) {
			searches = res.data
		}
	})
	deleteFromArray(searches, item => {
		return item === query
	})
	uni.setStorageSync(SEARCH_KEY, searches)
	return searches
}

// 清除所有搜索历史记录
export function clearSearch() {
	uni.removeStorageSync(SEARCH_KEY)
	return []
}
