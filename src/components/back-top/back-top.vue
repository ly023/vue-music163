<template>
    <div class="" @click="back">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    props: {
      main: {
        type: Object,
        default: {}
      }
    },
    data: ()=>({
      backTop: false
    }),
    mounted () {

    },
    methods : {
      back () {
        let main = this.main;
        let interval = Math.floor(main.scrollTop / 5)
        let timer = window.requestAnimationFrame(function fn () {
          main.scrollTop = main.scrollTop - interval
          timer = window.requestAnimationFrame(fn)
          if (main.scrollTop === 0) {
            window.cancelAnimationFrame(timer)
          }
        })
      }
    }
  }
</script>