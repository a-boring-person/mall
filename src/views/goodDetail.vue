<template>
  <div class="fullmsg">
    <div class="navbar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="back"
      />
    </div>
    <div class="swipe">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="blue"
        width="375"
        height="350"
      >
        <van-swipe-item v-for="(item, index) in swipeList" :key="index">
          <img class="swipeimg" v-lazy="item.img_url" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="label">
      <van-icon name="passed" color="red" />
      <label for="" style="margin-right:20px">30天无忧退款</label>
      <van-icon name="passed" color="red" />
      <label for="" style="margin-right:20px">48小时快速退款</label>
      <van-icon name="passed" color="red" />
      <label for="">满88元免邮费</label>
    </div>

    <div class="info">
      <h3>{{ goodinfo.name }}</h3>
      <p class="des">{{ goodinfo.goods_brief }}</p>
      <p class="price">￥{{ goodinfo.retail_price }}</p>
    </div>

    <div class="select">
      <van-cell-group>
        <van-cell title="请选择规格数量" is-link @click="showPop" />
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
          12345
        </van-popup>
      </van-cell-group>
    </div>

    <div class="canshu">
      <h2>商品参数</h2>
      <div class="attr" v-for="(item, index) in attribute" :key="index">
        <div class="left">{{ item.name }}</div>
        <div class="right">{{ item.value }}</div>
      </div>
    </div>

    <div class="desc" v-html="goodinfo.goods_desc"></div>
    <div class="goodaction">
      <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import api from "../assets/config/api";
import Vue from "vue";
import { Lazyload } from "vant";
import { Toast } from "vant";
Vue.use(Lazyload);
export default {
  data() {
    return {
      show: false,
      swipeList: [],
      goodinfo: [],
      attribute: [],
    };
  },
  props: ["id"],
  async mounted() {
    let res = await axios.get(api.GoodsDetail, { params: { id: this.id } });
    console.log(res);
    this.swipeList = res.data.data.gallery;
    this.goodinfo = res.data.data.info;
    this.attribute = res.data.data.attribute;
  },
  methods: {
    showPop: function() {
      this.show = true;
    },
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    },
    back: function() {
      console.log(-1);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
.fullmsg {
  .swipe {
    .swipeimg {
      width: 100%;
      height: 100%;
    }
  }
  .label {
    font-weight: lighter;
    font-size: small;
  }
  .info {
    h3 {
      margin: 10px;
    }
    .des {
      margin: 10px;
      font-weight: lighter;
    }
    .price {
      margin: 10px;
      color: red;
    }
  }
  .canshu {
    .attr {
      display: flex;
      background-color: #efefef;
      .left {
        flex: 1;
      }
      .right {
        flex: 3;
        text-align: left;
        width: 270px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .desc {
    width: 100%;
    img {
      width: 100%;
      vertical-align: middle;
    }
    p {
      display: flex;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
