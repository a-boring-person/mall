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

        <div class="content">
            <!-- <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox> -->
            <!-- <van-card
                 :num="item.number"
                 :price="item.retail_price"
                 :title="item.goods_name"
                 :thumb="item.list_pic_url"
            /> -->
            <van-checkbox-group v-model="result" >
                <van-checkbox :name="index" v-for="(item, index) in cartList" :key="index">
                    <van-card
                        :num="item.number"
                        :price="item.retail_price"
                        :title="item.goods_name"
                        :thumb="item.list_pic_url"
                    />
                </van-checkbox>
            </van-checkbox-group>

        </div>
    </div>
</template>
<script>
// import {mapState} from 'vuex';
import store from 'vuex'
import axios from 'axios'
import api from '../assets/config/api'
export default {
    data() {
        return {
            resule:[],
        }
    },
    computed: {
        cartList:function(){
            return this.$store.state.cartList;
        }

    },
    created() {
          this.$store.dispatch('AjaxCart')
    },
   
    mounted(){
         console.log(this.cartList)
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
            .van-card{
                display: flex;
            }
        }
    }
</style>