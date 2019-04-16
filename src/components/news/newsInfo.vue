<template>
    <div class="newsInfo_container">
       <h4 class="title">{{newsInfo.title}}</h4>
        <p class="subTitle">
            <span>发表时间: {{ newsInfo.add_time | dateFormat('YYYY-MM-DD') }}</span>
            <span>点击次数: {{newsInfo.click}} 次</span>
        </p>
        <hr>
        <!--内容区域-->
        <div v-html="newsInfo.content">

        </div>
        <!--评论区域-->
        <!--调用子组件-->
       <comment :id="id"></comment>
    </div>
</template>

<script>
    /*导入子组件*/
    import comment from '../subcomponents/comment.vue'


    export default {
        name: "newsInfo",
        /*定义局部子组件*/
        components:{
           // comment:comment
            comment
        },
        data(){
           return{
               /*获取当前地址栏上面的参数*/
               id:this.$route.params.id,
               newsInfo:{}
           }
        },
        methods:{
             getNewsInfo(){
                 this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id)
                     .then(result=>{
                         if(result.body.status===0){
                             console.log(result);
                             this.newsInfo=result.body.message[0]
                         }
                     })
             }
        },
        created(){
             this.getNewsInfo()
        }
    }
</script>

<style scoped lang="scss">
    .newsInfo_container{
        padding: 0px 5px;
        .title{
            font-size: 16px;
            text-align: center;
            color:red;
            margin: 10px 0;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            color:dodgerblue;
            font-size: 14px;
        }
    }
</style>