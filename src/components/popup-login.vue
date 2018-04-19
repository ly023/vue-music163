<template>
    <popup :isShow.sync="show" :title="title">
      <div class="popup-login">
          <div class="clearfix popup-login-guide" v-if="mode === LOGIN_MODE.GUIDE.CODE">
              <div class="fl popup-login-guide-main">
                  <div class="popup-login-guide-platform"></div>
                  <a href="javascript:;" class="popup-login-btn" @click="changeMode(LOGIN_MODE.MOBILE.CODE)"><i>手机号登录</i></a>
                  <a href="javascript:;" class="popup-sign-up-btn" @click="changeMode(LOGIN_MODE.SIGN_UP.CODE)"><i>注册</i></a>
              </div>
              <ul class="popup-login-guide-right">
                  <li class="popup-login-item">
                      <a href="http://music.163.com/api/sns/authorize?snsType=10&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
                         target="_blank"><i class="popup-login-item-wechat"></i>微信登录</a>
                  </li>
                  <li class="popup-login-item">
                      <a href="http://music.163.com/api/sns/authorize?snsType=5&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
                         target="_blank"><i class="popup-login-item-qq"></i>QQ登录</a>
                  </li>
                  <li class="popup-login-item">
                      <a href="http://music.163.com/api/sns/authorize?snsType=2&amp;clientType=web2&amp;callbackType=Login&amp;forcelogin=true"
                         target="_blank"><i class="popup-login-item-blog"></i>微博登录</a>
                  </li>
                  <li class="popup-login-item">
                      <a href="javascript:;" @click="changeMode(LOGIN_MODE.EMAIL163.CODE)"><i class="popup-login-item-email"></i>网易邮箱帐号登录</a>
                  </li>
              </ul>
          </div>
          <div class="popup-login-mobile" v-else-if="mode === LOGIN_MODE.MOBILE.CODE">
              <div class="popup-login-phone-wrapper">
                  <a class="popup-login-code-current" href="javascript:;"
                     @click="isShowSelect = !isShowSelect">
                      <span>+{{ areaCode[activeIndex][3] }}</span>
                      <span class="popup-login-icon popup-login-arrow"></span>
                  </a>
                  <div class="popup-login-input-wrapper">
                      <input type="text" class="popup-login-input popup-login-phone-number" placeholder="请输入手机号"
                      v-model="mobileNumber" @input="checkNumber">
                  </div>
                  <!-- 国家区号列表 -->
                  <ul class="popup-login-code-options" v-show="isShowSelect">
                      <li class="clearfix popup-login-code-item"
                          v-for="(code, index) in areaCode" :data-index="index" :key="index" @click="selectAreaCode(index)">
                          <span class="fl">{{ code[1] }}</span>
                          <span class="fr">+{{ code[3] }}</span>
                      </li>
                  </ul>
              </div>
              <input type="password" class="mt-10 popup-login-input popup-login-password" placeholder="请输入密码">
              <div class="popup-login-option">
                  <label><input type="checkbox" v-model="mobileAutoLogin">自动登录</label>
                  <a href="javascript:;" @click="changeMode(LOGIN_MODE.RESET_PASSWORD.CODE)" class="fr popup-login-option-link">忘记密码？</a>
              </div>
              <a href="javascript:;" hidefocus="true" class="popup-login-btn"><i>登录</i></a>
          </div>
          <div class="popup-login-sign-up" v-else-if="mode === LOGIN_MODE.SIGN_UP.CODE">

          </div>
          <div class="popup-login-email" v-else-if="mode === LOGIN_MODE.EMAIL163.CODE">
              <div class="popup-login-input-item">
                  <input type="text" class="popup-login-input" placeholder="请输入帐号">
                  <!-- 建议列表 -->
                  <ul class="popup-login-email-suggest">
                      <li></li>
                  </ul>
              </div>
              <div class="mt-10 popup-login-input-item">
                  <input type="password" class="popup-login-input" placeholder="请输入密码">
              </div>
              <div class="popup-error-msg popup-login-error" v-if="errorMsg">
                  <i class="popup-login-icon"></i><span>{{ errorMsg }}</span>
              </div>
              <div class="popup-login-option">
                  <label><input type="checkbox" v-model="emailAutoLogin">自动登录</label>
                  <a href="//reg.163.com/getpasswd/RetakePassword.jsp" target="_blank"
                     class="fr popup-login-option-link">忘记密码？</a>
              </div>
              <a class="popup-login-btn" hidefocus="true" href="javascript:;"><i>登　录</i></a>
          </div>
          <div class="popup-login-reset" v-else>
              <div class="popup-login-reset-step">
                  <p class="popup-login-label">手机号：</p>
                  <div class="popup-login-phone-wrapper">
                      <a class="popup-login-code-current" href="javascript:;" @click="isShowSelect = !isShowSelect">
                          <span>+86</span>
                          <span class="popup-login-icon popup-login-arrow"></span>
                      </a>
                      <div class="popup-login-input-wrapper">
                          <input type="text" class="popup-login-input popup-login-phone-number" placeholder="请输入手机号">
                      </div>
                  </div>
                  <p class="mt-10 popup-login-label">密码：</p>
                  <input type="password" class="mt-10 popup-login-input popup-login-password"
                         placeholder="设置登录密码，不少于6位">
                  <div class="popup-login-error"><i class="popup-login-icon"></i><span></span></div>
                  <div class="mt-10">
                      <a class="popup-login-btn" hidefocus="true" href="javascript:;"><i>下一步</i></a>
                  </div>
              </div>
              <div class="popup-login-reset-step">
                  <div class="n-log2 n-log2-2">
                      <div class="js-mobwrap f-pdb20">
                          <p class="s-fc3">你的手机号：<strong class="s-fc1">+<span class="js-code">86</span>&nbsp;<span class="js-mob">132****3235</span></strong></p>
                          <p class="s-fc4 f-mgt5">为了安全，我们会给你发送短信验证码</p>
                      </div>
                      <div class="js-mobwrap f-hide f-pdb10">
                          <div class="s-fc3"><label class="js-lbl"></label></div>
                          <div class="f-mgt10">
                              <div class="u-txtwrap">
                                  <span class="u-prefix">+86</span>
                                  <input type="text" class="js-txt u-txt" placeholder="请输入手机号" id="auto-id-zxrDHwMuWm0pCg8X">
                              </div>
                          </div>
                          <div class="s-fc3 f-mgt10"><label>验证码：</label></div>
                      </div>
                      <div class="f-cb">
                          <input type="text" class="js-txt u-txt u-txt2" placeholder="请输入验证码" value="" id="auto-id-aO3P2TTmDfPlFBr0">
                          <span class="js-cd u-cd"> 00:06 </span>
                          <a href="#" class="js-send u-btn2 u-btn2-1 f-hide" data-action="send"><i>获取验证码</i></a>
                      </div>
                      <div class="u-err" style="display: none;"><i class="u-icn u-icn-25"></i><span></span></div>
                      <div class="f-mgt20">
                          <a class="js-next u-btn2 u-btn2-2" hidefocus="true" href="#" data-action="next"><i>下一步</i></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        <div class="popup-login-mode" v-if="mode === LOGIN_MODE.MOBILE.CODE">
            <a href="javascript:;" class="popup-login-link-primary" @click="changeMode(LOGIN_MODE.GUIDE.CODE)">&lt;&nbsp;&nbsp;其他登录方式</a>
            <a href="javascript:;" class="fr" @click="changeMode(LOGIN_MODE.SIGN_UP.CODE)">没有帐号？免费注册&nbsp;&nbsp;></a>
        </div>
        <div class="popup-login-mode" v-else-if="mode === LOGIN_MODE.SIGN_UP.CODE || mode === LOGIN_MODE.RESET_PASSWORD.CODE">
            <a href="javascript:;" class="popup-login-link-primary" @click="changeMode(LOGIN_MODE.GUIDE.CODE)">&lt;&nbsp;&nbsp;返回登录</a>
        </div>
        <div class="popup-login-mode" v-else-if="mode === LOGIN_MODE.EMAIL163.CODE">
            <a href="javascript:;" class="popup-login-link-primary" @click="changeMode(LOGIN_MODE.GUIDE.CODE)">&lt;&nbsp;&nbsp;其他登录方式</a>
        </div>
    </popup>
</template>


<script>
   import Vue from 'vue'
   import './popup.vue'

   import areaCode from 'assets/area-code'


   const LOGIN_MODE = {
     GUIDE: {
       CODE: 0,
       TEXT: '登录',
       TITLE: '登录'
     },
     SIGN_UP: {
       CODE: 1,
       TEXT: '手机号注册',
       TITLE: '手机号注册'
     },
     MOBILE: {
       CODE: 2,
       TEXT: '手机号登录',
       TITLE: '手机号登录'
     },
     EMAIL163: {
       CODE: 3,
       TEXT: '网易邮箱账号登录',
       TITLE: '邮箱登录'
     },
     RESET_PASSWORD: {
       CODE: 4,
       TEXT: '重设密码',
       TITLE: '重设密码'
     }
   }

   let component = {
     props: {
       isShowPopup: {
         type: Boolean,
         default: false
       },
       loginMode: {
         type: Number,
         default: LOGIN_MODE.MOBILE.CODE
       }
     },
     computed: {
       show: {
         get () {
           return this.isShowPopup;
         },
         set (newValue) {
           this.$emit('update:isShowPopup', newValue);
         }
       },
       mode: {
         get () {
           return this.loginMode;
         },
         set (newValue) {
           this.$emit('update:loginMode', newValue);
         }
       },
       title () {
         if (this.loginMode === LOGIN_MODE.GUIDE.CODE) {
           return LOGIN_MODE.GUIDE.TITLE;
         }else if(this.loginMode === LOGIN_MODE.SIGN_UP.CODE){
           return LOGIN_MODE.SIGN_UP.TITLE;
         } else if(this.loginMode === LOGIN_MODE.MOBILE.CODE){
           return LOGIN_MODE.MOBILE.TITLE;
         }else if(this.loginMode === LOGIN_MODE.RESET_PASSWORD.CODE){
           return LOGIN_MODE.RESET_PASSWORD.TITLE;
         }
         return LOGIN_MODE.EMAIL163.TITLE;
       }
     },
     data: ()=>({
       LOGIN_MODE: LOGIN_MODE,
       isShowSelect: false,
       areaCode: areaCode,
       activeIndex: 0,
       mobileNumber: '',
       mobileAutoLogin: true,
       emailAutoLogin: true,
       errorMsg: '',
     }),
     methods: {
       changeMode (mode) {
         this.mode = mode;
       },
       selectAreaCode (index) {
         this.activeIndex = index;
         this.isShowSelect = false;
       },
       checkNumber () {
         // 手机号验证



       }
     }
   }

   Vue.component('popup-login', component)

   export default component
</script>

<style lang="scss" type="text/scss">
    .popup-login-btn,
    .popup-login-btn > i,
    .popup-sign-up-btn,
    .popup-sign-up-btn > i {
        display: inline-block;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        background: url(~assets/images/button2.png) no-repeat 0 9999px;
        cursor: pointer;
        padding: 0 5px 0 0;
        white-space: nowrap;
        color: #fff;
    }

    .popup-login-btn > i,
    .popup-sign-up-btn > i {
        width: 184px;
        padding: 0 15px 0 20px;
    }

    .popup-login-btn,
    .popup-sign-up-btn {
        width: 219px;
        margin-top: 10px;
    }

    .popup-login-btn {
        background-position: right -428px;
    }

    .popup-login-btn:hover {
        background-position: right -510px;
    }

    .popup-login-btn:hover > i {
        background-position: 0 -469px;
    }

    .popup-login-btn > i {
        background-position: 0 -387px;
    }

    .popup-sign-up-btn {
        background-position: right -100px;
    }

    .popup-sign-up-btn > i {
        color: #333;
        background-position: 0 -59px;
    }

    .popup-sign-up-btn:hover {
        background-position: right -182px;
    }

    .popup-sign-up-btn:hover > i {
        background-position: 0 -141px;
    }



    .popup-login-sign-up,
    .popup-login-mobile,
    .popup-login-email,
    .popup-login-reset{
        margin: -10px auto 0;
        padding: 0 0 3px;
        width: 220px;
    }


    /* login */

    .popup-login-phone-wrapper {
        position: relative;
        z-index: 10;
        height: 30px;
        margin: 0;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
    }

    .popup-login-code-current {
        position: relative;
        float: left;
        height: 30px;
        line-height: 30px;
        padding: 0 18px 0 5px;
        border-right: 1px solid #cdcdcd;
    }

    .popup-login-icon {
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
    }

    .popup-login-arrow {
        position: absolute;
        top: 14px;
        right: 7px;
        width: 7px;
        height: 4px;
        background: url(~assets/images/icon2.png) no-repeat -260px -450px;
    }

    .popup-login-input-wrapper {
        overflow: hidden;
    }

    .popup-login-input.popup-login-phone-number {
        border: none;
    }

    .popup-login-code-options {
        position: absolute;
        top: 31px;
        left: -1px;
        width: 100%;
        height: 128px;
        border: 1px solid #CDCDCD;
        border-top: none;
        background-color: #FFF;
        overflow: auto;
    }

    .popup-login-code-item {
        overflow: hidden;
        padding: 0 10px 0 7px;
        height: 32px;
        line-height: 32px;
        color: #333;
        cursor: pointer;
    }

    .popup-login-code-item:hover {
        background-color: #EAEAEA;
    }

    /* reset */


    .popup-login-reset {

    }

    .popup-login-label {
        color: #666;
    }

    .popup-login-reset .popup-login-phone-wrapper {
        margin-top: 10px;
    }









    .popup-login-guide-platform {
        height: 120px;
        background: url(~assets/images/platform.png) no-repeat 13px 0;
    }

    .popup-login-guide-main {
        width: 224px;
        padding: 0 35px 3px 40px;
        border-right: 1px dotted #CCC;
    }

    .popup-login-guide-right {
        float: left;
        padding: 3px 0 3px 39px;
        margin-top: -15px;
    }

    .popup-login-item {
        margin-top: 15px;
    }

    .popup-login-item a:hover {
        text-decoration: underline;
    }

    .popup-login-item i {
        display: inline-block;
        vertical-align: middle;
        width: 38px;
        height: 38px;
        margin-right: 14px;
        background: url(~assets/images/logo.png) no-repeat 0 9999px;
    }

    .popup-login-item .popup-login-item-wechat {
        background-position: -150px -670px;
    }

    .popup-login-item .popup-login-item-qq {
        background-position: -190px -670px;
    }

    .popup-login-item .popup-login-item-blog {
        background-position: -231px -670px;
    }

    .popup-login-item .popup-login-item-email {
        background-position: -271px -670px;
    }

    .popup-login-input-item {
        position: relative;
        zoom: 1;
    }

    .popup-login-input {
        width: 206px;
        height: 19px;
        line-height: 19px;
        padding: 5px 6px 6px;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
    }

    .popup-login-option {
        margin: 15px 0 10px;
    }

    .popup-login-option > label,
    .popup-login-option .popup-login-option-link {
        color: #666;
    }

    .popup-login-option  input {
        margin: 0 12px 0 0;
        vertical-align: middle;
    }

    .popup-login-option-link:hover {
        text-decoration: underline;
    }

    .popup-login-error {
        height: auto;
        line-height: 18px;
        margin-top: 5px;
    }

    .popup-login-error > i{
        width: 14px;
        height: 14px;
        margin: 0 8px 0 0;
        background: url(~assets/images/icon.png) no-repeat -50px -270px;
    }

    .popup-login-mode {
        padding: 0 19px;
        height: 48px;
        line-height: 48px;
        border-top: 1px solid #c6c6c6;
        border-radius: 0 0 4px 4px;
        background-color: #f7f7f7;
        margin: 40px  0 -40px;
    }

    .popup-login-mode .popup-login-link-primary {
        color: #0c72c3;
    }

</style>