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
        <van-cell title="请选择规格数量" is-link />
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
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addcart"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <!-- 商品SKU -->
    <van-sku
      v-model="showSKU"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>
<script>
import axios from "axios";
import api from "../assets/config/api";
import Vue from "vue";
import { Lazyload } from "vant";
import { Toast } from "vant";
Vue.use(Lazyload);

let sku = {
  // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
  tree: [
    {
      k: "颜色", // skuKeyName：规格类目名称
      v: [
        {
          id: "30349", // skuValueId：规格值 id
          name: "红色", // skuValueName：规格值名称
        },
        {
          id: "1215",
          name: "蓝色",
        },
      ],
      k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    },
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "2", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "3", // 规格类目 k_s 为 s2 的对应规格值 id
    },
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      "s-1": "1", // 规格类目 k_s 为 s1 的对应规格值 id
      "s-2": "4", // 规格类目 k_s 为 s2 的对应规格值 id
    },
  ],
  price: "1.00", // 默认价格（单位元）
  stock_num: 227, // 商品总库存
};
export default {
  data() {
    return {
      showSKU: false,
      swipeList: [],
      goodinfo: [],
      attribute: [],
      sku: sku,
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg",
      },
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
    back: function() {
      console.log(-1);
      this.$router.go(-1);
    },

    onBuyClicked: function() {
      console.log("点击购买按钮");
    },
    onAddCartClicked: function() {
      console.log("点击购物车按钮");
    },
    addcart: function() {
      console.log("加入购物车");
      this.showSKU = true;
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
