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

  // triangle part
  --float-triangle-color: #000000FF;

  // hexagon part
  --hexagon-gray: #656565FF;
}

// @size
body{
  --ZERO-PIXEL: 0px;

  --MAX-SCREEN-HEIGHT: 100vh;
  --MAX-SCREEN-WIDTH: 100vw;

  --HEXAGON-BOX-HEIGHT: 400px;

  --HEXAGON-HEIGHT: 200px;
  --HEXAGON-WIDTH: calc( var(--HEXAGON-HEIGHT) * 0.9 )
}
</style>
