module.exports = {
	info: ['王洋洋', '前端开发工程师', '王洋洋'],
	resumeInfo: {
		'card': {
			'name': '王洋',
			'date': '2020年4月16日',
			'saw': '学无止境，谦卑而行。',
			'visit': 8908,
			'like': 8900,
			'comment': 1300
		},
		'cuIconList': [
			{
				cuIcon: 'weixin',
				color: 'green',
				badge: 120,
				name: '微信',
				type: 'save',
				value: '13888888888',
			}, {
				cuIcon: 'dianhua',
				color: 'orange',
				badge: 1,
				name: '电话',
				type: 'call',
				value: '13888888888',
			}, {
				cuIcon: 'mail',
				color: 'yellow',
				badge: 0,
				name: '邮箱',
				type: 'save',
				value: 'wangyang.0210@foxmail.com',
			}, {
				cuIcon: 'wenzi',
				color: 'olive',
				badge: 22,
				name: '博客园',
				type: 'save',
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
			},
		],
		'gridCol': 3,
		'gridBorder': false,
		'likeStyle': 'cuIcon-appreciate',
		'commentStyle': 'cuIcon-message',
		'phoneNumber': '13888888888',
		'email': 'wangyang.0210@qq.com',
		'skills': '1、xxxxxxxxxxxx；<br />' +
			  '2、xxxxxxxxxxxx；',
		'workExp': [{
				'date': '至今',
				'name': '公司名称',
				'post': '全栈开发工程师',
				'duty': '1. 职责1；<br />' +
					'2. 职责2；<br />' +
					'3. 职责3',
				'startDate': '2018.12'
			
			},
			{
				'date': '离职时间',
				'name': '公司名称',
				'post': '岗位',
				'duty': '1. 职责；',
				'startDate': '入职时间'

			}
		],
		'schools': [{
			'name': '学校名称',
			'maj': '专业名称',
			'startDate': '入学时间',
			'endDate': '毕业时间'
		}],
		'introSelf': {
			'name': '姓名',
			'selfAssessment': '自我评价'
		},
		'workInfo': [],
		'projList': [{
				'name': '项目名称',
				'intro': '项目介绍 | 企微助手是基于Electron开发的Windows桌面应用程序,其中主进程和渲染进程通过IPC进行通讯，主要服务于平安银行，大连交通银行，江西电信等。',
				'duty': '项目职责 | 1.	根据业务需求，针对技术难点进行攻克，并提供可实现方案，完成业务功能开发；<br />2.	封装高复用，可维护性好的方法，持续对代码进行迭代优化；<br />3.	操作文档和接口文档的编写更新；<br />',
				'tech': '项目使用技术 | 1. Electron<br />2. Vue+Element-ui<br />3. Node.js'
			}
		]
	}
}
