<template>
	<view class="unt-recommed-loop">
		<u-swiper :list="list" mode="dot" name="pict_url" @click="toInfoResult"></u-swiper>
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
		toInfoResult(index) {}
	}
};
</script>

<style lang="scss" scoped>
.unt-recommed-loop {
	margin: 10rpx 16rpx 10rpx 16rpx;
}
</style>
