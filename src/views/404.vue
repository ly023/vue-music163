<template>
    <div class="not-found">
       <div class="not-found-wrapper">
           <i class="not-found-icon"></i>
           <p class="not-found-note">很抱歉，你要查找的网页找不到</p>
       </div>
    </div>
</template>

<style>
    .not-found {
        min-width: 982px;
        background: #f5f5f5;
    }

    .not-found-wrapper{
        padding: 165px 0 166px;
        text-align: center;
        background-color: #FFF;
    }

    .not-found-icon {
        display: inline-block;
        width: 270px;
        height: 112px;
        background: url(~assets/images/logo.png) no-repeat 0 -405px;
    }

    .not-found-note {
        margin-top: 35px;
        font-size: 18px;
        font-family: "Microsoft Yahei";
        color: #666;
    }
</style>