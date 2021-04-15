import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

//引入分享
import {share} from './mixins/index.js'
Vue.mixin(share)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()




