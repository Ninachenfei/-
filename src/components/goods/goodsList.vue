<template>
    <div class="goods_list">
        <!--<router-link :to="'/home/goodsInfo/'+item.id" tag="div" class="goods_item" v-for="item in goodslist" :key="item.id">-->
            <!--<img :src="item.img_url" alt="">-->
            <!--<h2 class="title">{{item.title}}</h2>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">&yen;{{item.market_price}}元</span>-->
                    <!--<span class="old">&yen; {{item.sell_price}}元</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩余 {{item.stock_quantity}}件</span>-->
                <!--</p>-->
            <!--</div>-->

        <!--</router-link>-->


        <div @click="goDetail(item.id)" class="goods_item" v-for="item in goodslist" :key="item.id">
            <img :src="item.img_url" alt="">
            <h2 class="title">{{item.title}}</h2>
            <div class="info">
                <p class="price">
                    <span class="now">&yen;{{item.market_price}}元</span>
                    <span class="old">&yen; {{item.sell_price}}元</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余 {{item.stock_quantity}}件</span>
                </p>
            </div>

        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "goodsList",
        data(){
          return{
              goodslist:[],
              pageIndex:1

          }
        },
        methods:{
           getGoodsList(){
               this.$http.get('api/getgoods?pageindex=1')
                   .then(result=>{
                       console.log(result);
                         if(result.body.status===0){
                             this.goodslist=result.body.message
                             // /*拼接新数组*/
                             // this.goodslist=this.goodslist.concat(result.body.message);
                             // console.log(this.goodslist);
                         }
                   })
           },
            /*点击加载更多*/
            getMore(){
                this.pageIndex++;
                this.getComment();
            },
            /*使用js跳转路由*/
            goDetail(id){
                console.log(this.$router);
                /*区分this.$route 路由的参数对象
                * this.$router 路由的导航对象 用它可以很方便的使用js代码 实现路由的前进 后退 跳转到新的url地址
                * */
               /*1.跳转到指定页面*/
                // this.$router.push('/home/goodsInfo/'+id)
                /*2.传递对象*/
                // this.$router.push({path:'/home/goodsInfo/'+id})
                /*3.传递命名的路由*/
                this.$router.push({name:'goodsInfo',params:{id:id}})
            }
        },
        created(){
            this.getGoodsList()
        }
    }
</script>

<style scoped lang="scss">
   .goods_list{
       display: flex;
       justify-content: space-between;
       flex-wrap: wrap;
       padding: 8px;
       .goods_item{
           width: 49%;
           border: 1px solid #ccc;
           box-shadow: 0 0 10px #ccc;
           margin: 5px 0;
           flex-direction: column;
           justify-content: space-between;
           img{
               width: 100%;
           }
           .title{
               font-size: 14px;
           }
           .info{
               background-color: #eeeeee;
               p{
                   margin: 0;
                   padding: 5px;
                   .now{
                       color:red;
                       font-weight: bolder;
                   }
                   .old{
                       text-decoration: line-through;
                       font-size: 12px;
                       margin-left: 15px;
                   }
               }
               .sell{
                   display: flex;
                   justify-content:space-between;
               }
           }
       }
   }
</style>