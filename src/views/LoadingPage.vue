<template>
  <div id="loading-page-box" class="loading-page" @click="hiddenLoadingPage">
    <div class="loading-text-box" v-if="!isPhone">
      <div class="loading-text-title" v-if="!isPhone">这虽然是游戏，但可不是闹着玩的。</div>
      <div class="loading-text-title" v-if="isPhone">
        <div>这虽然是游戏，</div>
        <div>但可不是闹着玩的。</div>
      </div>
      <div class="loading-text-title-author">——《刀剑神域》</div>
    </div>
    <div class="loading-text-box-phone" v-if="isPhone">
      <div class="loading-text-title" v-if="isPhone">
        <div style="float: left">这虽然是游戏，</div>
        <div style="float: right">但可不是闹着玩的。</div>
      </div>
      <div class="loading-text-title-author">——《刀剑神域》</div>
    </div>
    <div id="loading-page-loading-box" class="loading-page-loading" v-if="onLoading && !isPhone">加载中...</div>
    <div class="loading-page-loading" v-if="!onLoading && !isPhone">点击进入</div>
    <div class="loading-page-is-phone" v-if="isPhone">
      <div>SAO@root ~&gt; 正在载入系统 /</div>
      <div>SAO@root ~&gt; ...</div>
      <div>SAO@root ~&gt; <span style="color: #d30000">设备异常，请使用桌面设备访问</span></div>
    </div>
  </div>
  <div class="turn-your-phone-180" v-if="isPhone && is90Degree">将手机屏幕横置后刷新本页面以提升使用体验<br>如非必要请使用桌面设备访问本站.</div>
</template>

<script>
import isPhone from '@/common/API/checkPhoneOrPc'
import {is90Degree} from '@/common/API/check90Or180Degree'

export default {
  name: "LoadingPage",
  props: {
    initRoleHexagon: Function
  },
  data: () => {
    return {
      onLoading: true,
      isPhone: true,
      is90Degree: true
    }
  },
  methods: {
    setNotLoading () {
      this.onLoading = false
    },
    hiddenLoadingPage() {
      if (this.onLoading !== true && this.isPhone !== true ) {
        document.getElementById('loading-page-box').style.display = 'none'
        window.removeEventListener('load', this.setNotLoading)
        this.initRoleHexagon()
      } else {
        const loadingText = document.getElementById('loading-page-loading-box')
        if (loadingText !== undefined && loadingText !== null) {
          loadingText.animate(
              [
                {
                  color: '#FF0000FF',
                  transform: `translate(5px, 8px)`
                },
                {
                  color: '#000000FF',
                  transform: `translate(-6px, -2px)`
                },
                {
                  color: '#FF0000FF',
                  transform: `translate(5px, 5px)`
                },
                {
                  color: '#000000FF',
                  transform: `translate(-4px, -6px)`
                },
                {
                  color: '#FF0000FF',
                  transform: `translate(2px, -3px)`
                },
                {
                  color: '#000000FF',
                  transform: `translate(-5px, 3px)`
                },
                {
                  color: '#FF0000FF',
                  transform: `translate(2px, 5px)`
                },
                {
                  color: '#000000FF',
                  transform: `translate(0px, 0px)`
                },
              ],
              {
                duration: 800,
                direction: 'normal',
                easing: 'ease-in-out',
                fill: 'forwards',
              }
          )
        }
      }
    },
    checkLoading() {
      window.addEventListener('load', this.setNotLoading)
    },
    checkPhone(){
      this.isPhone = isPhone();
    },
    checkPhoneDegree() {
      this.is90Degree = is90Degree()
    }
  },
  mounted() {
    this.checkLoading()
    this.checkPhone()
    this.checkPhoneDegree()
  }
}
</script>

<style scoped>
.loading-page {
  position: absolute;
  top: var(--ZERO-PIXEL);
  left: var(--ZERO-PIXEL);

  width: var(--MAX-SCREEN-WIDTH);
  height: var(--MAX-SCREEN-HEIGHT);

  background-color: var(--loading-page-background-color);

  z-index: var(--LOADING-PAGE-Z-INDEX);

  display: flex;
  align-items: center;
  flex-direction: column;
}

.loading-text-box {

  margin-top: 20vh;

  width: 600px;
  height: 100px;

  /*background-color: #42b98366;*/

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.loading-text-box-phone {
  margin-top: 20vh;

  width: 90vw;
  height: 100px;

  /*background-color: #42b98366;*/

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loading-text-title {
  width: 100%;
  text-align: center;
  font-size: 30px;
}
.loading-text-title-author {

  margin-top: 10px;

  width: 95%;
  text-align: right;
  font-size: 20px;
}
.loading-page-loading {
  margin-top: 40px;
}
.loading-page-is-phone {
  margin-top: 40px;
}
.turn-your-phone-180 {
  position: absolute;
  top: 5px;
  right: 8px;

  text-align: right;

  font-size: 1em;

  color: var(--like-white);
}
</style>