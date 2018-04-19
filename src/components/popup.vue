<template>
  <div class="popup" v-show="isShow" :style="style" ref="popup">
      <div class="popup-bar"
           @mousedown="pressPopup"
           @mousemove="movePopup"
           @mouseleave="upPopup"
           @mouseup="upPopup">
          <p class="popup-title">{{ title }}</p>
          <span @click="closePopup" class="popup-close" title="关闭窗体">×</span>
      </div>
      <div class="popup-cont">
          <slot></slot>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { getMousePageX, getMousePageY } from 'utils/util'

  let component = {
    props: {
       isShow: {
         type: Boolean,
         default: false
       },
      title: {
         type: String,
         default: ''
      }
    },
    data: ()=>({
      style:'',
      isDrag: false,
      startPosX: 0,
      startPosY: 0,
      endPosX: 0,
      endPosY: 0,
    }),
    mounted () {

    },
    watch: {

    },
    computed: {

    },
    methods: {
      closePopup () {
        this.$emit('update:isShow', false);
      },
      pressPopup (e) {
        let popup = window.getComputedStyle(this.$refs.popup);
        this.startPosX = getMousePageX(e);
        this.startPosY = getMousePageY(e);
        this.top = parseInt(popup.top, 10);
        this.left = parseInt(popup.left, 10);
        this.isDrag = true;
      },
      movePopup (e) {
        if(!this.isDrag){
          return;
        }

       this.endPosX = getMousePageX(e);
       this.endPosY = getMousePageY(e);

       let moveX = this.endPosX - this.startPosX;
       let moveY = this.endPosY - this.startPosY;

       this.style = {
         top: `${this.top + moveY}px`,
         left: `${this.left + moveX}px`
       }
      },
      upPopup () {
        this.isDrag = false;
      }
    },


  }

  Vue.component('popup', component)

  export default component
</script>

<style lang="scss" type="text/scss">
    .popup{
        position: fixed;
        z-index: 9998;
        width: 530px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #FFF;
        border-radius: 4px;
        box-shadow: 0 5px 16px rgba(0,0,0,0.8);
        border: none;
    }

    .popup-bar {
        position: relative;
        z-index: 10;
        border-bottom: 1px solid #191919;
        border-radius: 4px 4px 0 0;
        background-color: #2D2D2D;
        cursor: move;
    }

    .popup-title {
        padding-right: 45px;
        margin: 0;
        height: 38px;
        line-height: 38px;
        padding-left: 18px;
        border-radius: 3px 3px 0 0;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
    }

    .popup-close {
        position: absolute;
        z-index: 20;
        top: 16px;
        right: 20px;
        width: 10px;
        height: 10px;
        overflow: hidden;
        text-indent: -9999px;
        cursor: pointer;
        background: url(~assets/images/layer.png) no-repeat 0 -95px;
    }

    .popup-cont {
        padding: 40px 0;
    }

    .popup-cont a{
        font-size: 12px;
        color: #333;
    }

    .popup-form-text {
        margin: 0;
        padding: 5px 6px 6px;
        border: 1px solid #cdcdcd;
        border-radius: 2px;
        line-height: 19px;
    }

    .popup-error-msg {
        height: 17px;
        margin-top: 5px;
        line-height: 17px;
        color: #E33232;
    }
</style>