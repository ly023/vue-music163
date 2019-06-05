/**
 * 路由入口文件
 **/

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history' // html5 history模式
  // linkActiveClass: 'active' // v-link激活时添加的class，默认是`v-link-active`
});

router.beforeEach((from, to, next) => {
  // 修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }else{
    document.title = '网易云音乐';
  }

  next();
})

export default router;