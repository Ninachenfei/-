<template>
    <div>

        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" value="1" ref="num" @change="countChanged" />
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>

    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "goodsInfo_number",
        props:['max'],
        mounted(){
            //初始化数字框的控件
            mui('.mui-numbox').numbox();
            console.log(this.max);//页面初始化完拿不到max值.需要监听
        },
        watch:{
            //监听数字的改变: 只要值改变, 就立马设置最大值
            'max': function (newVal) {
                console.log(newVal);
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        },
        methods:{
            countChanged(){
                //给元素添加ref属性. 值自己定义. 就能得到 $refs对象. 可以通过这个对象获取对应节点的一系列的值
                console.log(this.$refs.num.value)
                this.$emit('getCount',parseInt(this.$refs.num.value))
            }
        }
    }
</script>

<style scoped>

</style>