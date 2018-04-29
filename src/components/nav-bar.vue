<template>
    <div class="nav-bar">
        <div class="nav-bar-cont">
            <a href="/" class="nav-logo">
                <span class="nav-logo-text">网易云音乐</span>
            </a>
            <ul class="nav-list">
                <li class="nav-item">
                    <!--<router-link to="/index" class="nav-router-link">发现音乐</router-link>-->
                    <router-link to="/discover" class="nav-router-link">发现音乐</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="2" class="nav-router-link">我的音乐</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="friend" class="nav-router-link">朋友</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="4" class="nav-router-link">商城</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="5" class="nav-router-link">音乐人</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/download" class="nav-router-link">下载客户端<i class="nav-tag-hot"></i></router-link>
                </li>
            </ul>
            <div class="nav-login">
                <span class="link nav-login-link">登录</span>
                <div class="nav-login-cont">
                    <i class="nav-login-arrow"></i>
                    <ul class="nav-login-list">
                        <li class="nav-login-item">手机号登录</li>
                        <li class="nav-login-item"><a href="" class="">微信登录</a></li>
                        <li class="nav-login-item"><a href="" class="">QQ登录</a></li>
                        <li class="nav-login-item"><a href="" class="">新浪微博登录</a></li>
                        <li class="nav-login-item">网易邮箱账号登录</li>
                    </ul>
                </div>
            </div>
            <a href="http://music.163.com/#/login?targetUrl=%2Fuservideo" target="_blank" class="nav-video-contribution">视频投稿</a>
            <div class="nav-search">
                <div class="nav-search-cont">
                    <label v-show="showPlaceholder" class="nav-label">音乐/视频/电台/用户</label>
                    <input v-model="searchText" @focus="focusInput" @blur="blurInput" type="text"
                           class="text nav-input"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'



  let component = {
    data: () => ({
      showPlaceholder: true,
      searchText: ''
    }),
    created () {

    },
    mounted () {

    },
    methods: {
      focusInput () {
        this.showPlaceholder = false
      },
      blurInput () {
        if (this.searchText) {
          return
        }
        this.showPlaceholder = true
      }
    }
  }

  Vue.component('nav-bar', component)

  export default component
</script>

<style lang="scss" type="text/scss">
    @import '../libs/commons/common.scss';

    $nav-border-color: #202020;

    @mixin link-color {
        color: #CCC;
    }

    @mixin link-hover-color {
        color: #FFF;
    }

    @mixin nav-login-arrow($border-color: $nav-border-color) {
        position: absolute;
        border: {
            width: 8px 7px;
            style: solid;
            color: transparent transparent $border-color transparent;
        }
    }

    .nav-bar {
        position: fixed;
        z-index: 10000;
        height: $nav-height;
        width: 100%;
        background-color: #242424;
    }

    .nav-bar-cont {
        width: 1100px;
        margin: 0 auto;
    }

    .nav-logo,
    .nav-search,
    .nav-video-contribution,
    .nav-login,
    .nav-tag-hot {
        background: url(~assets/images/topbar.png) no-repeat 0 9999px;
    }

    .nav-logo {
        float: left;
        width: 176px;
        height: 69px;
        background-position: 0 0;
    }

    .nav-logo-text {
        display: inline-block;
        text-indent: -9999px;
    }

    .nav-item {
        float: left;
        font-size: 14px;
    }

    .nav-router-link {
        display: inline-block;
        position: relative;
        line-height: $nav-height;
        padding: 0 19px;
        @include link-color;
        &:hover,
        .router-link-exact-active {
            background-color: #000;
            @include link-hover-color;
        }
    }

    .nav-tag-hot {
        display: block;
        position: absolute;
        top: 21px;
        left: 100px;
        width: 28px;
        height: 19px;
        background-position: -190px 0;
    }

    .nav-search {
        float: right;
        width: 158px;
        height: 32px;
        margin-top: 19px;
        background: {
            color: #FFF;
            position: 0 -99px;
        };
        border-radius: 32px;
    }

    .nav-search-cont {
        display: block;
        position: relative;
        margin: 8px 0 0 30px;
    }

    .nav-label {
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        color: #9b9b9b;
        cursor: text;
    }

    .nav-input {
        position: absolute;
        line-height: 16px;
        background-color: transparent;
    }

    .nav-video-contribution {
        float: right;
        width: 90px;
        height: 32px;
        margin: 19px 0 0 12px;
        box-sizing: border-box;
        padding-left: 32px;
        background-position: 0 -140px;
        line-height: 33px;
        @include link-color;
    }

    .nav-video-contribution {
        &:hover {
            background-position: -100px -140px;
            @include link-hover-color;
            text-decoration: none;
        }
    }

    .nav-login {
        float: right;
        position: relative;
        height: 45px;
        margin: 19px 0 0 20px;
        padding: 7px 22px 0 0;
        background-position: right -47px;
        &:hover {
             .nav-login-cont {
                display: block;
            }
        }
    }

    .nav-login-link {
        cursor: pointer;
        margin-top: 8px;
        &:hover {
            text-decoration: underline;
        }
    }


    .nav-login-cont {
        display: none;
        position: absolute;
        top: 38px;
        right: -46px;
        width: 158px;
        background-color: #2B2B2B;
        border: {
            width: 0 1px 1px;
            style: solid;
            color: $nav-border-color;
            radius: 4px;
        }
        box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
    }

    .nav-login-arrow {
        @include nav-login-arrow($nav-border-color);
        top: -16px;
        left: 72px;
        :after {
            @include nav-login-arrow(#2B2B2B);
            content: '';
            top: -7px;
            left: -7px;
        }
    }

    .nav-login-item {
        line-height: 39px;
        padding-left: 24px;
        border-radius: 4px;
        border-top: 1px solid $nav-border-color;
        @include link-color;
        cursor: pointer;
    }

    .nav-login-item {
        &:hover {
            background-color: #353535;
            @include link-hover-color;
        }
    }

    .nav-login-item {
       &>a {
            @include link-color;
            &:hover {
                @include link-hover-color;
            }
        }
    }

    .nav-sub {
        background-color: #C20C0C;
        height: 30px;
    }


</style>