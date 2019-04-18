<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <!--将来, 谁使用, 谁就传递bannerList-->
            <mt-swipe-item v-for="item in bannerList" :key="item.id" >
                <img :src="item.img" alt="" :class="{'width':bol}">
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
            text-align: center;
            //background-color: pink;
            img{
                //width: 100%;
                height: 100%;
            }
        }
    }

</style>