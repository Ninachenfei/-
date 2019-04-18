<template>
    <div class="goodsInfo_container">

        <!--小球-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div @transitionend="transitionend" class="ball" v-show="flag"></div>
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
            <div class="mui-card-header">{{  goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>{{  goodsInfo.market_price}}元</del>
                        销售价: <span class="nowPrice">{{ goodsInfo.sell_price }}元</span>
                    </p>
                    <p>
                        购买数量: <number :max="goodsInfo.stock_quantity"
                    @getCount="getNum"></number>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
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
                    <p>商品货号: {{ goodsInfo.goods_no }}</p>
                    <p>库存情况: {{goodsInfo.stock_quantity }}</p>
                    <p>上架时间: {{goodsInfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button @click="goDesc(id)" type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button @click="goComment(id)" type="danger" size="large" plain>商品评论</mt-button>
            </div>

        </div>
    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import number from '../subcomponents/goodsInfo_number.vue'
    export default {
        name: "goodsInfo",
        components:{
            swiper,
            number
        },
        data(){
            return {
                id:this.$route.params.id,
                banner:[],//轮播图数据
                goodsInfo:{},//商品信息的数据
                flag: false,
                isShow: true,
                count: 0,//拿到的数量
                num:0
            }
        },
        created(){
            this.getBanner();
            this.getGoodsInfo();
            this.getNum();
        },
        methods:{
            //1.获取轮播图数据
            getBanner(){
                this.$http.get('api/getthumimages/'+this.id)
                    .then( result => {
                        if(result.body.status === 0){
                            // this.banner = result.body.message
                            //因为封装好了的组件设置的是item.img, 不一致, 所以遍历的追加一个item.img
                            result.body.message.forEach( item => {
                                item.img = item.src
                            })
                            this.banner = result.body.message
                        }
                    })
            },
            //2.获取商品信息
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.id).then( result => {
                    if(result.body.status === 0){
                        //把数组里面索引为0的对象赋值给data里面的数据
                        this.goodsInfo = result.body.message[0]
                    }
                })
            },
            //3.点击用js导航跳转到评论页面
            goComment(id){
                this.$router.push({name:'goodsComment', params:{id:id}})
            },
            //4.点击用js导航跳转到图文介绍
            goDesc(id){
                this.$router.push({name:'goodsDesc',params:{id}})
            },
            //5.点击添加购物车
            addCar(){
                this.num++;
                if(this.num < 2){
                    this.flag = !this.flag;
                }

                //点击添加到购物车, 把信息保存到store中的数据中 car
//每一条数据都是对象: { id: 商品的id, count: 购买的数量, price: 商品的单价, selected:商品的状态}
                let goodsList = {
                    id: this.id,
                    count: this.count,
                    price: this.goodsInfo.sell_price,
                    selected:true
                }
                this.$store.commit('addToCar',goodsList);


            },
            //6.设置小球的动画
            beforeEnter(el){

                    if(this.num < 2){
                        el.style.transform = 'translate(0,0)';
                    }

            },
            enter(el){
                if(this.num < 2){
                    el.offsetWidth;//强制刷新过渡效果

                    //解决因分辨率不同,需要计算坐标值-->  Element.getBoundingClientRect()
                    //获取小球的位置
                    let ball = document.querySelector(".ball").getBoundingClientRect();
                    //获取徽标的位置: 关于dom元素和所在的组件没有任何关系
                    let badge = document.querySelector(".mui-badge").getBoundingClientRect();
                    //console.log(ball,badge);
                    //求差
                    let x = badge.left - ball.left;
                    let y = badge.top - ball.top;

                    //el.style.transform = 'translate(80px,222px)';
                    el.style.transform = `translate(${x}px,${y}px)`;
                    el.style.transition = 'all 1s cubic-bezier(.4,-0.3,.89,.67)';
                    //done();
                }
            },
            afterEnter(el){
                el.style.transition = 'all 0s cubic-bezier(.4,-0.3,.89,.67)';
                    this.flag = !this.flag;
                    this.num = 0;
            },
            transitionend(){
                //console.log(this.num)
            },
            getNum(num){
                 num = num || 1;
                this.count = num;
                console.log('父亲拿到的值'+num)
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
                margin:10px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            left: 140px;
            top:430px;
            z-index: 999;
        }
    }

</style>