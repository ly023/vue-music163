<template>
    <div class="foot-bar">
        <div class="clearfix foot-wrapper">
            <div class="foot-copy">
                <p>
                    <a href="//music.163.com/about" target="_blank" class="foot-link foot-color-1">关于网易</a><span
                        class="foot-copy-line">|</span>
                    <a href="//help.163.com/" target="_blank" class="foot-link foot-color-1">客户服务</a><span
                        class="foot-copy-line">|</span>
                    <a href="//music.163.com/html/web2/service.html" target="_blank"
                       class="foot-link foot-color-1">服务条款</a><span
                        class="foot-copy-line">|</span>
                    <a href="//sitemap.163.com/" target="_blank" class="foot-link foot-color-1">网站导航</a><span
                        class="foot-copy-line">|</span>
                    <a @click="feedback" href="javascript:;" class="foot-link foot-color-1" hidefocus="true">意见反馈</a>
                </p>
                <p class="foot-color-2">
                    <span class="foot-copy-sep">网易公司版权所有©1997-2018</span>杭州乐读科技有限公司运营：<a
                        href="http://p1.music.126.net/-DB9zs1FAJq8vg7HOb-yOQ==/3250156395654666.jpg" target="_blank"
                        class="foot-link foot-color-2">浙网文[2015] 0415-135号</a>
                </p>
                <p class="foot-color-2">
                    <span class="foot-copy-sep">举报邮箱：<a href="mailto:cloudmusicservice@163.com"
                                                        class="foot-link foot-color-2">cloudmusicservice@163.com</a></span>违法和不良信息举报电话：0571-89852163-20394
                </p>
            </div>
            <ul class="fr foot-enter">
                <li>
                    <a class="foot-logo foot-logo-musician" href="//music.163.com/recruit" target="_blank">独立音乐人</a>
                </li>
                <li>
                    <a class="foot-logo foot-logo-topic" href="//music.163.com/topic/recruit" target="_blank">音乐专栏</a>
                </li>
                <li>
                    <a class="foot-logo foot-logo-media" href="//music.163.com/topic/selfmedia" target="_blank">自媒体</a>
                </li>
                <li>
                    <a class="foot-logo foot-logo-reward" href="//music.163.com/web/reward" target="_blank">赞赏</a>
                </li>
            </ul>
        </div>
        <popup-feedback :isShowPopup.sync="isShow"></popup-feedback>
    </div>
</template>

<script>
    import Vue from 'vue'
    import './popup-feedback.vue'

    let component = {
      data: () => ({
        isShow: false
      }),
      methods: {
        feedback () {
          this.isShow = true;
        }
      },
    }

    Vue.component('foot-bar', component)

    export default component
</script>


<style lang="scss" type="text/scss">
    @mixin background-position($x, $y) {
        background-position: $x $y;
    }

    .foot-bar {
        position: relative;
        height: 148px;
        overflow: hidden;
        border-top: 1px solid #d3d3d3;
        background: #f2f2f2;
    }

    .foot-wrapper {
        width: 980px;
        margin: 0 auto;
    }

    .foot-copy {
        float: left;
        width: 520px;
        padding-top: 15px;
        line-height: 24px;
    }

    .foot-link {
      &:hover {
        text-decoration: underline;
      }
    }

    .foot-copy-line {
        margin: 0 8px 0 10px;
        color: #c2c2c2;
    }

    .foot-copy-sep {
        margin-right: 14px;
    }

    .foot-color-1 {
        color: #999;
    }

    .foot-color-2 {
        color: #666;
    }

    .foot-enter {
        width: 330px;
        margin-top: 21px;
    }

    .foot-logo {
        background: url(~assets/images/foot_enter.png) no-repeat 0 9999px;
    }

    .foot-logo {
        float: left;
        width: 60px;
        height: 70px;
        margin-left: 30px;
        text-indent: -9999px;
    }

    .foot-logo-musician {
        @include background-position(-60px, -80px);
        margin-left: 0;
    }

    .foot-logo-topic {
        @include background-position(0, -80px);
    }

    .foot-logo-media {
        @include background-position(0, 0);
    }

    .foot-logo-reward {
        @include background-position(-60px, 0);
    }

</style>