<template>
    <div>
        <!--商品评论组件-->
        <comment :id="$route.params.id"></comment>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "goodsComment",
        components:{
            comment
        }
    }
</script>

<style scoped>

</style>