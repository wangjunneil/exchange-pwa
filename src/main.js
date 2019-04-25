import {
  MdSpeedDial,
  MdIcon,
  MdList,
  MdAvatar,
  MdContent,
  MdToolbar,
  MdButton,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.css';
import 'vue-material/dist/theme/default-dark.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.use(MdSpeedDial);
Vue.use(MdIcon);
Vue.use(MdList);
Vue.use(MdAvatar);
Vue.use(MdContent);
Vue.use(MdToolbar);
Vue.use(MdButton);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
