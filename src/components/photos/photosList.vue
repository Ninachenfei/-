<template>
    <div>
        <!--顶部tabbar选项模块-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <!--区域滚动模块-->
                    <div class="mui-scroll">
                        <a v-for="item in cates" :key="item.id"
                           :class="['mui-control-item',item.id==0?' mui-active':'']"
                           href="#item1mobile"
                        @click="getPhotosList(item.id)">
                            {{  item.title }}
                        </a>
                    </div>


            </div>


        </div>

        <!--图片列表区域-->
        <ul class="photoList">
            <router-link v-for="item in photosList" :key="item.id" tag="li"
             :to="'/home/photoInfo/'+item.id">
                <img v-lazy="item.img_url" alt="">
                <div class="info">
                    <h4>{{ item.title }}</h4>
                    <div class="mui-ellipsis-2">{{ item.zhaiyao }}</div>
                </div>
            </router-link>

        </ul>
    </div>
</template>

<script>

    /*1. 局部导入js文件*/
     import mui from '../../lib/mui/js/mui.min.js'
    //报错  分析: 1.mui.js可能用到了caller, callee, arguments等属性, 但是webpack打包好的main.js
    // 中, 可能默认启用了严格模式, 所以两者冲突
    //解决方案  1: 把mui.js中的非严格模式的代码改掉, 不现实
    //          2.把webpack打包时的严格模式禁用掉 插件: babel-plugin-transform-remove-strict-mode
    export default {
        name: "photosList",
        mounted(){//在mounted里面操作, 代表DOM元素已经渲染完成
            //2,初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            //3.tabbar栏失效,样式与导入的mui.js冲突. 修改了mui-tab-item的类名 样式不变
        },
        data(){
            return {
                cates:[],
                photosList:[]
            }
        },
        methods:{
            //4.获取图片分类的数据
            getAllCategory(){
                this.$http.get('api/getimgcategory')
                    .then( result => {
                        if(result.body.status === 0){
                            result.body.message.unshift({ title:'全部',id:0})
                            this.cates = result.body.message
                        }
                    })
            },
            //5.点击图片分类显示对应的图片列表
            getPhotosList(id){
                this.$http.get('api/getimages/'+id).then( result => {
                    if( result.body.status === 0){
                        this.photosList = result.body.message
                    }
                })
            }
        },
        created(){
            this.getAllCategory();
            //刷新时, 触发图片列表
            this.getPhotosList(0);//id为0时,展示全部的数据
        }
    }
</script>

<style scoped lang="scss">
 *{
     touch-action: pan-y;
 }

    .photoList{
        margin:0;
        padding: 10px;
            li{
                background-color: #ccc;
                text-align: center;
                list-style: none;
                margin-bottom: 10px;
                box-shadow: 0px 0px 10px #999;
                position: relative;
                overflow: hidden;
                img{
                    width: 100%;
                    display: block;
                }
                /*懒加载图片的样式*/
                img[lazy=loading] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
                .info{
                    text-align: left;
                    position: absolute;
                    color:white;
                    bottom: 0px;
                    background-color: rgba(0,0,0,.4);
                    max-height: 84px;
                    font-size: 14px;
                    padding-bottom:5px;
                }
            }

    }

</style>