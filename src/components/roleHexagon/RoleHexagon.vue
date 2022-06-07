<template>
  <div class="role-hexagon-page">
    <div id="role-hexagon-box" class="role-hexagon-box">
<!--      <div class="hexagon"></div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "RoleHexagon",
  data: () => {
    return {

    }
  },
  methods: {
    createHexagon() {
      const hexagonBox = document.getElementById('role-hexagon-box')
      if (hexagonBox !== null && hexagonBox !== undefined) {
        const hexagonDom = document.createElement('div')
        hexagonDom.id = 'aaa'
        hexagonDom.className = 'hexagon'
        hexagonBox.appendChild(hexagonDom)
      }
    }
  },
  mounted() {
    // this.createHexagon()
  }
}
</script>

<style scoped>
  .role-hexagon-page{

    position: absolute;
    left: var(--ZERO-PIXEL);
    top: var(--ZERO-PIXEL);

    width: var(--MAX-SCREEN-WIDTH);
    height: var(--MAX-SCREEN-HEIGHT);

  }

  .role-hexagon-box{

    position: absolute;
    left: var(--ZERO-PIXEL);
    top: var(--ZERO-PIXEL);

    width: var(--MAX-SCREEN-WIDTH);
    height: var(--HEXAGON-BOX-HEIGHT);

    /*background-color: #42b98388;*/

  }

  .hexagon {

    width: var(--HEXAGON-WIDTH);
    height: var(--HEXAGON-HEIGHT);

    /*clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);  !* hexagon *!*/
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);  /* hexagon */

    background-color: var(--hexagon-gray);
  }

</style>