<template>
    <div>
        <h2>{{ desc.title }}</h2>
        <hr>
        <div class="content" v-html="desc.content"></div>
    </div>
</template>

<script>
    export default {
        name: "goodsDesc",
        data(){
            return {
                desc:{}
            }
        },
        created(){
            this.getGoodsDesc()
        },
        methods:{
            getGoodsDesc(){
                this.$http.get('api/goods/getdesc/'+this.$route.params.id)
                    .then( result => {
                        if( result.body.status === 0){
                            this.desc = result.body.message[0]
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .content{
        img{
            width: 100%;
        }
    }

</style>