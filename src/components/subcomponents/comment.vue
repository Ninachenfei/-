<template>
    <!--新闻内容下面的评论-->

        <div class="sub_container">
        <h4>发表评论</h4>
        <hr>
        <textarea v-model="msg" placeholder="请输入评论的内容(最多吐槽120字)" maxlength="120"></textarea>

            <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>

             <div class="list" v-for="(item,i) in comments" :key="item.id">
                   <div class="user">
                       第{{i+1}}楼   用户:{{item.user_name}}
                       发表时间:{{item.add_time | dateFormat}}
                   </div>
                   <div class="body">
                       {{item.content}}
                   </div>
             </div>

            <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
        </div>



</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "comment",
        props:['id'],
        data(){
          return{
              comments:[],
              msg:'',
              pageIndex:1
          }
        },
        methods:{
            /*获取用户输入的内容判断是否为空*/
            getComment(){
                console.log(this.id);
                this.$http.get('http://www.liulongbin.top:3005/api/getcomments/'+this.id+'?pageindex='+this.pageIndex)
                    .then(result=>{
                        console.log(result);
                        if(result.body.status===0){
                            // this.comments=result.body.message
                            // this.comments=this.comments.concat('result.body.message')
                            /*拼接新数组*/
                           this.comments=this.comments.concat(result.body.message);
                            console.log(this.comments);
                        }
                    })
            },
          /*点击发表评论*/
            postComment(){
                if(this.msg.trim().length==0){
                    Toast('评论内容不能为空')
                    return false;
                }
                /*提交评论数据*/
                /*参数一:地址 参数二:交给服务器的数据对象 参数三:定义提交格式为普通表单的格式*/
                this.$http.post('api/postcomment/'+this.id,{content:this.msg})
                    .then(result=>{
                        if(result.body.status==0){
                            console.log("ok");
                            /*拼接成对象加*/
                            let user={
                                user_name:'匿名用户',
                                add_time:Date.now(),
                                content:this.msg
                            }
                            this.comments.unshift(user);
                            this.msg=''
                        }
                    })

            },
            /*点击加载更多*/
            getMore(){
                this.pageIndex++;
                this.getComment();
            }
        },
        created(){
            this.getComment()
        }
    }
</script>

<style scoped lang="less">
      .sub_container{
          textarea{
              height: 80px;
              margin: 0;
              font-size: 14px;
          }
          .list{
              margin:5px 0;
              .user{
                  line-height: 30px;
                  background-color: #ccc;
                  font-size: 14px;
              }
              .body{
                  line-height: 35px;
                  text-indent: 2em;
              }
          }
      }

</style>