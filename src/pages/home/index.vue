<template>
	<view class="home">
		<u-navbar :is-back="false" title="" back-text="">
			<view class="left"><u-icon name="scan" color="#19114c" size="48"></u-icon></view>
			<view class="slot-wrap flex-align" slot="">
				<u-search
					@focus="focus"
					:show-action="false"
					shape="round"
					placeholder="输入商品名称"
					v-model="keyword"
				></u-search>
			</view>
			<view class="right" slot="right"><u-icon name="shopping-cart" color="#19114c" size="48"></u-icon></view>
		</u-navbar>
		<!-- tabs -->
		<view class="tabs flex-align">
			<view class="tabs-list">
				<view class="left">
					<u-tabs-swiper
						ref="uTabs"
						:list="list"
						:is-scroll="true"
						:current="current"
						@change="change"
						name="title"
						active-color="#ff0000"
					></u-tabs-swiper>
				</view>
				<view class="right"><u-icon name="list" color="#19114c" size="46"></u-icon></view>
			</view>
		</view>

		<view class="list-wrap">
			<swiper
				class="swiper"
				:style="{ height: screenHeight + 'px' }"
				:current="swiperCurrent"
				@transition="transition"
				@animationfinish="animationfinish"
			>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-loop></unt-recommed-loop>
						<unt-recommed-list ref="productList0"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList1"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList2"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList3"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList4"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList5"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList6"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList7"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList8"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList9"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList10"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="onreachBottom">
						<unt-recommed-list ref="productList11"></unt-recommed-list>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-5 10:23:42 ?F10: AM?
 * description	首页
 */

export default {
	name: 'Home',
	data() {
		return {
			// 搜索关键字
			keyword: '',
			// 分类
			list: [
				{
					id: 9660,
					title: '推荐'
				},
				{
					id: 9649,
					title: '食品'
				},
				{
					id: 9654,
					title: '男装'
				},
				{
					id: 9658,
					title: '女装'
				},
				{
					id: 9652,
					title: '内衣'
				},
				{
					id: 9650,
					title: '母婴'
				},
				{
					id: 9656,
					title: '数码家电'
				},
				{
					id: 9653,
					title: '美妆个护'
				},
				{
					id: 9651,
					title: '运动户外'
				},
				{
					id: 9648,
					title: '鞋包配饰'
				},
				{
					id: 9655,
					title: '家居家装'
				}
			],
			current: 0,
			// 屏幕高度
			screenHeight: 0,
			swiperCurrent: 0,
			// 页码
			page: 1
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
	mounted() {
		this.changeTabs(this.list, this.current, this.page);
		// this.getDiscoveryCategories();
	},
	methods: {
		// 获取焦点跳转搜索页
		focus(val) {
			uni.navigateTo({
				url: '../search/index',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},

		// 切换tabs，传递materialId
		changeTabs(list, index, page) {
			switch (index) {
				case 0: {
					this.$refs.productList0.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 1: {
					this.$refs.productList1.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 2: {
					this.$refs.productList2.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 3: {
					this.$refs.productList3.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 4: {
					this.$refs.productList4.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 5: {
					this.$refs.productList5.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 6: {
					this.$refs.productList6.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 7: {
					this.$refs.productList7.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 8: {
					this.$refs.productList8.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 9: {
					this.$refs.productList9.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 10: {
					this.$refs.productList10.getDiscoveryMaterial(list[index].id, page);
					break;
				}
				case 11: {
					this.$refs.productList11.getDiscoveryMaterial(list[index].id, page);
					break;
				}
			}
		},

		// 点击切换tabs
		change(index) {
			this.swiperCurrent = index;
			this.changeTabs(this.list, index, this.page);
		},

		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},

		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			if (this.current !== current) {
				this.changeTabs(this.list, current, this.page);
			}
			this.current = current;
		},

		// 触发底部更新
		onreachBottom() {
			setTimeout(() => {
				this.page = ++this.page;
				this.changeTabs(this.list, this.swiperCurrent, this.page);
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	.left,
	.right {
		padding: 0 20rpx;
	}
	.slot-wrap {
		flex: 1;
	}
	.tabs {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 9;
		background-color: #ffffff;
		.tabs-list {
			width: 100%;
			position: relative;
			background-color: #ffffff;
			display: flex;
			align-items: center;
			.left {
				width: 90%;
				overflow: hidden;
			}
			.right {
				right: 10rpx;
			}
		}
	}
	.list-wrap {
		margin-top: 80rpx;
		position: relative;
		.swiper {
		}
	}
}
</style>
