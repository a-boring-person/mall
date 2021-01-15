<template>
  <div class="currentsort">
    <div class="tabs">
      <van-tabs v-model="active">
        <van-tab
          :title="item.name"
          v-for="(item, index) in tablist"
          :key="index"
        >
          <van-cell-group>
            <van-cell :title="item.name" :label="item.front_name" />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in goodsList" :key="index" @click="retailmsg(item.id)">
          <van-image :src="item.list_pic_url" fit="contain" />
          <div class="name">{{ item.name }}</div>
          <div class="price">￥{{ item.retail_price }}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import api, { GoodsCategory, GoodsList } from "../assets/config/api";
export default {
  props: ["id"],
  data() {
    return {
      active: "",
      tablist: [],
      goodsList: [],
    };
  },
  async mounted() {
    let res = await axios.get(api.GoodsCategory, { params: { id: this.id } });
    console.log(res);
    this.tablist = res.data.data.brotherCategory;
  },
  watch: {
    active: async function(index) {
      console.log(index);
      let categoryId = this.tablist[index].id;
      let page = 1;
      let size = 10;
      let res = await axios.get(api.GoodsList, {
        params: { categoryId, page, size },
      });
      console.log(res);
      this.goodsList = res.data.data.goodsList;
    },

    
  },
  methods: {
        retailmsg:function(id){
            console.log(id);
            this.$router.push({name:'goodDetail',params: {id:id}})
            
        }
    },
};
</script>

<style lang="less">
.currentsort {
  .tabs {
    .van-cell {
      padding: 20px 16px;
      span {
        font-weight: bold;
      }
    }
  }
  .content {
    .van-grid-item__content {
      padding: 0%;
    //   将第二行的文字变成省略号
        .name{
            width: 178px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .price{
            color:red;
        }
    }
  }
}
</style>
