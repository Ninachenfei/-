<template>
    <div>
        <h3>{{list.title}}</h3>
        <hr>
        <div v-html="list.content" class="content"></div>
    </div>
</template>

<script>
    export default {
        name: "goodsComment",
        data(){
            return{
                id:this.$route.params.id,
                list:[]
            }
        },
        methods:{
            getList(){
                this.$http.get('api/goods/getdesc/'+this.id)
                    .then(result=>{
                        if(result.body.status===0){
                            this.list=result.body.message[0]
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