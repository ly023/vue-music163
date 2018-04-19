<template>
    <div class="discover">
        <div class="discover-swiper-wrapper">
            <div class="discover-swiper">
                <swiper :options="swiperOption" ref="discoverSwiper">
                    <swiper-slide class="discover-swiper-item"><img src="~assets/images/discover/banner01.jpg">
                    </swiper-slide>
                    <swiper-slide class="discover-swiper-item"><img src="~assets/images/discover/banner02.jpg">
                    </swiper-slide>
                    <swiper-slide class="discover-swiper-item"><img src="~assets/images/discover/banner03.jpg">
                    </swiper-slide>
                    <swiper-slide class="discover-swiper-item"><img src="~assets/images/discover/banner04.jpg">
                    </swiper-slide>
                    <swiper-slide class="discover-swiper-item"><img src="~assets/images/discover/banner05.jpg">
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination discover-swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev discover-swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next discover-swiper-button-next" slot="button-next"></div>
                </swiper>
                <div class="fr discover-download">
                    <router-link to="/download" hidefocus="true">下载客户端</router-link>
                    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    <span class="discover-shadow-left"></span><span class="discover-shadow-right"></span>
                </div>
            </div>
        </div>
        <div class="discover-main">
            <div class="discover-left">
                <!--热门推荐-->
                <div class="discover-hot">
                    <!--title-->
                    <div class="discover-hot-title">
                        <router-link class="fl" to="">热门推荐</router-link>
                        <div class="fl discover-hot-tab">
                            <router-link to="">华语</router-link>
                            <span>|</span>
                            <router-link to="">流行</router-link>
                            <span>|</span>
                            <router-link to="">摇滚</router-link>
                            <span>|</span>
                            <router-link to="">民谣</router-link>
                            <span>|</span>
                            <router-link to="">电子</router-link>
                        </div>
                        <router-link to="">更多</router-link>
                    </div>
                    <!--cont-->
                    <ul class="discover-hot-list">
                        <li class="discover-hot-item">
                            <div class="discover-hot-cover">
                                <img src="~assets/images/discover/hot01.jpeg">
                                <div class="discover-hot-bottom">
                                    115万
                                </div>
                            </div>
                           <router-link class="discover-hot-des" alt="你是我所有的心动和欢呼雀跃" to="">你是我所有的心动和欢呼雀跃</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="discover-right">

            </div>
        </div>
    </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    data: () => ({
      swiperOption: {
        loop : true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false // 操作swiper之后自动切换不会停止
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'discover-bullet', // 分页器内元素的类名
          bulletActiveClass: 'discover-bullet-active' // 分页器内活动(active)元素的类名
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true // 开启淡出
        }
      }
    }),
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="scss" type="text/scss">
    @import '../libs/commons/common.scss';

    %background-banner {
        background: url(~assets/images/banner.png) no-repeat 0 9999px;
    }

    %background-download {
        background: url(~assets/images/discover/download.png) no-repeat 0 0;
    }

    %swiper-button {
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -31px;
        width: 37px;
        height: 63px;
        text-indent: -9999px;
    }


    .discover {
        background-color: #f5f5f5;
    }

    .discover-swiper-wrapper {
        background-color: #353535;
    }

    .discover-swiper {
        position: relative;
        width: 982px;
        height: 336px;
        margin: 0 auto;
        .swiper-container {
            overflow: visible;
        }
        .swiper-pagination {
            &.discover-swiper-pagination {
                width: 730px;
                height: 20px;
            }
        }
    }

    .discover-bullet {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        @extend %background-banner;
        background-position: 3px -343px;
        cursor: pointer;
    }

    .discover-bullet-active {
        @extend %background-banner;
        background-position: -16px -343px;
    }

    .swiper-button-prev {
        &.discover-swiper-button-prev {
            @extend %swiper-button;
            @extend %background-banner;
            left: -68px;
            background-position: 0 -360px;
        }
        &:hover{
            background-position: 0 -430px;
        }
    }
    .swiper-button-next {
        &.discover-swiper-button-next {
            @extend %swiper-button;
            @extend %background-banner;
            right: -68px;
            background-position: 0 -508px;
        }
        &:hover {
            background-position: 0 -578px;
        }
    }

    .discover-download {
        position: absolute;
        top: 0;
        right: -1px;
        z-index: 1;
        width: 254px;
        height: 336px;
        @extend %background-download;
        a {
            @extend %background-download;
            display: block;
            width: 215px;
            height: 56px;
            margin: 212px 0 0 19px;
            background-position: 0 9999px;
            text-indent: -9999px;
            &:hover {
                background-position: 0 -340px;
            }
        }
        p {
            margin: 10px auto;
            text-align: center;
            color: #8d8d8d;
        }
        .discover-shadow-left,
        .discover-shadow-right {
            display: block;
            position: absolute;
            top: 0;
            left: -20px;
            width: 20px;
            height: 336px;
            @extend %background-banner;
            background-position: -1px 0;
        }

        .shadow-right {
            left: auto;
            right: -20px;
            background-position: -20px 0;
        }
    }

    .discover-main {
        width: 980px;
        min-height: 700px;
        margin: 0 auto;
        background-color: #fff;
        border: {
            width: 0 1px;
            style: solid;
            color: #d3d3d3;
        }
    }

    .discover-hot {
        padding: 20px 20px 40px;
        height: 33px;
    }

    .discover-hot-title {
        padding: 0 10px 0 34px;
        height: 33px;
        border-bottom: 2px solid #C10D0C;
        background: url(~assets/images/index.png) no-repeat -225px -156px;
        > a {
            font-size: 20px;
            font-weight: normal;
            line-height: 28px;
            color: #333;
        }
    }

    .discover-hot-tab {
        margin: 7px 0 0 20px;
        > a {
            color: #666;
        }
        > span {
            margin: 0 10px;
            color: #ccc;
        }
    }

    .discover-hot-list {
        margin: 20px 0 0 0;


    }

    .discover-hot-item {
        float: left;
        position: relative;


    }

</style>