<template>
    <div class="goodsInfo_container">
        <!--小球-->
        <transition
                       @before-enter="beforeEnter"
                       @enter="enter"
                       @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>
        </transition>

       <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="banner" :bol="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{shop.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p class="price">
                       市场价: <del>{{shop.market_price}}元</del>
                       销售价: <span class="nowPrice">{{shop.sell_price}}元</span>
                   </p>
                    <p>
                        购买数量:{{shop.stock_quantity}}个
                    </p>
                    <p>
                        <mt-button type="primary" size="small"  @click="goDetail(item.id)">立即购买</mt-button>
                        <mt-button @click="addCar" type="danger" size="small">加入购物车</mt-button>
                    </p>

                </div>
            </div>

        </div>
        <!--商品参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{shop.goods_no}}</p>
                    <p>库存情况:{{shop.stock_quantity}}</p>
                    <p>上架时间:{{shop.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDetail(shop.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getPin(shop.id)">商品评论</mt-button>
            </div>
        </div>

        <!--评论商品区域-->
        <!--评论子组件-->

    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'

    export default {
        name: "goodsInfo",
        components:{
            swiper,
        },
        data(){
            return{
                id:this.$route.params.id,
                banner:[],/*轮播图数据*/
                shop:[],/*商品介绍数据*/
                flag:false
            }
        },
        created(){
           this.getBanner(),
            this.getShop()
        },
        methods:{
            /*获取轮播图数据*/
            getBanner(){
                this.$http.get('api/getthumimages/'+this.id)
                    .then(result=>{
                        if(result.body.status===0){
                            // this.banner=result.body.message
                             /*添加一个img 的key值*/
                            /*因为封装的好的组件设置的是item.img 和 item.src不一致所以遍历的追加 变成img*/
                            result.body.message.forEach(item=>{
                                item.img=item.src
                            })
                            this.banner=result.body.message
                        }
                })
            },
           /*轮播图下的商品说明数据*/
            getShop(){
                this.$http.get('api/goods/getinfo/'+this.id)
                    .then(result=>{
                        console.log(result);
                        if(result.body.status===0){
                            this.shop=result.body.message[0]
                        }
                    })
            },
            goDetail(id){
                console.log(this.$router);
                /*1.跳转到指定页面*/
                this.$router.push({name:'goodsComment',params:{id:id}})
            },
            getPin(id){
                console.log(this.$router);
                /*1.跳转到指定页面*/
                this.$router.push({name:'listComment',params:{id:id}})
            },
            addCar(){
                this.flag=!this.flag
            },
            /*设置小球动画*/
            beforeEnter(el){
                el.style.transform='translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth;
                /*解决应分辨率不同需要计算坐标值
                * Element.getBoundingClientRect()
                * */
                /*获取小球的位置*/
                let ball=document.querySelector(".ball").getBoundingClientRect();
                /*获取徽标的位置*/
                let badge=document.querySelector(".mui-badge").getBoundingClientRect();
                /*求差*/
                let x=badge.left-ball.left;
                let y=badge.top-ball.top;


                el.style.transform=`translate(${x}px,${y}px)`;
                el.style.transition='all 1s cubic-bezier(.4,-0.3,.89,.67)';
                done();
            },
            afterEnter(){
               this.flag=!this.flag
            }
        }
    }
</script>

<style scoped lang="scss">
   .goodsInfo_container{
       background-color: #eee;
       /*解决垂直方向外边距塌陷的问题*/
       overflow: hidden;
       .nowPrice{
           color:red;
           font-weight: bolder;
           font-size: 16px;
       }
       .mui-card-footer{
           display: block;
           button{
               margin: 10px 0;
           }
       }
       .ball{
           width: 15px;
           height: 15px;
           background-color: pink;
           border-radius: 50%;
           position: absolute;
           left:140px;
           top:430px;
           z-index: 999;
       }
   }
</style>