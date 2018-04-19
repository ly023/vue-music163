/**
 * vuex入口文件
 **/
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'


Vue.use(Vuex)

export default new Vuex.Store({
   state: { // 驱动应用的数据源
     pageOverflowHidden: false,
   },
  // actions,
  mutations
})