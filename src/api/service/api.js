import api from '@/common/luch-request.js';

/**
 * 获取发现页的分类
 */
export const getDiscoveryCategories = () => api.get(`/discovery/categories`, {})
