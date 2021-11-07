<template>
	<view class="unt-recommed-categories">
		<view class="list-wrap flex-layout">
			<view class="list-content" v-for="(item, index) in categoriesResult" :key="index">
				<view class="list-top">
					<u-image
						border-radius="16"
						width="100%"
						height="260rpx"
						mode="aspectFit"
						:src="item.pict_url"
					></u-image>
				</view>
				<view class="list-bottom">
					<view class="list-title u-line-2">{{ item.title }}</view>
					<view v-if="item.coupon_click_url !== null" class="list-down">
						<text class="original-price">原价:{{ item.zk_final_price }}</text>
						<view class="click-to-buy" @click="toTaoBaoApp(item.coupon_click_url)">领劵购买</view>
					</view>
					<view class="no-coupons" v-else>优惠券已无</view>
				</view>
				<view class="coupon_info-title">{{ item.coupon_info }}</view>
			</view>
		</view>
		<u-loadmore marginTop="20" icon-color="#ff0000" :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-7 3:36:42 ?F10: PM?
 * description   头部组件
 */

export default {
	name: 'unt-recommed-categories',
	data() {
		return {
			categoriesResult: [],
			// 正在加载中
			status: 'loading',
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			// 初始化
			favorites_id: 2011849236
		};
	},
	component: {},
	mounted() {
		this.getRecommendCategory(this.favorites_id);
	},
	methods: {
		// 跳转到领劵页面
		toTaoBaoApp(url) {
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
									'https:' + url,
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
			window.location.href = url;
			// #endif
		},

		// 获取精选内容
		async getRecommendCategory(favorites_id) {
			this.status = 'loading';
			let res = await this.$api.getRecommendCategory(favorites_id);
			if (res.code === 10000) {
				this.categoriesResult = res.data.tbk_dg_optimus_material_response.result_list.map_data;
				this.status = 'nomore';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.unt-recommed-categories {
	margin-bottom: 30rpx;
	.list-wrap {
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.list-content {
			flex: 0 0 50%;
			max-width: 50%;
			padding: 12rpx 10rpx;
			position: relative;
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
					height: 70rpx;
				}
				.list-down {
					margin-top: 16rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.original-price {
						font-size: 22rpx;
						transform: scale(0.9);
						color: #ff0000;
					}
					.click-to-buy {
						margin-left: 10rpx;
						border-radius: 16rpx;
						background-color: #ff0000;
						font-size: 22rpx;
						color: #ffffff;
						padding: 2rpx 6rpx;
						&:active {
							background-color: #0a0aff;
						}
					}
				}
				.no-coupons {
					font-size: 28rpx;
					color: #ff0000;
					margin-top: 10rpx;
				}
			}
			.coupon_info-title {
				position: absolute;
				top: 20rpx;
				right: 16rpx;
				font-size: 22rpx;
				transform: scale(0.9);
				padding: 4rpx 6rpx;
				border-radius: 16rpx;
				background-color: rgb(158, 158, 158, 0.3);
			}
		}
	}
}
</style>
