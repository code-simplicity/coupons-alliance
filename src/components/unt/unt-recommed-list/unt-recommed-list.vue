<template>
	<view class="unt-recommed-list">
		<view class="list-wrap flex-layout">
			<view class="list-content" v-for="(item, index) in productList" :key="index">
				<view class="list-top">
					<u-image border-radius="16" width="100%" height="360rpx" :src="item.pict_url"></u-image>
				</view>
				<view class="list-bottom">
					<view class="list-title u-line-2">{{ item.title }}</view>
					<view class="list-price">
						<view class="original-price">￥{{ item.zk_final_price }}</view>
						<view class="discount-price">
							￥{{ $utils.twoNumber(item.zk_final_price - item.coupon_amount, 2) }}
						</view>
					</view>
					<view class="list-down flex-between">
						<view class="list-count">已卖：{{ item.coupon_total_count }}件</view>
						<view class="click-to-buy">领劵购买</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-5 9:48:01 ?F10: PM?
 * description   推荐列表
 */

export default {
	name: 'unt-recommed-list',
	data() {
		return {
			// 页码
			page: 1,
			// 商品列表
			productList: []
		};
	},

	computed: {},

	component: {},
	mounted() {},
	methods: {
		// 获取
		async getDiscoveryMaterial(materialId) {
			// 获取分类id，组装页数
			let res = await this.$api.getDiscoveryMaterial(materialId, this.page);
			if (res.code === 10000) {
				this.productList = res.data;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.unt-recommed-list {
	.list-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.list-content {
			flex: 0 0 50%;
			max-width: 50%;
			padding: 12rpx 10rpx;

			.list-top {
				width: 100%;
				border-radius: 16rpx 16rpx 0 0;
				background-color: #ffffff;
			}
			.list-bottom {
				display: flex;
				flex-direction: column;
				padding: 10rpx;
				background-color: #ffffff;
				border-radius: 0 0 16rpx 16rpx;
				.list-title {
					font-size: 28rpx;
				}
				.list-price {
					margin: 16rpx 0;
					font-size: 26rpx;
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					.original-price {
						text-decoration: line-through;
					}
					.discount-price {
						margin-left: 30rpx;
						font-size: 32rpx;
						color: #ff0000;
					}
				}
				.list-down {
					padding: 0 6rpx;
					.list-count {
						font-size: 24rpx;
					}
					.click-to-buy {
						border-radius: 16rpx;
						background-color: #ff0000;
						font-size: 24rpx;
						color: #ffffff;
						padding: 6rpx 8rpx;
						&:active {
							background-color: #0a0aff;
						}
					}
				}
			}
		}
	}
}
</style>
