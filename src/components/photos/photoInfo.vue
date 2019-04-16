<template>
    <div class="photoInfo_container">
        <h4>哈哈哈</h4>
        <p>
            <span>发表时间:</span>
            <span>点击次数:</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
             <vue-preview :slides="list"></vue-preview>
        </div>
        <!--图片内容区域-->
        <div>
            <!--评论子组件区域-->
            <!--调用子组件-->
            <comment :id="id"></comment>
        </div>
    </div>
</template>

<script>
    /*导入子组件*/
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "photoInfo",
        /*定义局部子组件*/
        components:{
            // comment:comment
            comment
        },
        data(){
          return{
             id:this.$route.params.id,
              list:[]  /*存放缩略图的*/
          }
        },
        methods:{
            /*获取图片缩略图*/
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id)
                    .then(result=>{
                        if(result.body.status===0){
                            console.log(result.body.message);
                            /*遍历的不补全图片宽高和小图*/
                            result.body.message.forEach(item=>{
                                /*设置每条数据的小图 宽 高*/
                                item.msrc=item.src;
                                item.w=600;
                                item.h=400;
                            })
                            /*把设置好的数据给list*/
                           this.list=  result.body.message
                        }
                    })
            }
        },
        created(){
             this.getThumbs()
        }
    }
</script>

<style scoped lang="scss">

    figure{
        display:inline-block !important;
        img{
            width: 80px;
            height: 55px;
        }
    }

</style>