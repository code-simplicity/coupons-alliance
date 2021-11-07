<template>
	<view class="discount">
		<unt-header-module></unt-header-module>
		<view class="discount-list">
			<view class="list-wrap flex-layout">
				<view
					class="list-content"
					v-for="(item, index) in onSellList"
					:key="index"
					@click="toTaoBaoApp(item.coupon_click_url)"
				>
					<view class="list-top">
						<u-image
							border-radius="16"
							width="100%"
							height="360rpx"
							mode="aspectFit"
							:src="item.pict_url"
						></u-image>
					</view>
					<view class="list-bottom">
						<view class="list-price">
							<view class="original-price">￥{{ item.zk_final_price }}</view>
							<view class="discount-price">
								券后价:{{ $utils.twoNumber(item.zk_final_price - item.coupon_amount, 2) }}
							</view>
						</view>
						<view class="list-down flex-between">
							<view class="list-count">{{ item.coupon_total_count }}.人购买</view>
						</view>
						<view class="list-title u-line-2">{{ item.title }}</view>
					</view>
				</view>
			</view>
			<u-loadmore
				marginTop="20"
				icon-color="#ff0000"
				:status="status"
				:icon-type="iconType"
				:load-text="loadText"
			/>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-5 10:25:01 ?F10: AM?
 * description   优惠
 */

export default {
	name: '',
	data() {
		return {
			// page
			page: 1,
			// 特惠
			onSellList: [],
			// 正在加载中
			status: 'loading',
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			}
		};
	},
	// 底部加载
	onReachBottom() {
		this.status = 'loading';
		this.page = ++this.page;
		setTimeout(() => {
			this.getOnSell();
		}, 2000);
	},
	component: {},
	mounted() {
		this.getOnSell();
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

		// 获取特惠
		async getOnSell() {
			this.status = 'loading';
			let res = await this.$api.getOnSell(this.page);
			if (res.code === 10000) {
				this.onSellList = this.onSellList.concat(
					res.data.tbk_dg_optimus_material_response.result_list.map_data
				);
				this.status = 'nomore';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.discount {
	.discount-list {
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
					}
					.list-price {
						font-size: 26rpx;
						display: flex;
						flex-wrap: nowrap;
						align-items: center;
						.original-price {
							text-decoration: line-through;
						}
						.discount-price {
							margin-left: 30rpx;
							font-size: 28rpx;
							color: #ff0000;
						}
					}
					.list-down {
						margin: 10rpx 0;
						.list-count {
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
}
</style>
