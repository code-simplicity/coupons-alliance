<template>
	<view class="unt-header-module">
		<u-navbar :is-back="false" title="" back-text="">
			<view class="left"><u-icon name="camera" color="#19114c" size="48"></u-icon></view>
			<view class="slot-wrap flex-align" slot="">
				<u-search
					@focus="focus"
					:show-action="false"
					shape="round"
					placeholder="输入商品名称"
					v-model="keyword"
				></u-search>
			</view>
		</u-navbar>
	</view>
</template>

<script>
/**
 * author	bugdr
 * time     2021-11-7 3:36:42 ?F10: PM?
 * description   头部组件
 */

export default {
	name: 'unt-header-module',
	data() {
		return {
			keyword: ''
		};
	},
	component: {},
	mounted() {},
	methods: {
		// 获取焦点跳转搜索页
		focus(val) {
			uni.navigateTo({
				url: '/pages/search/index',
				animationType: 'pop-in',
				animationDuration: 200
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.unt-header-module {
	.slot-wrap {
		flex: 1;
		padding: 0 10rpx 0 10rpx;
	}
	.left,
	.right {
		padding: 0 10rpx;
	}
}
</style>
