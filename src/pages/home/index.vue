<template>
	<view class="home">
		<u-navbar :is-back="false" title="" back-text="">
			<view class="left"><u-icon name="scan" color="#19114c" size="48"></u-icon></view>
			<view class="slot-wrap flex-align" slot="">
				<u-search :show-action="false" shape="round" placeholder="输入商品名称" v-model="keyword"></u-search>
			</view>
			<view class="right" slot="right"><u-icon name="car" color="#19114c" size="48"></u-icon></view>
		</u-navbar>
		<!-- tabs -->
		<view class="tabs flex-align">
			<view class="tabs-list">
				<u-tabs
					:list="list"
					:is-scroll="true"
					:current="current"
					@change="change"
					active-color="#ff0000"
				></u-tabs>
			</view>
			<view class="right"><u-icon name="list" color="#19114c" size="46"></u-icon></view>
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
			list: [],
			current: 0
		};
	},
	component: {},
	mounted() {
		this.getDiscoveryCategories();
	},
	methods: {
		// 获取分类
		async getDiscoveryCategories() {
			let res = await this.$api.getDiscoveryCategories();
			if (res.code === 10000) {
				res.data.map(item => {
					let list = {
						name: '',
						id: ''
					};
					list.name = item.title;
					list.id = item.id;
					this.list.push(list);
				});
			}
		},

		change(index) {
			this.current = index;
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
		background-color: #ffffff;
		.tabs-list {
			width: 88%;
		}
	}
}
</style>
