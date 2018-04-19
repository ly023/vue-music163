<template>
    <div>
        <div class="download-banner">
            <div class="download-banner-wrapper">
                <div class="fl download-swiper">
                    <swiper :options="swiperOption" ref="downloadSwiper">
                        <swiper-slide class="download-banner-item"><img src="src/~assets/images/download/banner-aos.png">
                        </swiper-slide>
                        <swiper-slide class="download-banner-item"><img src="src/~assets/images/download/banner-ios.png">
                        </swiper-slide>
                        <swiper-slide class="download-banner-item"><img src="src/~assets/images/download/banner-pc.png">
                        </swiper-slide>
                        <!-- Optional controls -->
                        <div class="swiper-pagination download-swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
                <div class="fr download-list">
                    <a href="http://music.163.com/api/android/download/latest2" class="download-item download-aos"
                       target="_blank" title="安卓版下载">
                        <i></i>
                        <em>安卓版</em>
                        <em>V5.0.0</em>
                    </a>
                    <a href="https://itunes.apple.com/app/id590338362" class="download-item download-ios"
                       target="_blank" title="iPhone版下载">
                        <i></i>
                        <em>iPhone版</em>
                        <em>V5.0.0</em>
                    </a>
                    <a href="https://itunes.apple.com/cn/app/wang-yi-yun-yin-lehd/id871041757?l=ch"
                       class="download-item download-ios" target="_blank" title="iPad版下载">
                        <i></i>
                        <em>iPad版</em>
                        <em>V1.6.2</em>
                    </a>
                    <a href="http://music.163.com/api/osx/download/latest" class="download-item download-ios"
                       target="_blank" title="Mac版下载">
                        <i></i>
                        <em>Mac版</em>
                        <em>V1.5.9</em>
                    </a>
                    <a href="http://music.163.com/api/pc/download/latest" class="download-item download-pc"
                       target="_blank" title="PC版下载">
                        <i></i>
                        <em>PC版</em>
                        <em>V2.3.0</em>
                    </a>
                    <a href="https://www.microsoft.com/store/apps/9nblggh6g0jf" class="download-item download-pc"
                       target="_blank" title="UWP版下载">
                        <i></i>
                        <em>UWP版</em>
                        <em>V1.2.3</em>
                    </a>
                    <a href="http://www.windowsphone.com/s?appid=db9dbdaa-464e-4370-a078-800fc7983d39"
                       class="download-item download-pc" target="_blank" title="WP版下载">
                        <i></i>
                        <em>WP版</em>
                        <em>V1.5.0</em>
                    </a>
                    <!-- linux -->
                    <a href="javascript:;" class="download-item download-linux" title="Linux版下载">
                        <i></i>
                        <em>Linux版</em>
                        <em>V1.1.0</em>
                    </a>
                    <a href="/" class="download-pc-log" name="网易云音乐" target="_blank" title="PC版更新日志">
                        <em></em><span>PC版更新日志</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="download-cont download-cont-1">
            <div class="clearfix download-wrapper">
                <div class="fl">
                    <h3 class="download-title">千万曲库 首首CD音质</h3>
                    <p class="download-des">
                        囊括百万无损SQ音乐，你在用手机听歌时，
                    </p>
                    <p class="download-des">
                        也能感受到纤毫毕现的CD音质，更能免费离线收听
                    </p>
                </div>
                <div class="fr">
                    <img usemap="#testtool" src="~assets/images/download/b1.jpg" alt="千万曲库 首首CD音质">
                    <map name="testtool">
                        <area style="cursor:default;" shape="rect" coords="80,150,145,173" hidefocus="true"
                              href="http://s1.music.126.net/download/pc/CloudMusicDetectionV7.exe">
                    </map>
                </div>
            </div>
        </div>
        <div class="download-cont download-cont-2">
            <div class="clearfix download-wrapper">
                <div class="fl"><img src="~assets/images/download/b2.jpg" alt="千位明星 亲自推荐音乐">
                </div>
                <div class="fr">
                    <h3 class="download-title">千位明星 亲自推荐音乐</h3>
                    <p class="download-des">陶喆，羽泉等<em>千位明星已入驻</em>，亲自创建私房歌单，录制独</p>
                    <p class="download-des">家DJ节目，推荐他们心中的好音乐</p>
                </div>
            </div>
        </div>
        <div class="download-cont download-cont-3">
            <div class="clearfix download-wrapper">
                <div class="fl">
                    <h3 class="download-title">社交关系 发现全新音乐</h3>
                    <p class="download-des">你可以<em>关注明星</em>、DJ和好友，通过浏览他们的动态、收藏和</p>
                    <p class="download-des">分享，发现更多全新好音乐</p>
                </div>
                <div class="fr">
                    <img src="~assets/images/download/b3.jpg" alt="社交关系 发现全新音乐">
                </div>
            </div>
        </div>
        <div class="download-cont download-cont-4">
            <div class="clearfix download-wrapper">
                <div class="fl">
                    <img src="~assets/images/download/b4.jpg" alt="手机电脑 歌单实时同步">
                </div>
                <div class="fr">
                    <h3 class="download-title">手机电脑 歌单实时同步</h3>
                    <p class="download-des">只要一个帐号，你就可以同步在手机、电脑上创建、收藏</p>
                    <p class="download-des">的歌单，<em>随时随地畅享好音乐</em></p>
                </div>
            </div>
        </div>
        <div class="download-cont download-cont-5">
            <div class="clearfix download-wrapper">
                <div class="fl">
                    <h3 class="download-title">听歌识曲 助你疯狂猜歌</h3>
                    <p class="download-des">
                        歌曲很动听却不知道歌名，歌名在嘴边却想不起来……
                    </p>
                    <p class="download-des">用<em>听歌识曲</em>功能，几秒钟就知道歌名</p>
                </div>
                <div class="fr">
                    <img src="~assets/images/download/b5.jpg" alt="听歌识曲 助你疯狂猜歌">
                </div>
            </div>
        </div>
        <div class="download-cont-6">
         <div class="clearfix download-wrapper">
             <h3 class="download-title">网易云音乐</h3>
             <p class="download-des">下载网易云音乐客户端，随时随地畅享动听好音乐</p>
             <ul class="clearfix">
                 <li class="fl download-item-pc">
                     <img src="~assets/images/download/b8.jpg">
                     <a class="download-btn download-btn-pc" href="http://music.163.com/api/pc/download/latest" target="_blank" title="PC版下载">PC版下载</a>
                 </li>
                 <li class="fl">
                     <img src="~assets/images/download/b6.png">
                     <a class="download-btn download-btn-ios" href="https://itunes.apple.com/app/id590338362" target="_blank" title="iPhone版下载">iPhone版下载</a>
                 </li>
                 <li class="fl">
                     <img src="~assets/images/download/b9.jpg">
                     <a class="download-btn download-btn-ios" href="https://itunes.apple.com/cn/app/wang-yi-yun-yin-lehd/id871041757?l=ch" target="_blank" title="iPad版下载">iPad版下载</a>
                 </li>
                 <li class="fl">
                     <img src="~assets/images/download/b7.png">
                     <a class="download-btn download-btn-aos" href="http://music.163.com/api/android/download/latest2" target="_blank" title="安卓版下载">安卓版下载</a>
                 </li>
                 <li class="fl download-item-uwp">
                     <img src="~assets/images/download/b10.png">
                     <a class="download-btn download-btn-uwp" href="https://www.microsoft.com/store/apps/9nblggh6g0jf" target="_blank" title="UWP版下载">UWP版下载</a>
                 </li>
             </ul>
         </div>
        </div>
        <div class="download-code">
            <img src="~assets/images/download/code.png">
            <p>扫描二维码下载</p>
        </div>
    </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data: () => ({
      swiperOption: {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false // 操作swiper之后自动切换不会停止
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'download-bullet', // 分页器内元素的类名
          bulletActiveClass: 'download-bullet-active' // 分页器内活动(active)元素的类名
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true, // 开启淡出
        }
      }
    }),
    components: {
      swiper,
      swiperSlide
    }
  }

</script>

<style>
    .download-banner {
        height: 483px;
        background: url(~assets/images/bg.jpg) no-repeat center 0;
    }

    .download-bullet,
    .download-bullet-active,
    .download-pc-log > em,
    .download-btn {
        background: url(~assets/images/sprite.png) no-repeat 0 9999px;
    }

    .download-banner-wrapper {
        width: 982px;
        margin: 0 auto;
    }

    .download-swiper {
        width: 545px;
        height: 465px;
        margin: 17px 0 0 35px;
    }

    .download-banner-item {
        text-align: center;
    }

    .swiper-pagination.download-swiper-pagination{
        text-align: left;
    }

    .download-bullet{
        display: inline-block;
        width: 9px;
        height: 9px;
        margin-right: 8px;
        background-position: -113px -102px;
        cursor: pointer;
    }

    .download-bullet-active{
        background-position: -94px -102px;
    }

    .download-list {
        width: 380px;
        margin: 194px -8px 0 0;
    }

    .download-list .download-item,
    .download-item.download-aos > i,
    .download-item.download-ios > i,
    .download-item.download-pc > i,
    .download-item.download-linux > i {
        background: url(~assets/images/download/down_btn.png) repeat-x;
    }

    .download-item {
        float: left;
        width: 170px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 14px;
        margin-left: 20px;
        background-position: 0 0;
        color: #fff;
        font-size: 15px;
        font-family: Arial, Helvetica, sans-serif;
    }


    .download-item:hover{
        background-position: 0 -50px;
    }

    .download-item >i{
        float: left;
        width: 22px;
        height: 40px;
        margin: 0 12px;
    }

    .download-item.download-aos > i {
        background-position: -60px -100px;
    }

    .download-item.download-ios > i {
        background-position: -30px -100px;
    }

    .download-item.download-pc > i {
        background-position: 0 -100px;
    }

    .download-item.download-linux > i {
        background-position: -128px -100px;
    }

    .download-pc-log {
        margin: 10px 0 0 20px;
        color: #e6e8ec;
    }

    .download-pc-log > em{
        display: inline-block;
        width: 5px;
        height: 6px;
        margin: 0 5px 2px 0;
        background-position: -94px -87px;
        font-size: 0;
    }

    .download-code {
        position: fixed;
        z-index: 10;
        right: 22px;
        top: 395px;
        background: #FFF;
        border: 1px solid #ccc;
        box-shadow: 0 0 4px rgba(0,0,0,0.5);
        opacity: 0.75;
        filter: Alpha(opacity=75);
        text-align: center;
    }

    .download-code > p {
        padding: 0 0 5px 0;
    }

    .download-cont {
        background: #FFF;
        height: 437px;
        border-bottom: 1px solid #e3e3e3;
    }

    .download-wrapper {
        width: 982px;
        margin: 0 auto;
    }

    .download-title {
        padding: 45px 0 5px 0;
        font-size: 40px;
        font-weight: normal;
        font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
    }

    .download-des {
        line-height: 24px;
        font-size: 16px;
        color: #666;
    }

    .download-des > em {
        color: #cc0000;
    }

    .download-cont-1 .download-wrapper {
        padding-top: 120px;
    }

    .download-cont-2 {
        padding-top: 106px;
        background: #f8f8f8;
    }

    .download-cont-3 {
        padding-top: 72px;
    }

    .download-cont-4 {
        padding-top: 95px;
        background: #f8f8f8;
    }

    .download-cont-5 {
        padding-top: 53px;
    }

    .download-cont-6 {
        height: 343px;
        background-color: #f8f8f8;
    }

    .download-cont-6 .download-wrapper {
        width: 1068px;
        margin: 0 auto;
        text-align: center;
    }

    .download-cont-6 .download-des{
        color: #999;
        font-size: 12px;
        font-family: simsun, \5b8b\4f53;
    }

    .download-cont-6 ul {
        margin-top: 42px;
    }

    .download-cont-6 li {
        width: 124px;
        padding-left: 106px;
    }

    .download-cont-6 .download-item-pc {
        padding-left: 0;
    }

    .download-btn-pc:hover {
        background-position: 0 -495px;
    }

    .download-btn-ios:hover {
        background-position: 0 -557px;
    }

    .download-btn-aos:hover {
        background-position: 0 -619px;
    }

    .download-btn-uwp:hover {
        background-position: 0 -433px;
    }

    .download-cont-6 img {
        max-width: none;
    }

    .download-item-pc > img {
        margin-top: 8px;
    }

    .download-item-uwp > img {
        margin: 4px 0 0 -6px;
    }

    .download-btn {
        display: block;
        width: 113px;
        height: 23px;
        margin: 6px auto 0;
        padding: 8px 0 0 10px;
        color: #FFF;
    }

    .download-btn-pc {
        width: 105px;
        height: 23px;
        padding: 8px 0 0 18px;
        background-position: 0 -464px;
    }

    .download-btn-ios {
        width: 110px;
        height: 23px;
        padding: 8px 0 0 15px;
        background-position: 0 -526px;
    }

    .download-btn-aos {
        background-position: 0 -588px;
    }

    .download-btn-uwp {
        background-position: 0 -402px;
    }



</style>