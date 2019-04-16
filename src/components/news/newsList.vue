<template>
    <div>
        <!--图文列表-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <!--点击跳转新闻内容-->
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h2>{{  item.title }}</h2>
                        <p class="mui-ellipsis">
                            <span>发表时间: {{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
                            <span>点击次数:{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>

            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: "newsList",
        data(){
            return {
                newslist:[]
            }
        },
        methods:{
            getList(){
                /*获取列表数据*/
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist')
                    .then(result=>{
                        console.log(result);
                        if(result.body.status===0){
                            this.newslist=result.body.message
                        }
                    })
            }
        },
        created(){
            this.getList()
        }
    }
</script>

<style scoped>

</style>