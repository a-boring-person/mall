import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from 'vant';
// import 'vant/lib/index.css';
import api from '@/assets/config/api.js'
import axios from "axios";
import { Popup, Tab, Tabs } from 'vant';
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
import { TreeSelect } from "vant";
import { NavBar } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Toast } from 'vant';
import { Sku } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);

Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(Sku);

Vue.use(Toast);

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use(Popup);

Vue.use(NavBar);

Vue.use(TreeSelect);
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
Vue.use(Tab);
Vue.use(Tabs);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  
  render: h => h(App),
  data:{
    api:api,
    axios:axios
  }
}).$mount('#app')
