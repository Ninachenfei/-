/*导入vue*/
import Vue from 'vue'
/*导入公共组件*/
import app from './app.vue'
/*导入路由模块*/
import router from './router.js'
/*导入mui模块*/
// import './lib/mui/js/mui.js'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

/*导入mint-ui*/
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

/*导入vue-resource模块*/
import VueResource from 'vue-resource'
Vue.use(VueResource)

/*全局配置请求的根路径*/
Vue.http.options.root='http://www.liulongbin.top:3005/'
/*全局陪值post请求表单数据的普通表单格式格式*/
Vue.http.options.emulateJSON=true;

/*导入时间插件*/
import moment from 'moment'
/*全局过滤器*/
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
    /*需要格式化的时间数据
    * 时间的格式
    * */
   return  moment(dataStr).format(pattern)
})


/*导入图片预览插件*/
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import './app.scss'

let vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})