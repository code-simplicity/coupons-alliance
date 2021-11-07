<template>
	<view class="search">
		<u-navbar :is-back="true" title="" back-text="">
			<view class="left"><u-icon name="camera" color="#19114c" size="48"></u-icon></view>
			<view class="slot-wrap flex-align" slot="">
				<u-search
					:show-action="true"
					shape="round"
					placeholder="输入商品名称"
					v-model="keyword"
					:focus="true"
					@search="search"
					@custom="search"
				></u-search>
			</view>
		</u-navbar>
		<view class="search-list">
			<view class="search-list-history flex-column" v-if="searchList && searchList.length === 0">
				<view class="header flex-between">
					<view class="left">搜索历史</view>
					<view class="right">
						<u-icon
							class="u-icon"
							name="trash"
							color="#19114c"
							hover-class="#ff0000"
							size="46"
							@click="delAllSearch"
						></u-icon>
					</view>
				</view>
				<view class="search-content flex-row" v-if="searchHistory.length > 0">
					<view class="search-tags" v-for="(item, index) in searchHistory" :key="index">
						<view class="search-btn" @click="tagSearch(item)">{{ item }}</view>
						<view class="close-dark" @click="delTags(item)">
							<u-icon name="close-circle" color="#515151" size="28"></u-icon>
						</view>
					</view>
				</view>
				<u-empty v-else text="暂无历史记录" mode="history" margin-top="16"></u-empty>
			</view>
			<!-- 搜索结果 -->
			<view class="search-card-list">
				<view
					class="search-card"
					v-for="(item, index) in searchList"
					:key="index"
					@click="toTaoBaoApp(item.coupon_share_url)"
				>
					<view class="search-card-content flex-align">
						<view class="search-image">
							<u-image
								border-radius="16"
								width="200rpx"
								height="200rpx"
								mode="aspectFit"
								:src="item.pict_url"
							></u-image>
						</view>
						<view class="search-right flex-column">
							<view class="top u-line-2">{{ item.title }}</view>
							<view class="center">
								<view class="original-price">￥{{ item.zk_final_price }}</view>
								<view class="discount-price">
									￥{{ $utils.twoNumber(item.zk_final_price - item.coupon_amount, 2) }}
								</view>
							</view>
							<view class="bottom flex-between">
								<view class="list-count">已卖：{{ item.coupon_total_count }}件</view>
								<view class="click-to-buy">领劵购买</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loading v-if="loading" class="u-loading" mode="circle" color="red" size="64"></u-loading>
			<u-loadmore
				v-if="searchList && searchList.length > 0"
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
 * time     2021-11-5 8:57:37 ?F10: PM?
 * description   搜索
 */
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'Search',
	data() {
		return {
			// 搜索关键字
			keyword: '',
			// 搜索结果
			searchList: [],
			// 正在加载中
			loading: false,
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			// page
			page: 1
		};
	},
	onLoad(option) {},

	computed: {
		...mapGetters('search', ['searchHistory'])
	},

	// 底部加载
	onReachBottom() {
		this.status = 'loading';
		this.loading = false;
		this.page = ++this.page;
		setTimeout(() => {
			this.search(this.searchHistory[0]);
		}, 2000);
	},

	component: {},
	mounted() {},
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
			self.location.href = url;
			// #endif
		},

		// 通过tags执行搜索
		tagSearch(val) {
			this.search(val);
		},

		// 删除全部
		delAllSearch() {
			this.clearSearchHistory();
		},

		// 删除搜索历史记录
		delTags(val) {
			this.deleteSearchHistory(val);
		},

		// 搜索
		async search(val) {
			let params = {
				keyword: val,
				page: this.page
			};
			this.loading = true;
			let res = await this.$api.getSearch(params);
			if (res.code === 10000) {
				this.searchList = this.searchList.concat(
					res.data.tbk_dg_material_optional_response.result_list.map_data
				);
				this.loading = false;
			}
			// 保存搜索记录
			this.saveSearchHistory(val);
			// 清空搜索框
			this.keyword = '';
		},

		...mapActions('search', ['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory'])
	}
};
</script>

<style lang="scss" scoped>
.search {
	.slot-wrap {
		flex: 1;
		padding: 0 10rpx 0 10rpx;
	}
	.left,
	.right {
		padding: 0 10rpx 0 0;
	}
	.search-list {
		padding: 16rpx;
		.search-list-history {
			.header {
				margin-bottom: 16rpx;
				.left {
					font-size: 32rpx;
				}
				.right {
					.u-icon {
						&:active {
							color: #ff0000;
						}
					}
				}
			}
			.search-content {
				flex-wrap: wrap;
				.search-tags {
					background-color: #f9f5f7;
					display: flex;
					margin: 10rpx;
					padding: 10rpx;
					border-radius: 16rpx;
					flex-direction: row;
					align-items: center;
					.search-btn {
						color: #676767;
					}
					.close-dark {
						margin-left: 10rpx;
						text-align: center;
					}
				}
			}
		}

		.search-card-list {
			.search-card {
				background-color: #ffffff;
				margin-bottom: 16rpx;
				border-radius: 16rpx;
				.search-card-content {
					padding: 10rpx;
					.search-image {
						margin-right: 16rpx;
					}
					.search-right {
						.center {
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
						.bottom {
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
		.u-loading {
			display: flex;
			align-items: center;
			margin: 0 auto;
			margin-top: 20rpx;
		}
	}
}
</style>
