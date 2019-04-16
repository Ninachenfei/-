<template>
    <div>
        <!--调用子组件-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    /*导入子组件*/
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "ListComment",
        /*定义局部子组件*/
        components:{
            // comment:comment
            comment
        },
        data(){
            return{
                id:this.$route.params.id,
            }
        }
    }
</script>

<style scoped>

</style>