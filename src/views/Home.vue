<template>
  <div class="main-back-ground">
    <back-ground-flex-triangle/>
    <role-hexagon/>
    <div style="position: absolute; left: 20px; bottom: 25px; font-size: 20px; color: grey;">这个网页正在制作中，敬请期待...</div>
    <div style="position: absolute; left: 20px; bottom: 10px; font-size: 14px; color: grey;">当前为预览内容，不代表最终成品;可能存在性能问题及程序漏洞，反馈：2567240058@qq.com</div>
  </div>
</template>

<script>
import backGroundFlexTriangle from "@/components/backGroundFloatTriangle/BackGroundFloatTriangle";
import roleHexagon from "@/components/roleHexagon/RoleHexagon";
export default {
  name: 'Home',
  components: {
    backGroundFlexTriangle,
    roleHexagon

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
