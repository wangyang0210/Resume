<template>
	<view class="flex color_gradient" :style="{height:windowHeight+'rpx'}" @click="userDetail">
		<view class="flex justify-center align-center">
			<view class="text-white text-bold text-sl text-center padding">{{ obj.output }}
				<span class="typed-cursor">|</span>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { printText } from '@/mixins/index.js'
	import { info } from '@/data/data.js'
	export default {
		mixins: [printText],
		data() {
			return {
					windowHeight:0,
					info,
					obj: {
						output: '',
						type: 'normal',
						backSpeed: 40,
						singleBack: true,
						sleep:3000
					  }
				}
		},
		
		created() {
			let that = this
			uni.getSystemInfo({
				success(res) {
					that.windowHeight = res.windowHeight*2
				}
			})
		},
		mounted() {
			this.initTyped(this.info)
		},
		methods: {
			userDetail(){
				wx.navigateTo({
				  url: '../info/index',
				})
			}
		}
	}
</script>
