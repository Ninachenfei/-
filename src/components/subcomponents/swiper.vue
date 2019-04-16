<template>
    <div>
        <mt-swipe :auto="4000">
            <!--以后谁使用轮播图组件谁就使用bannerList-->
            <mt-swipe-item v-for="item in bannerList" :key="item.id">
                <img :src="item.img" alt="" :class="{width:bol}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props:['bannerList','bol']
    }
</script>

<style scoped lang="scss">
    .width{
        width: 100%;
    }
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            /*background-color:pink;*/
            text-align: center;
            img{
                /*width: 100%;*/
                height: 100%;
            }
        }
    }

</style>