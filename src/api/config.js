// 接口地址
let api_base_url = ''
if (process.env.NODE_ENV === 'development') {
	// 开发地址，直接使用服务器部署的地址
	api_base_url = 'https://tb.romance-to-death.top/shop'
} else if (process.env.NODE_ENV === 'production') {
	// 生产模式的地址
	api_base_url = 'https://tb.romance-to-death.top/shop'
}

// 接口地址统一暴露
export default {
	api_base_url
}
