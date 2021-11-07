import api from '@/common/luch-request.js';

/**
 * 获取发现页的分类
 */
export const getDiscoveryCategories = () => api.get(`/discovery/categories`, {})

/**s
 * 获取推荐轮播图
 */
export const getRecommendRandom = (page) => api.get(`/recommend/random/${page}`, {})

/**
 * 根据发现页分类id获取分类内容
 */
export const getDiscoveryMaterial = (materialId, page) => api.get(`/discovery/${materialId}/${page}`, {})

/**
 * 搜索内容
 */
export const getSearch = params => api.get(`/search`, {
	params
})

/**
 * 券场 -精选
 */
export const getRecommendCategories = params => api.get(`/recommend/categories`, {})

/**
 * 券场 -精选内容
 */
export const getRecommendCategory = categoryId => api.get(`/recommend/${categoryId}`, {})

/**
 * 特惠接口
 */
export const getOnSell = page => api.get(`/onSell/${page}`, {})
