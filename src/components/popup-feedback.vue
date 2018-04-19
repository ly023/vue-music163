<template>
    <popup :isShow.sync="show" title="意见反馈">
        <div class="popup-feedback">
            <p>任何产品中的问题，欢迎反馈给我们</p>
            <div class="popup-feedback-area">
                <textarea v-model="feedback" @input="countWords"
                        class="popup-form-text" placeholder="请输入反馈内容"></textarea>
                <span class="popup-feedback-count">{{ wordNumber }}/140</span>
            </div>
            <div class="popup-feedback-contact">
                <textarea v-model.trim="contact"
                        class="popup-form-text" placeholder="请留下联系方式（电话、QQ、邮箱）"></textarea>
            </div>
            <div class="popup-error-msg" v-show="errorMsg">{{ errorMsg }}</div>
            <div class="popup-feedback-btns">
                <a href="javascript:;" @click="sendFeedback" class="popup-feedback-btn popup-feedback-confirm" hidefocus="true"><i>发送意见</i></a>
                <a href="javascript:;" @click="closePopup" class="popup-feedback-btn popup-feedback-cancel" hidefocus="true"><i>取 消</i></a>
            </div>
        </div>
    </popup>
</template>

<script>
    import Vue from 'vue'
    import './popup.vue'

    const MAX_WORD_COUNT = 140

    let component = {
      props: {
        isShowPopup: {
          type: Boolean,
          default: false
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
        }
      },
      data: () => ({
          feedback: '',
          contact: '',
          wordNumber: 0,
          errorMsg: ''
      }),
      methods: {
        countWords () {
          let value = this.feedback;
          let trimValue = value.replace(/(^\s*)|(\s*$)/g,'');
          let number = trimValue.length;
          if (number && this.errorMsg) {
            this.errorMsg = '';
          }
          if(number <= MAX_WORD_COUNT && number >=0){
            this.wordNumber = number;
            return;
          }
          this.feedback = trimValue.substr(0, MAX_WORD_COUNT);
          this.wordNumber = MAX_WORD_COUNT;
        },
        closePopup () {
          this.$emit('update:isShowPopup', false);
        },
        sendFeedback () {
          // todo
          if(!this.feedback){
            this.errorMsg = '反馈内容不能为空';
            return;
          }
          console.log(this.feedback, this.contact)
          this.$alert({
            text: '意见发送成功',
            callback: ()=>{}
          });
        }
      }
    }

    Vue.component('popup-feedback',component)

    export default component
</script>

<style lang="scss" type="text/scss">

    %popup-feedback-btn {
        display: inline-block;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        cursor: pointer;
        background: url(~assets/images/button2.png) no-repeat 0 9999px;
    }

    .popup-feedback {
        padding: 0 40px;
    }

    .popup-feedback-area,
    .popup-feedback-contact {
        position: relative;
        margin-top: 5px;
        padding-right: 14px;
    }

    .popup-feedback {
        textarea {
            margin-right: -20px;
            height: 100px;
            width: 100%;
        }
    }

    .popup-feedback-count {
        position: absolute;
        bottom: 8px;
        right: 10px;
        color: #D0D0D0;
    }

    .popup-feedback-btns {
        margin-top: 30px;
        text-align: center;
        .popup-feedback-confirm {
            color: #FFF;
            background-position: right -428px;
            &:hover {
                background-position: right -510px;
                > i {
                    background-position: 0 -469px;
                }
            }
            > i {
                background-position: 0 -387px;
            }
        }
    }


    .popup-feedback-btn {
        @extend %popup-feedback-btn;
        margin: 0 10px;
        padding: 0 5px 0 0;
        white-space: nowrap;
        > i {
            @extend %popup-feedback-btn;
            width: 55px;
            padding: 0 15px 0 20px;
            pointer-events: none;
        }
    }

    .popup-feedback-cancel {
        color: #333;
        background-position: right -100px;
        &:hover {
            background-position: right -182px;
            > i{
                background-position: 0 -141px;
            }
        }
        > i {
            background-position: 0 -59px;
        }
    }

</style>