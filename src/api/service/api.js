import api from '@/common/luch-request.js';

/**
 * 获取发现页的分类
 */
export const getDiscoveryCategories = () => api.get(`/discovery/categories`, {})

/**s
 * 获取推荐轮播图
 */
export const getRecommendRandom = (page) => api.get(`/recommend/random/${page}`, {})

/**s
 * 根据发现页分类id获取分类内容
 */
export const getDiscoveryMaterial = (materialId, page) => api.get(`/discovery/${materialId}/${page}`, {})
