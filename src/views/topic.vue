<template>
    <div class="topic">
        <van-grid :column-num="1">
             <van-grid-item v-for="(item,index) in topicList" :key="index">
                 <van-image :src="item.scene_pic_url" fit="fix"  />
                 <h4 class="title">{{item.title}}</h4>
                
                 
             </van-grid-item>
        </van-grid>
        <barbutton></barbutton>
    </div>
</template>
<script>
import barbutton from '../views/barbutton.vue'
import Vue from "vue";
import axios from "axios";
import api, { TopicList } from "../assets/config/api";
export default {
    data() {
        return {
            topicList:[]
            
        }
    },
    components:{barbutton},
    async mounted() {
        let res = await axios.get(api.TopicList)
        console.log(res);
        this.topicList = res.data.data.data;

        
    },
    
}
</script>

<style lang="less">
.topic{
    .title{
        margin:0%;
        position: absolute;
        top:20px;
        left:20px
    }
    .van-grid-item__content{
        padding: 0%;
    }
   
}
    
</style>