<template>
  <div class="main-back-ground">
    <back-ground-flex-triangle/>
    <role-hexagon/>
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
