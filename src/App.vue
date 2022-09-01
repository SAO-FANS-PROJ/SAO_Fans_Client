<template>
  <home></home>
</template>

<script>
import Home from "@/views/Home";
export default {
  name: 'app',
  components: {
    home: Home
  }
}

</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}

// @color
body{
  --white: white;

  --main-background-color: #EEEEEEFF;

  --transparent: #00000000;
  --nothingness: #00000000;
  --almost-nothingness: #00000001;

  // triangle part
  --float-triangle-color: #000000FF;
  --almost-float-triangle-color: #000000FE;

  // hexagon part
  --hexagon-gray-opaque: #656565FE;
  --hexagon-gray: #65656550;
  --hexagon-gray-transparent: #65656501;

  // loading page part
  --loading-page-background-color: #F7F6F4FF;
  --like-white: #00000030
}

// @size
body{
  --ZERO-PIXEL: 0px;

  --MAX-SCREEN-HEIGHT: 100vh;
  --MAX-SCREEN-WIDTH: 100vw;

  --REALLY-LONG: 100000px;

  //hexagon part
  --HEXAGON-BOX-HEIGHT: clamp(100px, calc((28vh + 10vw) / 2), 25vh);
  --TOP-HEXAGON-BOX-TOP: clamp(90px, calc((20vh + 5vw) / 2), 15vh) ;
  --BOTTOM-HEXAGON-BOX-TOP: calc( var(--TOP-HEXAGON-BOX-TOP) + var(--HEXAGON-BOX-HEIGHT) - ( var(--HEXAGON-BOX-HEIGHT) * 0.2 ) );

  --HEXAGON-HEIGHT: var(--HEXAGON-BOX-HEIGHT);
  --HEXAGON-WIDTH: calc( var(--HEXAGON-HEIGHT) * 0.9 );

  --HEXAGON-MARGIN-RIGHT: clamp(5px, 0.5vw, 20px);

  --BOTTOM-HEXAGON-BOX-OFFSET: calc( var(--HEXAGON-WIDTH) / -2 );
  --TOP-HEXAGON-BOX-OFFSET: calc( var(--HEXAGON-MARGIN-RIGHT) / 2 );

  --BOTTOM-HEXAGON-BOX-WIDTH: calc( 100vw - var(--BOTTOM-HEXAGON-BOX-OFFSET));


  // loading page part
  --LOADING-TEXT-TOP: 30vh;
}

// @z-index
body{
  --LOADING-PAGE-Z-INDEX: 500;

  --ROlE-IMAGE-Z-INDEX: 400;  // 角色图片在未点击时的 z-index
  --ROlE-MASK-Z-INDEX: 410;  // 角色详情遮罩的 z-index
  --ROLE-HEXAGON-EXPANDABLE-Z-INDEX: 420;  // 角色六边形在展开后的 z-index
  --ROLE-IMAGE-EXPANDABLE-Z-INDEX: 430;  // 角色图片在展开后的 z-index
}
</style>
