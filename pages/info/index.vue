<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="color_gradient_info" :isBack="true">
			<block slot="backText">返回</block>
			<block class="text-white" slot="content">我的简历</block>
		</cu-custom>
		<!-- #ifdef MP-WEIXIN -->
		<customerServer></customerServer>
		<!-- #endif -->
			<!-- 个人信息 -->
			<view class="cu-card dynamic no-card">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg"  @click="stroke" style="background-image:url('https://cdn.jsdelivr.net/gh/wangyang0210/pic//imgs/avatar.jpg');"></view>
							<view class="content flex-sub">
								<view>{{resumeInfo.card.name}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{resumeInfo.card.saw}}
								</view>
							</view>
						</view>
					</view>
					<view class="cu-list grid" :class="['col-' + resumeInfo.gridCol,resumeInfo.gridBorder?'':'no-border']">
						<view class="cu-item" v-for="(item,index) in resumeInfo.cuIconList" :key="index" v-if="index<resumeInfo.gridCol*2" @click="cardClick(item)">
							<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" >
								<view class="cu-tag badge" v-if="item.badge!=0">
									<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
								</view>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs text-orange" > </text> {{resumeInfo.card.visit}}
						<text class="margin-lr-xs" :class="resumeInfo.likeStyle" @click="cardLike"></text> {{resumeInfo.card.like}}
						<text class="margin-lr-xs" :class="resumeInfo.commentStyle" @click="cardCompent"></text> {{resumeInfo.card.comment}}
					</view>
				</view>
			</view>
		
			<!-- 专业技能 -->
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange text-sm text-bold"></text>专业技能
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-item cuIcon-evaluate_fill text-orange">
					<view class="content">
						<view class=" text-sm " v-html="resumeInfo.skills"></view>
					</view>
				</view>			
			</view>
			
			<!-- 工作经历 -->
			<view class="cu-bar solid-bottom ">
				<view class="action">
					<text class="cuIcon-titles text-orange text-sm text-bold"></text>工作经历
				</view>
			</view>
			<view class="cu-timeline" v-for="(wk, index) in resumeInfo.workExp" :key="index">
				<view class="cu-time text-orange">{{wk.date}}</view>
				<view class="cu-item cuIcon-evaluate_fill text-orange">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">{{wk.name}}</view>
							<view class="cu-tag line-cyan">{{wk.post}}</view>
						</view>
						<view class="margin-top text-sm" v-html="wk.duty"></view>
					</view>
				</view>			
				<view class="cu-time">{{wk.startDate}}</view>
			</view>
			
			<!-- 教育经历 -->
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange text-sm text-bold"></text>教育经历
				</view>
			</view>
			<view class="cu-timeline" v-for="(school, index) in resumeInfo.schools" :key="index">
				<view class="cu-time">{{school.endDate}}</view>
				<view class="cu-item cuIcon-writefill text-orange">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">{{school.name}}</view>
							<view class="cu-tag line-cyan">{{school.maj}}</view>
						</view>
					</view>
				</view>
				<view class="cu-time">{{school.startDate}}</view>
				
			</view>
			
			<!-- 自我评价 -->
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange text-sm text-bold"></text>自我评价
				</view>
			</view>
			<view class="cu-card dynamic no-card" >
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item">
							<view class="cu-avatar round" style="background-image:url('https://cdn.jsdelivr.net/gh/wangyang0210/pic//imgs/avatar.jpg');"></view>
							<view class="content">
								<view class="text-grey">{{resumeInfo.introSelf.name}}</view>
								<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
									<view class="flex">
										<view class="flex-sub"> {{resumeInfo.introSelf.selfAssessment}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 项目经验 -->
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange text-sm text-bold"></text>项目经验
				</view>
			</view>
			<view class="cu-timeline" v-for="(proj, key) in resumeInfo.projList" :key="key">
				<view class="cu-item cuIcon-presentfill text-orange">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">项目名称</view>
							<view class="cu-tag line-cyan">{{proj.name}}</view>
						</view>
						<view class="margin-top text-sm">
							{{proj.intro}}
						</view>
						<view class="cu-capsule radius margin-top-sm">
							<view class="cu-tag bg-cyan">项目职责</view>
						</view>
						<view class="margin-top text-sm" v-html="proj.duty">
						</view>
						<view class="cu-capsule radius margin-top-sm">
							<view class="cu-tag bg-cyan">涉及技术</view>
						</view>
						<view class="margin-top text-sm" v-html="proj.tech"></view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import customerServer from "@/components/customerServer.vue";
	import { printText } from '@/mixins/index.js'
	import { resumeInfo } from '@/data/data.js'
	export default {
		mixins: [printText],
		components:{
				customerServer
			},
		data() {
			return {
					windowHeight:0,
					resumeInfo
				}
		},
		created() {
		},
		mounted() {
			this.initTyped(this.resumeInfo.skills)
		},
		methods: {
			cardLike() {
				let that = this
				uni.showModal({
					title:'( •̀ ω •́ )✧',
					content:'说实话,你是不是已经对我开始感兴趣了o(*￣▽￣*)ブ',
					success(res) {
						if(res.confirm) {
							that.resumeInfo.likeStyle = 'cuIcon-appreciatefill text-orange'
							that.resumeInfo.card.like+=1
						}
					}
				})
				
			},
			cardCompent() {
				let that = this
				uni.showModal({
					title:'io(*////▽////*)q',
					content:'啊嘞？竟然被你发现了我的偷懒~',
					success(res) {
						if(res.confirm) {
							that.resumeInfo.commentStyle = 'cuIcon-messagefill text-orange'
							that.resumeInfo.card.comment+=1
						}
					}
				})
			},
			stroke() {
				let that = this
				uni.showModal({
					title:'o((>ω< ))o',
					content:'麻麻说打头会变笨的啦o(TヘTo)',
					success(res) {
						if(res.confirm) {
							console.log('todo 确认按钮逻辑')
						}
					}
				})
			},
			cardClick(item) {
				if(item.type == 'save') {
					uni.setClipboardData({
					  data: item.value,
					  success (res) {
						//todo 成功后的逻辑
					  }
					})
				}
				
				if(item.type == 'call') {
					uni.makePhoneCall({
					  phoneNumber: item.value
					})
				}
				
				if(item.type == 'toast') {
					uni.showToast({
					  title: item.value,
					  icon: 'sucess',
					  duration: 2000
					})
				}
				
			},
		}
	}
</script>

<style scoped>
	.cu-timeline>.cu-item[class*="cuIcon-"]::before {
		background-color: inherit;
		font-size: 40rpx;
	}
	.cu-timeline>.cu-item>.content:not([class*="bg-"]) {
		background-color: #dcedc8;
		color: #333333;
	}
</style>

