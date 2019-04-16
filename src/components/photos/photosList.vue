<template>
    <div>
        <!--顶部选项模块-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <!--区域滚动的模块-->
                    <div class="mui-scroll">
                        <a v-for="item in cates" :key="item.id"
                           :class="['mui-control-item',item.id==0?'mui-active':'']"
                           href="#item1mobile"
                           @click="getPhotosList(item.id)">
                           {{item.title}}
                        </a>

                    </div>

            </div>
        </div>
        <!--图片列表区域-->
        <ul class="photoList">
            <router-link v-for="item in photosList" :key="item.id" tag="li"
                         :to="'/home/photoInfo/'+item.id">
                <img v-lazy="item.img_url" alt="">
                <p>hhhh</p>
            </router-link>
        </ul>
    </div>

</template>

<script>

    /*局部导入js文件*/
    /*报错可能是因为mui中某些属性在webpack打包好的js中可能默认启用了严格模式
    * 所以两者冲突*/
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "photosList",
        mounted(){
          /*代表DOM元素已经渲染完成*/
            /*初始化滑动控件*/
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        data(){
            return{
                cates:[],
                photosList:[]  /*图片列表*/
            }
        },
        methods:{
            /*获取图片分类的数据*/
            getAllCategory(){
                this.$http.get('api/getimgcategory')
                    .then(result=>{
                        console.log(result);
                        if(result.body.status===0){
                            result.body.message.unshift({title:'全部',id:0})
                            this.cates=result.body.message
                        }

                    })
            },
            /*点击图片分类显示对应的图片列表*/
            getPhotosList(id){
                this.$http.get('api/getimages/'+id)
                    .then(result=>{
                        if(result.body.status===0){
                            this.photosList=result.body.message
                        }
                    })
            }
        },
        created(){
           this.getAllCategory();
           /*用户刷新的时候就触发一次图片列表*/
            this.getPhotosList(0);
        }
    }
</script>

<style scoped lang="less">
   *{
       touch-action: none;
   }
    li{
        list-style: none;
    }
    .photoList{
        margin: 0;
        padding: 5px;
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            /*盒子阴影*/
            box-shadow: 0px 0px 10px #999;
            img{
                width: 100%;
                display: block;
            }
            p{
               position:absolute;
            }
            /*懒加载图片是样式*/
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        }

    }
</style>