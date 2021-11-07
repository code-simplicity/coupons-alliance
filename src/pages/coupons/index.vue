<template>
	<view class="coupons">
		<unt-header-module></unt-header-module>
		<view class="coupons-list">
			<view class="left flex-column">
				<view
					ref="uTabs"
					class="list-type flex-column"
					v-for="(item, index) in categoriesList"
					:key="index"
					@click="chooseType(item.type, item.favorites_id)"
				>
					<view class="title" :class="item.type === type ? 'active' : ''">{{ item.favorites_title }}</view>
				</view>
			</view>
			<!-- 精选内容 -->
			<view class="right"><unt-recommed-categories ref="productList"></unt-recommed-categories></view>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-5 10:23:21 ?F10: AM?
 * description   领劵页
 */

export default {
	name: 'Coupons',
	data() {
		return {
			// 精选商品列表
			categoriesList: [
				{
					type: 0,
					favorites_id: 2011849236,
					favorites_title: '热门推荐'
				},
				{
					type: 1,
					favorites_id: 2011849237,
					favorites_title: '办公室零食'
				},
				{
					type: 2,
					favorites_id: 2011849239,
					favorites_title: '日常用品'
				},
				{
					type: 3,
					favorites_id: 2011849241,
					favorites_title: '熬夜护理'
				},
				{
					type: 4,
					favorites_id: 2011849242,
					favorites_title: '电脑周边'
				},
				{
					type: 5,
					favorites_id: 2011849243,
					favorites_title: '秋天必备'
				},
				{
					type: 6,
					favorites_id: 2011849244,
					favorites_title: '程序员必备'
				},
				{
					type: 7,
					favorites_id: 2011849245,
					favorites_title: '节日礼物'
				},
				{
					type: 8,
					favorites_id: 2018933013,
					favorites_title: '中秋礼品'
				}
			],
			// 屏幕高度
			screenHeight: 0,
			// 热门推荐
			type: 0
		};
	},
	onReady() {
		uni.getSystemInfo({
			success: res => {
				this.screenHeight = res.screenHeight;
			}
		});
	},
	component: {},
	mounted() {},
	methods: {
		// 选择类型
		chooseType(type, id) {
			this.type = type;
			this.$refs.productList.getRecommendCategory(id);
		}
	}
};
</script>

<style lang="scss" scoped>
.coupons {
	.coupons-list {
		position: relative;
		.left {
			background-color: #ffffff;
			width: 30%;
			height: 100%;
			position: fixed;
			.list-type {
				padding: 6rpx;
				text-align: center;
				.title {
					font-size: 28rpx;
					margin-bottom: 20rpx;
					&.active {
						font-size: 32rpx;
						color: #ff0000;
					}
				}
			}
		}
		.right {
			width: 70%;
			position: absolute;
			right: 0;
			padding: 0 6rpx;
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
							height: 70rpx;
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
							display: flex;
							align-items: center;
							flex-wrap: nowrap;
							justify-content: flex-end;
							// .list-count {
							// 	font-size: 24rpx;
							// 	 transform:scale(0.9);
							// }
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
	}
}
</style>
