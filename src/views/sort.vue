<template>
  <div class="sort">
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        v-model="searchvalue"
        placeholder="商品搜索，共239款好物"
        input-align="center"
        style="margin-top:5px"
      />
    </div>
    <!-- 侧边导航 -->
    <div class="sidebar">
      <van-tree-select
        height="calc(100vh - 104px)"
        :items="barname"
        :main-active-index.sync="active"
        @click-nav="changeRight"
      >
        <template #content>
          <div class="bannerimg">
            <van-image
              :src="bannerimg"
              fit="contain"
              width="100%"
            />
          </div>
          <van-grid :column-num="3">
            <van-grid-item
              v-for="(item, index) in currentCategory"
              :key="index"
            >
              <van-image :src="item.wap_banner_url" fit="fix" @click="chooseSort(item.id)"/>
              <p>{{ item.name }}</p>
            </van-grid-item>
          </van-grid>
        </template>
      </van-tree-select>
    </div>
    <barbutton></barbutton>
  </div>
</template>
<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";
import api, { CatalogList,CatalogCurrent } from "../assets/config/api";
import barbutton from '../views/barbutton.vue'
//首先将要用到的vant组件引入到要使用vant样式的组件中，然后用Vue.use(vant组件)就可以在这个组件中使用了。


export default {
  name: "sort",
  components:{
      barbutton
  },
  data() {
    return {
      searchvalue: "",
      active:'',
      bannerimg:'',
      categorylist: [],
      currentCategory: [],
      subCategoryList: [],
    };
  },
  async mounted() {
    let res = await axios.get(api.CatalogList);
    console.log(res);
    this.categorylist = res.data.data.categoryList;
    this.bannerimg = res.data.data.currentCategory.banner_url;
    this.currentCategory = res.data.data.currentCategory.subCategoryList;
  },
  computed: {
    barname: function() {
      let arr = [];
      this.categorylist.forEach((item, index) => {
        item.text = item.name;
        arr.push(item);
      });
      return arr;
    },
  },
  methods: {
    changeRight: async function() {
        let id = this.categorylist[this.active].id;
        let res =  await axios.get(api.CatalogCurrent, { params: { id } });
        // console.log(res);
        this.bannerimg = res.data.data.currentCategory.banner_url;
        this.currentCategory = res.data.data.currentCategory.subCategoryList;
    },

    chooseSort:function(id){
      console.log(id);
      // 在函数中进行页面跳转
       this.$router.push({name:'sortid',params: {id:id}})

    }
  },
};
</script>
<style lang="less"></style>
