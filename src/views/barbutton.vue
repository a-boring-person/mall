<template>
    <!-- 底部导航栏 -->
    <div class="bar" style="margin-top:20px">
      <van-tabbar v-model="active" route>
      <van-tabbar-item name="home" icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="topic" icon="bookmark-o">专题</van-tabbar-item>
      <van-tabbar-item name="sort" icon="friends-o" replace to="/sort">分类</van-tabbar-item>
      <van-tabbar-item name="car" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item name="me" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
export default {
    data(){
        return {
            active:0
        }
    },
    mounted() {
        
        switch(this.$route.path){
                
                case "/category":
                
                    this.tabActive = 2;
                    break;
                case '/':
                    this.tabActive = 0;
                    break;
                default:
                    this.tabActive = 0;
            }
    },
    
}
</script>