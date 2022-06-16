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
  --main-background-color: #EEEEEEFF;

  --transparent: #00000000;
  --nothingness: #00000000;
  --almost-nothingness: #00000001;

  // triangle part
  --float-triangle-color: #000000FF;
  --almost-float-triangle-color: #000000FE;

  // hexagon part
  --hexagon-gray: #656565FF;
}

// @size
body{
  --ZERO-PIXEL: 0px;

  --MAX-SCREEN-HEIGHT: 100vh;
  --MAX-SCREEN-WIDTH: 100vw;

  //hexagon part
  --HEXAGON-BOX-HEIGHT: clamp(100px, calc((25vh + 8vw) / 2), 25vh);
  --TOP-HEXAGON-BOX-TOP: clamp(90px, calc((20vh + 5vw) / 2), 15vh) ;
  --BOTTOM-HEXAGON-BOX-TOP: calc( var(--TOP-HEXAGON-BOX-TOP) + var(--HEXAGON-BOX-HEIGHT) - ( var(--HEXAGON-BOX-HEIGHT) * 0.2 ) );

  --HEXAGON-HEIGHT: var(--HEXAGON-BOX-HEIGHT);
  --HEXAGON-WIDTH: calc( var(--HEXAGON-HEIGHT) * 0.9 );

  --HEXAGON-MARGIN-RIGHT: clamp(5px, 0.5vw, 20px);

  --BOTTOM-HEXAGON-BOX-OFFSET: calc( var(--HEXAGON-WIDTH) / -2 );
  --TOP-HEXAGON-BOX-OFFSET: calc( var(--HEXAGON-MARGIN-RIGHT) / 2 );

  --BOTTOM-HEXAGON-BOX-WIDTH: calc( 100vw - var(--BOTTOM-HEXAGON-BOX-OFFSET))


}
</style>
