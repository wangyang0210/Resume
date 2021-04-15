import EasyTyper from 'easy-typer-js'
export default {
	data() {
		return {
			windowHeight: 0,
			obj: {
				output: '',
				type: 'normal',
				isEnd: false,
				speed: 80,
				backSpeed: 40,
				sleep: 3000,
				singleBack: false,
				sentencePause: false
			}
		}
	},
	methods: {
		initTyped(input, fn, hooks) {
			const obj = this.obj
			const typed = new EasyTyper(obj, input, fn, hooks)
		}
	},
}
