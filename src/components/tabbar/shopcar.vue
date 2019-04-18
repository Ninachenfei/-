<template>
    <div class="shopcar_container">
        <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch
                    v-model="$store.state.car[i].selected"
                    @change="selected(item.id,$store.state.car[i].selected)"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{ item.title }}</h1>
                        <p class="item">
                            <span class="price">¥{{ item.sell_price }}</span>
                            <number :initCount="$store.getters.getGoodsCount[item.id]"
                                :goodsId="item.id"></number>

                            <a href="#" @click.prevent="remove(i, item.id)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>


        <div>
            勾选商品:  {{ $store.getters.getTotal.count }}
            总价:  {{ $store.getters.getTotal.allPrice }}
        </div>

    </div>
</template>

<script>
    import  number from '../subcomponents/shopcar_number.vue'
    export default {
        name: "shopcar",
        components:{
            number
        },
        data(){
            return {
                goodsList:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            //1.获取购物车商品列表
            getGoodsList(){
                //获取商品的id
                let idArr = [];
                this.$store.state.car.forEach( item => idArr.push(item.id));
                //如果购物车没有商品, 则直接返回, 否则会报错
                if(idArr.length <= 0) return false;
                console.log(idArr.join(','))

                this.$http.get('api/goods/getshopcarlist/'+idArr.join(','))
                    .then( result => {
                        if( result.body.status == 0){
                            this.goodsList = result.body.message;
                        }
                    })

            },
            //2.点击删除
            remove(index, id){
                this.goodsList.splice(index, 1);

                this.$store.commit('removeGoods' ,id)

            },
            //3.更新状态
            selected(id, selected){
                console.log(id, selected);

                this.$store.commit('updateSelected',{id: id, selected: selected})
            }
        }
    }
</script>

<style scoped lang="scss">
    .shopcar_container{
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner{
            display: flex;
            /*纵向居中*/
            align-items: center;
            img{
                width: 50px;
            }
            h1{
                font-size: 14px;
            }
            .info{
                .item{
                    display: flex;
                    align-items: center;
                }
                .price{
                    color:red;
                    font-weight: bolder;
                    margin-right: 10px;
                }
            }
        }

    }

</style>