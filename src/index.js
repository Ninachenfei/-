//1.导入vue
import Vue from 'vue'
//导入公共组件
import app from './app.vue'
//导入路由
import router from './router.js'
//导入mui模块的样式
// import './lib/mui/js/mui.min.js'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'//导入mui扩展图标样式
//导入mint-ui
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
//全局配置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局配置post请求时表单数据的格式为普通表单格式
Vue.http.options.emulateJSON = true;

//导入时间插件
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern='YYYY-MM-DD HH:mm:ss') {
    //参数①: 需要格式化的时间的数据 ② 时间的格式
   return moment(dataStr).format(pattern)

})

//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import './app.scss'

import Vuex from 'vuex'
Vue.use(Vuex);

//每次加载页面时, 先从本地存储获取数据
let car = JSON.parse(localStorage.getItem('list') || '[]');

let store = new Vuex.Store({
    state:{
        // car:car
        car
    },
    mutations:{
        //1.点击添加到购物车, 把信息保存到store中的数据中 car
        addToCar(state, obj){
            //分析: 如果之前有对应的商品, 只需要更新数据
            //      没有对应的商品, 直接push进去
            let flag = false;

            state.car.some( item => {
                if( item.id == obj.id){
                    item.count += obj.count;
                    flag = true;
                    return true;
                }
            })
            //如果没有找到
            if(!flag){
                state.car.push(obj);
            }

            //存到loaclStrong里面去
            localStorage.setItem('list', JSON.stringify(state.car));

        },
        //4.更新商品的数量
        updateCount(state, obj){
            state.car.some( item => {
                //判断id是否一致
                if(item.id == obj.id){
                    item.count = parseInt(obj.count);
                    return true;
                }
            });
            //存到loaclStrong里面去
            localStorage.setItem('list', JSON.stringify(state.car));
        },
        //5.删除数量
        removeGoods(state, id){
            state.car.some( (item, i) => {
                if(item.id == id){
                    state.car.splice(i, 1);
                    return true;
                }
            })
            //存到loaclStrong里面去
            localStorage.setItem('list', JSON.stringify(state.car));
        },
        //6.更新商品的状态
        updateSelected(state, obj){
            state.car.some( item => {
                if(item.id == obj.id ){
                    item.selected = obj.selected;
                    return true;
                }
            })
            //存到loaclStrong里面去
            localStorage.setItem('list', JSON.stringify(state.car));
        }
    },
    getters:{
        //2.计算徽标
        getCount(state){
            let sum = 0 ;
            state.car.forEach( item =>{
                sum += item.count;
            });
            return sum;
        },
        //3.获取商品数量的方法
        getGoodsCount(state){
            //{  88 : 3 , 89 :5 }
            let num = {}
            state.car.forEach( item => {
                num[item.id] = item.count;
            })
            return num;
        },
        //7.自算总价
        getTotal(state){
            let num = {
                count:0,//数量
                allPrice:0//总价
            }
            state.car.forEach( item => {

                //判断商品为选中的状态
                if(item.selected){
                    num.count += item.count;
                    num.allPrice += item.count *item.price;
                }
            })

            return num;
        }
    }
})

/*
* 尝试在自己的手机上进行项目的预览和调试
* 1. 保证手机和开发项目的电脑处于同一wifi环境中
* 2.在项目  package.json文件中 dev 脚本 添加一个指令:   --host wifi的ip地址
*
* */


let vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,
    store
})