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
								<view>{{card.name}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{card.saw}}
								</view>
							</view>
						</view>
					</view>
					<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
						<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @click="cardClick(item)">
							<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]" >
								<view class="cu-tag badge" v-if="item.badge!=0">
									<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
								</view>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs text-orange" > </text> {{card.visit}}
						<text class="margin-lr-xs" :class="likeStyle" @click="cardLike"></text> {{card.like}}
						<text class="margin-lr-xs" :class="commentStyle" @click="cardCompent"></text> {{card.comment}}
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
						<view class=" text-sm " v-html="skills"></view>
					</view>
				</view>			
			</view>
			
			<!-- 工作经历 -->
			<view class="cu-bar solid-bottom ">
				<view class="action">
					<text class="cuIcon-titles text-orange text-sm text-bold"></text>工作经历
				</view>
			</view>
			<view class="cu-timeline" v-for="(wk, index) in workExp" :key="index">
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
			<view class="cu-timeline" v-for="(school, index) in schools" :key="index">
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
								<view class="text-grey">{{introSelf.name}}</view>
								<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
									<view class="flex">
										<view class="flex-sub"> {{introSelf.selfAssessment}}</view>
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
			<view class="cu-timeline" v-for="(proj, key) in projList" :key="key">
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
	export default {
		mixins: [printText],
		components:{
				customerServer
			},
		data() {
			return {
					windowHeight:0,
					card: {
						'name': '王洋洋',
						'date': '2020年4月16日',
						'saw': '学无止境，谦卑而行。',
						'visit': 8908,
						'like': 8900,
						'comment': 1300
					},
					cuIconList: [{
						cuIcon: 'weixin',
						color: 'green',
						badge: 120,
						name: '微信',
						type:'save',
						value: '15551677671',
					}, {
						cuIcon: 'dianhua',
						color: 'orange',
						badge: 1,
						name: '电话',
						type:'call',
						value: '15551677671',
					}, {
						cuIcon: 'mail',
						color: 'yellow',
						badge: 0,
						name: '邮箱',
						type:'save',
						value: 'wangyang.0210@foxmail.com',
					}, {
						cuIcon: 'wenzi',
						color: 'olive',
						badge: 22,
						name: '博客园',
						type:'save',
						value: 'https://www.cnblogs.com/wangyang0210/',
					}, {
						cuIcon: 'github',
						color: 'cyan',
						badge: 0,
						name: 'github',
						type: 'save',
						value: 'https://github.com/wangyang0210'
					}, {
						cuIcon: 'location',
						color: 'blue',
						badge: 0,
						name: '地点',
						type: 'toast',
						value: '嘉定江桥'
					}],
					gridCol: 3,
					likeStyle: 'cuIcon-appreciate',
					commentStyle: 'cuIcon-message',
					phoneNumber: '15551677671',
					email:'wangyang.0210@qq.com',
					 obj: {
					        output: '',
							speed: 100
					      },
					skills: '1、 精通 HTML+CSS,熟悉 HTML5 与 CSS3 新特性;<br /> 2、 精通微信公众号开发，微信小程序开发;<br>3、 熟练使用 vue 框架并阅读过相关源码，熟练使用 Vue 全家桶（vue-cli，vue-router，vuex，axios）;<br>4、 熟知前端常见安全问题，并了解相应的防护措施；<br>5、 熟练使用 BootStrap 、Amaze UI、Vant、Element-ui, colorUI 等 UI 组件库；<br>6、 熟练掌握 ES6 语法;<br>7、 熟悉 React，Vue3.0 相关语法和 API；<br>8、 熟练使用 TP5 框架，Laravel 框架；9、 熟练使用 Linux/Unix 操作系统及常用命令，LAMP/LNMP 服务器的搭建和运维经验；<br>10、 熟练使用 Docker，熟悉 docker 服务部署和运维，熟练使用 Prometheus+Granfana+Altermanager；<br>11、 熟练使用 Git，npm 项目管理和包管理工具;<br>12、 熟练使用 MySQL，具有 SQL 优化，性能调优，数据库集群搭建，数据迁移，数据灾备实战经验；<br>13、 熟练使用 Redis，具有 Redis 集群搭建，性能优化，数据迁移等实战经验;<br>14、 熟练使用 nginx（Tengine），keepAlived，部署 keepAlived+Tengine 的高可用集群;<br>15、 熟练使用 Elasticsearch，filebeat，Logstash，Kibana，搭建 ELK 日志收集；<br>16、 熟练使用 GitLab+Jenkins 的 CI/CD，具有 GItLab 和 Jenkins 搭建经验；<br>17、 熟练使用 Node.js;<br>18、 熟练编写 shell 脚本；<br>19、 熟悉 APICloud，Electron;<br>',
					workExp: [
						{
							'date': '2021.4',
							'name': '上海沉甸数字技术有限公司',
							'post': '全栈开发工程师',
							'duty': '1. 针对不同客户提供相应的服务架构设计，并进行相关服务部署和运维，输出相应文档对客户进行培训；<br />2. 使用 SonarQube，Fortify，Acunetix 对代码和网站进行扫描并带领相关开发修复漏洞；<br />3. 协同产品经理验证功能的可实现性并对功能进行拆分，确定相关功能的实现方案和开发时长，进行相应分工；<br />4. 担任前端开发组长，带领前端开发成员按时完成相应开发任务，并与后端进行联调，确保功能可以按时上线；<br />5. 建立运维基建，搭建 JumpServer 管理所有服务器和数据库，搭建 Nightingale 配合阿里 ARMS 对所有服务器和应用进行监控，后随着应用容器化部署，监控切换到 Prometheus+Granfana+Altermanager 监控告警上'
							
						},
						{
							'date': '2018.11',
							'name': '合肥7316工作室',
							'post': 'PHP程序开发',
							'duty': '1. 根据产品需求，完成相应功能开发，并输出相应文档；<br />2. 服务器环境配置，应用部署，微信公众号开发；',
							'startDate': '2017.10'
							
						}
					],
					schools: [
						{
							'name': '安徽工商职业学院',
							'maj': '计算机网络技术及应用',
							'startDate': '2015.9',
							'endDate': '2018.6'
						}
					],
					introSelf: {
						'name': '王洋洋',
						'selfAssessment': '自我驱动力强，具有很强的分析问题和解决复杂问题的能力，有强烈的责任心和使命感，良好的沟通表达能力和团队写作能力。'
					},
					workInfo: [
						
					],
					projList: [
						{
							'name': '微信SCRM客户管理系统',
							'intro': '微信 SCRM 客户管理系统是一个集微信营销、微信管控、数据报表，MDM等功能的系统，目前服务于太平洋保险、平安寿险，平安好学，平安银行，途虎养车，上海电信，高顿教育，VIPKID等企业。',
							'duty': '1. 协同产品经理确认功能可实现性，提供实现方案，根据产品原型完成功能开发；<br />2. 根据业务需求，封装高复用，可维护性好的组件，持续提升页面兼容性和性能；<br />3. 通过 SonarQube，Fortify 对代码进行扫描，根据扫描报告对代码进行整改；<br />4. 通过 Acunetix 对网站进行扫描，对 web 安全漏洞进行修复，如 XSS，CSRF 等；<br />5. 提供服务架构设计，服务部署和运维，运维主要负责太平洋保险和上海电信，其中太平洋保险目前用户数700w+，上海电信为80w+；',
							'tech': '1. Vue+Element-ui<br />2. SpringBoot，SpringCloud，MyBatis<br />4. MySQL，Redis，kafka， Nginx，OSS，Dora，CDN，Docker<br />5. ARMS，Nightingale，Jenkins，Gitlab，Prometheus，Granfan，Altermanager，KafkaManager，RedisInsight'
						},
						{
							'name': '我的电信',
							'intro': '我的电信是一个集电子名片，在线咨询，办理业务为一体的微信小程序，通过用户的基本信息，手机号和地理位置信息来进行客户经理的匹配，由客户经理将用户引流到微信 SCRM 客户管理系统，后面为方便用户直接添加客户经理改为 H5页面通过微信 SCRM 客户管理系统中的微活码进行引流。',
							'duty': '1. 小程序账号申请，服务配置，成员管理，版本发布；<br />2. 小程序主体页面和主要功能开发，如登录分配客户经理逻辑，首页名片信息，在线聊天功能开发等；<br />3. 基于 Jshop 进行开发，实现用户管理，坐席管理，话术管理, 用户再分配，在线聊天等功能；',
							'tech': '1. mpvue+colorUI<br />2.ThinkPHP5.1+Layui+MySQL+GatewayWorker'
						},
						{
							'name': '太保通APP',
							'intro': '太保通 APP 是一个借助上海联通，山东电信实现的一个隐私小号外呼功能，便于坐席异地营销。',
							'duty': '1. 环境搭建，项目部署和运维，操作文档编写；<br />2. 太保通 APP 外呼功能改造使其支持，联调和电信呼叫功能；<br />3. 借助 Jshop 框架进行后台开发，实现职员管理，隐私小号管理，通讯录管理和通话记录管理等',
							'tech': '1. Vue+Vant<br />2. ThinkPHP5.1+Layui+MySQL+Redis+Ngin'
						},
						{
							'name': '百万智库达人 /十全十美健康生活',
							'intro': '百万智库达人/十全十美健康生活是一个集免费领奖和健康商城功能的公众号项目，主要是为了帮助上海电信进行公众号的运营，积累用户群体；',
							'duty': '1. 公众号开发配置，环境搭建和运维；<br />2. 抽奖列表页，抽奖详情页面功能开发，调整优化，模板消息，网页授权，自定义分享，微信支付等；<br />3. 使用 Echarts 生成每日统计图表，如每天参与人数，每个商品访问人数、抽奖人数等；<br />4. 通过腾讯移动分析对页面进行埋点分析；',
							'tech': '1.	Vue+Vant<br />2.	ThinkPHP5.1+Layui+MySQL+Redis+Nginx'
						}
					]
				}
		},
		created() {
		},
		mounted() {
			this.initTyped(this.skills)
		},
		methods: {
			cardLike() {
				let that = this
				uni.showModal({
					title:'( •̀ ω •́ )✧',
					content:'说实话,你是不是已经对我开始感兴趣了o(*￣▽￣*)ブ',
					success(res) {
						if(res.confirm) {
							that.likeStyle = 'cuIcon-appreciatefill text-orange'
							that.card.like+=1
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
							that.commentStyle = 'cuIcon-messagefill text-orange'
							that.card.comment+=1
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

