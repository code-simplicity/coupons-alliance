<template>
	<view class="unt-recommed-loop">
		<u-swiper :list="list" mode="dot" name="pict_url" img-mode="aspectFill" @click="toTaoBaoApp"></u-swiper>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-5 9:16:15 ?F10: PM?
 * description   推荐轮播图
 */

export default {
	name: 'unt-recommed-loop',
	data() {
		return {
			// 轮播图
			list: [],
			// 展示几张
			page: 5
		};
	},
	component: {},
	mounted() {
		this.getRecommendRandom();
	},
	methods: {
		async getRecommendRandom() {
			let res = await this.$api.getRecommendRandom(this.page);
			if (res.code === 10000) {
				this.list = res.data.tbk_dg_optimus_material_response.result_list.map_data;
			}
		},

		// 点击到具体链接
		toTaoBaoApp(index) {
			let list = this.list;
			// #ifdef APP-PLUS
			// 先判断设备是as还是os
			// 首先判断淘宝是否安装
			if (plus.os.name === 'Android') {
				if (plus.runtime.isApplicationExist({ pname: 'com.taobao.taobao', action: 'taobao://' })) {
					uni.showModal({
						content: '淘宝已经安装，是否打开淘宝并跳转到对应链接',
						success: function(res) {
							if (res.confirm) {
								// 打开淘宝领劵地址
								plus.runtime.openURL(
									'https:' + list[index].coupon_click_url,
									function(e) {
										console.log(e.message);
									},
									'com.taobao.taobao'
								);
							}
						}
					});
				} else {
					uni.showToast({
						title: '未检测安装淘宝应用，请到商店下载安装',
						icon: 'error'
					});
				}
			}
			// #endif

			// #ifdef H5
			window.location.href = list[index].coupon_click_url;
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.unt-recommed-loop {
	margin: 10rpx 16rpx 10rpx 16rpx;
}
</style>
