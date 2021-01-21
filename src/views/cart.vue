<template>
    <div class="cart">
        <div class="label">
             <van-icon name="passed" color="red" />
            <label for="" style="margin-right:20px">30天无忧退款</label>
            <van-icon name="passed" color="red" />
            <label for="" style="margin-right:20px">48小时快速退款</label>
            <van-icon name="passed" color="red" />
            <label for="">满88元免邮费</label>
        </div>

        <div class="content" v-for="(item, index) in cartList" :key="index">
                    <van-checkbox v-model="item.checked" @click='checkedEvent(item)'>
                     <van-card
                    :num="item.number"
                    :price="item.retail_price"
                    :title="item.goods_name"
                    :thumb="item.list_pic_url"
                    />
                    </van-checkbox>      
        </div>

        <div class="submit">
            <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit">
                  <van-checkbox v-model="checkedAll">全选</van-checkbox>
            </van-submit-bar>
        </div>

        <barbutton></barbutton>
    </div>
    
</template>
<script>
// import {mapState} from 'vuex';
import store from 'vuex'
import axios from 'axios'
import api from '../assets/config/api'
import barbutton from '../views/barbutton.vue'
export default {
  components: { barbutton },
    data() {
        return {
            
            
        }
    },
    computed: {
        cartList:function(){
            return this.$store.state.cartList;
        },

        price:function(){
            return this.$store.state.cartTotal.checkedGoodsAmount*100;
        },
        checkedAll:{
            get(val){
            },
            set(){
                if (this.$store.state.cartTotal.goodsCount == this.$store.state.cartTotal.checkedGoodsCount) {
                    return true
                } else {
                    return false
                }
            }

        }

    },
    created() {
          this.$store.dispatch('AjaxCart')
    },
   
    mounted(){
         console.log(this.cartList)
    },

    methods: {
        checkedEvent:function(item){
            console.log(item)
            let res = axios.post(api.CartChecked,{isChecked: item.checked,productIds: item.product_id});
            console.log(res);
            this.$store.commit('setCarList',res.data.data.cartList)
            this.$store.commit('setCartTotal',res.data.data.cartTotal)
            this.$forceUpdate();


        },
        onSubmit:function(){

        }
    },
    
}

</script>

<style lang="less">
    .cart{
        .label {
            font-weight: lighter;
            font-size: small;
        }
        .content{
            .van-checkbox__label{
                display: flex;
                width: 100%;

            }
        }
    }
</style>