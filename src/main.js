import Vue  from 'vue'
import router from './router'
import 'libs/commons/reset.scss'

import store from 'store'

import Alert from 'fe-vue-alert'
Vue.use(Alert);


new Vue({
  router,
  store,
}).$mount('#app');



