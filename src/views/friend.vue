<template>
    <div class="friend">
        <div class="friend-sign-in" v-if="true">
            <div class="friend-sign-in-bg">
                <div class="friend-sign-in-des"><p>你可以关注明星和好友品味他们的私房歌单</p>通过他们的动态发现更多精彩音乐</div>
                <a href="javascript:;" class="friend-sign-in-btn">立即登录</a>
            </div>
        </div>
        <div class="friend-logged" v-else>

        </div>
        <popup-login :isShowPopup.sync="isShow" :loginMode.sync="loginMode"></popup-login>
    </div>
</template>

<script>
   import Vue from 'vue'
   import 'components/popup-login'

   export default {
       data: ()=>({
         isShow: false,
         loginMode: 4
       })
   }
</script>

<style>
    .friend {
        min-width: 982px;
        background: #F5F5F5;
    }

    .friend-sign-in,
    .friend-logged {
        width: 980px;
        min-height: 700px;
        margin: 0 auto;
        background-color: #FFF;
        border: 1px solid #D3D3D3;
    }

    .friend-sign-in-bg,
    .friend-sign-in-btn {
        background: url(~assets/images/notlogin.jpg) no-repeat center 0;
    }

    .friend-sign-in-bg {
        width: 902px;
        height: 414px;
        margin: 0 auto;
        padding-top: 70px;
        background-position: 0 70px;
    }

    .friend-sign-in-des {
        padding: 178px 0 0 535px;
        line-height: 23px;
        color: #666;
        font-size: 14px;
    }

    .friend-sign-in-btn {
        display: block;
        width: 157px;
        height: 48px;
        margin: 36px 0 0 535px;
        background-position: 0 9999px;
        text-indent: -9999px;
    }
</style>