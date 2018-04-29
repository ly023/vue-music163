import backTop from './back-top.vue'
import VueBackTop from './main'

backTop.install = function (Vue) {
  Vue.component(backTop.name, backTop);
  Vue.prototype.$alert = VueBackTop;
}

export default backTop