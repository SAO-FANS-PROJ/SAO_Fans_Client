<template>
  <div class="main-back-ground">
    <loading-page :init-role-hexagon="initRoleHexagon"/>
    <back-ground-flex-triangle />
    <role-hexagon ref="roleHexagon"/>
    <div style="position: absolute; left: 20px; bottom: 29px; font-size: 20px; color: grey;">这个网站仍在建设中，敬请期待...</div>
    <div style="position: absolute; left: 20px; bottom: 10px; font-size: 14px; color: grey;">当前为预览版，不代表最终品质； 预览版可能存在性能问题及程序漏洞，请注意您的隐私； 如需反馈请至：2567240058@qq.com</div>
  </div>
</template>

<script>
import backGroundFlexTriangle from "@/components/backGroundFloatTriangle/BackGroundFloatTriangle";
import roleHexagon from "@/components/roleHexagon/RoleHexagon";
import loadingPage from "@/views/LoadingPage";

export default {
  name: 'Home',
  components: {
    backGroundFlexTriangle,
    roleHexagon,
    loadingPage
  },
  methods: {
    initRoleHexagon() {
      this.$refs.roleHexagon.initRoleHexagon()
    }
  }
}
</script>

<style>
.main-back-ground {
  height: var(--MAX-SCREEN-HEIGHT);
  width: var(--MAX-SCREEN-WIDTH);

  background-color: var(--main-background-color);

  /*background-image: url("../assets/image/main_back_ground.jpg");*/
  /*background-repeat: no-repeat;*/
  /*background-position: center;*/
  /*background-attachment: fixed;*/
  /*background-size: cover;*/
}
</style>
