<template>
    <div :class="['play-bar', playSetting.isLocked ? 'play-bar-locked' : 'play-bar-unlock']"
     :style="playBarStyle"
    @mouseenter="showPlayBar" @mouseleave="hidePlayBar" ref="playBar">
        <div class="play-bar-cont">
           <div class="fl play-bar-btn">
               <a class="fl play-bar-prev" title="上一首(ctrl+←)">上一首</a>
               <a class="fl play-bar-play"  v-if="isPlay" title="播放/暂停(p)">播放/暂停</a>
               <a class="fl play-bar-pause" v-else title="播放/暂停(p)">播放/暂停</a>
               <a class="fl play-bar-next" title="下一首(ctrl+→)">下一首</a>
           </div>
            <a href="javascript:;" class="fl play-bar-cover">
                <img src="http://s4.music.126.net/style/web2/img/default/default_album.jpg"/>
            </a>
            <!--<router-link to="link" class="fl play-bar-cover">-->
             <!--<img src=""/>-->
            <!--</router-link>-->
            <!-- 歌曲进度条 -->
            <div class="fl play-bar-progress"
                 @mousemove="dragProgress($event)"
                 @mouseleave="endProgressAdjust($event)">
                <div class="play-bar-song-info">
                    <router-link to="link" class="fl text-ellipsis play-bar-song-name">有何不可</router-link>
                    <router-link to="link" class="fl play-bar-singer">许嵩</router-link>
                    <router-link to="link" class="fl play-bar-song-source"></router-link>
                </div>
                <div class="play-bar-progress-cont" ref="progress">
                    <div class="play-bar-ready" :style="{ width: readyPercent + '%' }"></div>
                    <div class="play-bar-current" :style="{ width: progressLength + 'px' }"></div>
                    <div class="play-bar-dot"
                         :style="{ left: progressLength + 'px' }"
                         @mousedown="startProgressAdjust($event)"
                         @mouseup="endProgressAdjust($event)"></div>
                </div>
            </div>
            <div class="fl play-bar-time">
                <em>00:11</em>/04:01
            </div>
            <div class="fl play-bar-operation">
               <span class="play-bar-icon play-bar-collect">收藏</span>
               <span class="play-bar-icon play-bar-share">分享</span>
            </div>
            <div class="fl play-bar-setting">
                <div class="play-bar-volume">
                    <!-- 音量图标 -->
                    <div @click="isShowVolume = !isShowVolume">
                        <span v-if="playSetting.volume"
                              class="play-bar-icon play-bar-volume-icon play-bar-volume-sound"></span>
                        <span v-else
                              class="play-bar-icon play-bar-volume-icon play-bar-volume-mute"></span>
                    </div>
                    <!-- 音量控制 -->
                    <div v-show="isShowVolume"
                         @mousemove="dragVolume"  
                         @mouseleave="endVolumeAdjust" 
                         class="play-bar-volume-ctrl">
                        <div class="play-bar-volume-line" ref="volumeLine">
                            <div class="play-bar-volume-current" :style="{ height: volumeLength + 'px' }"></div>
                            <span @mousedown="startVolumeAdjust"
                                  @mouseup="endVolumeAdjust"
                                  ref="volumeDot"
                                  class="play-bar-volume-dot" :style="volumeStyle"></span>
                        </div>
                    </div>
                </div>
                <!-- 播放模式 -->
                <div class="play-bar-mode" @click="changeMode">
                    <a v-if="playSetting.mode === playMode.ORDER" class="play-bar-icon play-bar-order" title="列表循环">列表循环</a>
                    <a v-else-if="playSetting.mode === playMode.SHUFFLE" class="play-bar-icon play-bar-shuffle" title="随机">随机</a>
                    <a v-else class="play-bar-icon play-bar-loop" title="单曲循环">单曲循环</a>
                </div>
                <div class="play-bar-list">
                    <span class="play-bar-icon play-bar-list-icon">128</span>
                </div>
            </div>
        </div>
        <!-- 锁定底部 -->
        <div class="play-bar-lock">
            <span class="play-bar-lock-icon" @click="lock"></span>
        </div>
    </div>
</template>


<script>
  import Vue from 'vue'

  import { getMousePageX, getMousePageY, getLocalStorage, setLocalStorage } from 'utils/util'

  const PLAY_MODE = {
    ORDER: 4, // 顺序
    SHUFFLE: 5, // 随机
    LOOP: 2, // 单曲循环
  }

  const SHOW_BOTTOM = 0
  const HIDE_BOTTOM = -47

  const INTERVAL = {
    SHOW: 10,
    HIDE: 3,
    TIME: 20
  }

  const DEFAULT_PLAY_SETTING = {
    isLocked: false,
    mode: PLAY_MODE.ORDER,
    autoPlay: false,
    volume: 0.8
  }



  let component = {
    data: ()=>({
      isPlay: false,
      playSetting: getLocalStorage('playSetting') || Object.assign({}, DEFAULT_PLAY_SETTING),
      bottom: '',
      timeoutId: '',
      playMode: PLAY_MODE, // 播放模式
      isShowVolume: false,
      mode: PLAY_MODE.ORDER,
      progressWidth: 0,
      isDragProgress: false,
      readyPercent: 0,
      currentPercent: 0,
      progressLength: 0,
      endProgressLength: 0,
      startProgressX: 0,
      endProgressX: 0,

      volumeHeight: 0,

      isDragVolume: false,
      currentVolume: 0,
      startVolumeY: 0,
      endVolumeY: 0,
      volumeLength: 0,
      endVolumeLength: 0,
      
    }),
    mounted () {
      this.progressWidth = this.$refs.progress.offsetWidth;
      this.volumeHeight = parseInt(window.getComputedStyle(this.$refs.volumeLine).height, 10);
      this.volumeLength = parseInt(this.playSetting.volume * this.volumeHeight, 10);
      this.volumeDotR = parseInt(window.getComputedStyle(this.$refs.volumeDot).height, 10)/2;
    },
    computed: {
      playBarStyle () {
        return {
          bottom: `${this.bottom}px`
        }
      },
      volumeStyle () {
        let top = Math.min(this.volumeHeight - this.volumeLength, this.volumeHeight - this.volumeDotR);
        return {
          top: `${top}px`
        }
      }
    },
    methods: {
      showPlayBar () {
        if(this.playSetting.isLocked){
          return;
        }
        clearTimeout(this.timeoutId);
        this.bottom = parseInt(window.getComputedStyle(this.$refs.playBar).bottom, 10);
         let timer = setInterval(() => {
          if(this.bottom + INTERVAL.SHOW >= SHOW_BOTTOM){
            this.bottom = SHOW_BOTTOM;
            clearInterval(timer);
          }else{
            this.bottom += INTERVAL.SHOW;
          }
        },INTERVAL.TIME);

      },
      hidePlayBar () {
        if(this.playSetting.isLocked){
          return;
        }
        this.timeoutId = setTimeout(()=> {
          this.bottom = parseInt(window.getComputedStyle(this.$refs.playBar).bottom, 10);
          let timer = setInterval(() => {
            if (this.bottom - INTERVAL.HIDE <= HIDE_BOTTOM) {
              this.bottom = HIDE_BOTTOM;
              clearInterval(timer);
            }else{
              this.bottom -= INTERVAL.HIDE;
            }
          },INTERVAL.TIME);
        },500)

      },
      // todo 解锁会一下子沉入底部，体验不好
      lock () {
        this.playSetting.isLocked = !this.playSetting.isLocked;
        this.updateLocalStorage();
      },
      startProgressAdjust (e) {
        this.startProgressX = getMousePageX(e);
        this.isDragProgress = true;
        this.endProgressLength = this.progressLength;
      },
      dragProgress (e) {
        if(!this.isDragProgress){
          return;
        }
        this.endProgressX = getMousePageX(e);
        let moveX = this.endProgressX - this.startProgressX;

        if (this.progressLength > this.progressWidth) {
          this.progressLength = this.progressWidth;
        } else {
          if ((this.progressLength <= 0 && moveX < 0) || (this.progressLength >= this.progressWidth && moveX > 0)) return;
          this.progressLength = this.endProgressLength + moveX;
        }
      },
      endProgressAdjust (e) {
        if(!this.isDragProgress){
          return;
        }
        this.isDragProgress = false;
      },
      /**
       * 控制音量
       */
      controlVolume () {

      },
      /**
       * 鼠标按下
       */
      startVolumeAdjust (e) {
        this.startVolumeY = getMousePageY(e);
        this.isDragVolume = true;
        this.endVolumeLength = this.volumeLength;
      },
      dragVolume (e) {
        if (!this.isDragVolume) {
          return;
        }
        console.log('dragVolume')
        this.endVolumeY = getMousePageY(e);
        let moveY =  this.startVolumeY - this.endVolumeY;
        let volumeLength = this.endVolumeLength + moveY;
        if (volumeLength >= this.volumeHeight) {
           this.playSetting.volume = 1;
            this.volumeLength = this.volumeHeight;
        }else if(volumeLength<0){
          this.playSetting.volume = 0;
          this.volumeLength = 0;
        }else{
          this.playSetting.volume = volumeLength / this.volumeHeight;
          this.volumeLength = volumeLength;
        }
      },
      endVolumeAdjust () {
        this.isDragVolume = false;
      },
      /**
       * 更改播放模式
       */
      changeMode () {
        let modes = Object.keys(this.playMode).map((k) => this.playMode[k]);
        let currentIndex = modes.indexOf(this.playSetting.mode);
        if (currentIndex < modes.length - 1) {
          ++currentIndex;
        } else {
          currentIndex = 0;
        }
        this.playSetting.mode = modes[currentIndex];
        this.updateLocalStorage();
      },
      /**
       * 更新localStorage
       */
      updateLocalStorage () {
        setLocalStorage('playSetting',this.playSetting);
      }

    }
  }

  Vue.component('play-bar', component);
  export default component
</script>

<style lang="scss" type="text/scss">

    %background {
        background: url(~assets/images/playbar.png) no-repeat 0 9999px;
    }

    @mixin size($width, $height) {
        width: $width;
        height: $height;
    }


    .play-bar,
    .play-bar-song-source,
    .play-bar-collect,
    .play-bar-share,
    .play-bar-setting,
    .play-bar-volume-current,
    .play-bar-volume-ctrl,
    .play-bar-volume-icon,
    .play-bar-order,
    .play-bar-shuffle,
    .play-bar-loop,
    .play-bar-list-icon,
    .play-bar-lock-icon,
    .play-bar-lock{
        @extend %background;
    }

    .play-bar-icon {
        float: left;
        @include size(25px, 25px);
    }

    .play-bar {
        position: fixed;
        left: 0;
        @include size(100%, 53px);
        zoom: 1;
        z-index: 1000;
        background: {
            position: 0 0;
            repeat: repeat-x;
        };
        cursor: pointer;
    }

    .play-bar.play-bar-locked {
        bottom: 0;
    }

    .play-bar.play-bar-unlock {
        bottom: -46px;
    }

    .play-bar-cont {
        position: relative;
        @include size(980px, 47px);
        margin: 6px auto 0;
        z-index: 15;
    }

    .play-bar-btn {
        width: 137px;
        margin-top: 6px;
        a {
            @extend %background;
        }
        > a {

            text-indent: -9999px;
            cursor: pointer;
        }
        .play-bar-prev,
        .play-bar-next {
            @include size(28px, 28px);
            margin: 5px 8px 0;
        }
        .play-bar-play,
        .play-bar-pause {
            @include size(36px, 36px);
        }
        .play-bar-prev {
            background-position: 0 -130px;
            &:hover {
                background-position: -30px -130px;
            }
        }
        .play-bar-next {
            background-position: -80px -130px;
            &:hover {
                background-position: -110px -130px;
            }
        }
        .play-bar-play {
            background-position: 0 -165px;
            &:hover {
                background-position: -40px -204px;
            }
        }
        .play-bar-pause {
            background-position: 0 -204px;
        }

    }

    .play-bar-cover {
        position: relative;
        @include size(34px, 34px);
        margin: 6px 15px 0 0;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            @include size(34px, 35px);
            background-position: 0 -80px;
        }
    }

    .play-bar-song-info {
        height: 28px;
        line-height: 28px;
    }

    .play-bar-song-name,
    .play-bar-singer {
        &:hover {
            text-decoration: underline;
        }
    }

    .play-bar-song-name {
        max-width: 300px;
        color: #e8e8e8;
    }

    .play-bar-singer {
        max-width: 220px;
        margin-left: 15px;
        color: #9b9b9b;
    }

    .play-bar-song-source {
        @include size(14px, 15px);
        margin: 7px 0 0 13px;
        background-position: -110px -103px;
        &:hover {
            background-position: -130px -103px;
        }
    }

    .play-bar-progress {
        position: relative;
        width: 608px;
    }

    .play-bar-progress-cont {
        position: relative;
        width: 493px;
        background: url(~assets/images/statbar.png) no-repeat 0 0;
    }

    .play-bar-progress-cont,
    .play-bar-ready,
    .play-bar-current {
        height: 9px;
        border-radius: 6px;
    }


    .play-bar-dot,
    .play-bar-volume-dot {
        background: url(~assets/images/iconall.png) no-repeat;
    }

    .play-bar-dot {
        position: absolute;
        top: -7px;
        left: 0;
        @include size(22px, 22px);
        margin-left: -11px;
        background-position: 0 -250px;
        cursor: pointer;
        :hover {
            background-position: 0 -280px;
        }
    }

    .play-bar-ready,
    .play-bar-current {
        position: absolute;
        top: 0;
        left: 0;
    }

    .play-bar-ready {
        background-color: #535353;
    }

    .play-bar-current {
        background-color: #C51219;
    }

    .play-bar-time {
        margin: 25px 0 0 -102px;
        color: #797979;
        > em {
            color: #A1A1A1;
        }
    }

    .play-bar-operation {
        position: relative;
        text-indent: -9999px;
        margin: 12px 6px 0 0;
    }

    .play-bar-collect {
        background-position: -88px -163px;
        &:hover {
            background-position: -88px -189px;
        }
    }

    .play-bar-share {
        background-position: -114px -163px;
        &:hover {
            background-position: -114px -189px;
        }
    }

    .play-bar-setting {
        position: relative;
        z-index: 10;
        width: 113px;
        padding: 12px 2px 0 13px;
        background-position: -147px -238px;
    }

    .play-bar-volume-sound {
        background-position: -2px -248px;
        &:hover {
            background-position: -31px -248px;
        }
    }


    .play-bar-volume-mute {
        background-position: -104px -69px;
        &:hover {
            background-position: -126px -69px;
        }
    }

    .play-bar-volume-ctrl{
        position: absolute;
        left: 10px;
        bottom: 37px;
        @include size(32px, 113px);
        background-position: 0 -503px;
    }

    .play-bar-volume-line{
        position: absolute;
        top: 7px;
        left: 14px;
        @include size(4px, 93px);
        padding: 4px 0;
    }

    .play-bar-volume-current{
        position: absolute;
        left: 0;
        bottom: 4px;
        width: 4px;
        background-position: -40px bottom;
        overflow: hidden;
    }

    .play-bar-volume-dot{
        position: absolute;
        left: -7px;
        @include size(18px, 20px);
        background-position: -40px -250px;
        cursor: pointer;
        &:hover{
            background-position: -40px -280px;
        }
    }

    .play-bar-mode {
        text-indent: -9999px;
    }

    .play-bar-order {
        background-position: -3px -344px;
        &:hover {
            background-position: -33px -344px;
        }
    }


    .play-bar-shuffle {
        background-position: -66px -248px;
        &:hover {
            background-position: -93px -248px;
        }
    }


    .play-bar-loop {
        background-position: -66px -344px;
        &:hover {
            background-position: -93px -344px;
        }
    }

    .play-bar-list-icon {
        display: block;
        width: 38px;
        padding-left: 21px;
        line-height: 27px;
        text: {
            align: center;
            shadow: 0 1px 0 #080707;
        }
        background-position: -42px -68px;
        color: #666;
        cursor: pointer;
        &:hover {
            background-position: -42px -98px;
        }
    }

    .play-bar-lock{
        position: absolute;
        top: -14px;
        right: 15px;
        @include size(52px, 67px);
        background-position: 0 -380px;
    }

    .play-bar-lock-icon{
        display: block;
        @include size(18px, 18px);
        margin: 6px 0 0 17px;
    }

    .play-bar-locked .play-bar-lock-icon {
        background-position: -100px -380px;
        &:hover {
            background-position: -100px -400px;
        }
    }


    .play-bar-unlock .play-bar-lock-icon{
        background-position: -80px -380px;
        &:hover{
            background-position: -80px -400px;
        }
    }


</style>