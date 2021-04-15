<template>
	<view class="cu-item">
		<button class="line-red customer cuIcon-service text-orange typed-cursor" open-type="contact" bindcontact="handleContact"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleContact(e) {
				console.log(e.detail.path)
				console.log(e.detail.query)
			}
		}
	}
</script>
<style scoped>
	.cu-item {
		width: 100px;
		height: 100px;
		float: right;
		position: fixed;
		right: -20px;
		bottom: -20px;
		z-index: 100;
	}
	.customer {
		background-color: initial;
		font-size: 40px;
		z-index: 110;
	}
	.customer::after {
		border: none;
	}
</style>
