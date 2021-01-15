<template>
  <div class="home">
    <van-search
      v-model="searchvalue"
      placeholder="商品搜索，共239款好物"
      input-align="center"
      style="margin-top:5px"
    />
    <van-swipe
      :autoplay="3000"
      lazy-render
      width="375"
      height="200"
      style="margin-top:5npmpx"
    >
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swipeimg" :src="image.image_url" />
      </van-swipe-item>
    </van-swipe>
    <van-grid column-num="5">
      <van-grid-item
        v-for="(item, index) in channel"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>
    <!-- 品牌制造商 -->
    <div class="brandlist">
      <van-cell-group>
        <van-cell title="品牌制造商直供" />
      </van-cell-group>
      <van-grid column-num="2">
        <van-grid-item v-for="(item, index) in brandlist" :key="index">
          <van-image :src="item.new_pic_url" fit="fix" />
          <h4 class="name">{{ item.name }}</h4>
          <p class="price">{{ item.floor_price }}元起</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 新品首发 -->
    <div class="newgoods">
      <van-cell-group>
        <van-cell title="周一周四新品首发" />
      </van-cell-group>
      <van-grid column-num="2">
        <van-grid-item v-for="(item, index) in newgoods" :key="index">
          <van-image :src="item.list_pic_url" fit="fix" />
          <h4 class="name">{{ item.name }}</h4>
          <p class="price">{{ item.retail_price }}元起</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 人气推荐 -->
    <div class="conmend">
      <van-cell-group>
        <van-cell title="人气推荐" />
      </van-cell-group>
      <van-grid column-num="1">
        <van-grid-item v-for="(item, index) in commendgoods" :key="index">
          <van-card
            :price="item.retail_price"
            :desc="item.goods_brief"
            :title="item.name"
            :thumb="item.list_pic_url"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <barbutton></barbutton>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
import api from "../assets/config/api";
import barbutton from '../views/barbutton';
//首先将要用到的vant组件引入到要使用vant样式的组件中，然后用Vue.use(vant组件)就可以在这个组件中使用了。
import {
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Icon,
  Cell,
  CellGroup,
  Card,
} from "vant";
import { Image as VanImage } from "vant";
import { Tabbar, TabbarItem } from "vant";
import Barbutton from './barbutton.vue';


Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Card);
Vue.use(VanImage);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  name: "Home",
  components: {
    barbutton,
  },
  async mounted() {
    let res = await axios.get(api.IndexUrl);
    // console.log(res);
    this.images = res.data.data.banner;
    this.channel = res.data.data.channel;
    this.brandlist = res.data.data.brandList;
    this.newgoods = res.data.data.newGoodsList;
    this.commendgoods = res.data.data.hotGoodsList;
  },
  data() {
    return {
      searchvalue: "",
      images: [],
      channel: [],
      brandlist: [],
      newgoods: [],
      commendgoods: [],
      active:''
    };
  },
};
</script>
<style lang="less">
.home {
  .swipeimg {
    width: 100%;
    height: 100%;
  }
  .brandlist {
    .van-grid-item__content {
      padding: 0;
    }
    .name {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .price {
      position: absolute;
      top: 30px;
      left: 10px;
    }
  }
  .newgoods {
    .van-grid-item__content {
      padding: 0;
    }
    .name {
      margin: 0;
    }
    .price {
      margin: 0;
    }
  }
  .conmend {
    .van-card__title {
      font-weight: 900;
      color: #333;
      font-size: 16px;
    }
    .van-card__price {
      color: red;
    }
    .van-card__content {
      justify-content: center;
      text-align: left;
    }
  }
}
</style>
