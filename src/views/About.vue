<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="selector">Hello</div>

    <div style="height: 10000px; width: 20px; background-color: pink"></div>
  </div>
</template>

<script>

export default {
  name: "testAbout",
  mounted() {

    console.log('aaaaaaaaaaaaaaaaaaaa')
    this.LaxAnime.init()

    // Add a driver that we use to control our animations
    this.LaxAnime.addDriver('scrollY', function () {
      return window.scrollY
    })

    // Add animation bindings to elements
    this.LaxAnime.addElements('.selector', {
          scrollY: {      // Animation data
            opacity: [
              [0, 300],
              [1, 0]
            ],

          },
        },
        {
          style: {position: 'fixed', top: '200px', left: '200px'},   // Element options
          modValue: 1200
        })
  }
}

  // window.onload = function () {
  //   this.LaxAnime.init()
  //
  //   // Add a driver that we use to control our animations
  //   this.LaxAnime.addDriver('scrollY', function () {
  //     return window.scrollY
  //   })
  //
  //   // Add animation bindings to elements
  //   this.LaxAnime.addElements('.selector', {
  //     scrollY: {
  //       translateX: [
  //         ["elInY", "elCenterY", "elOutY"],
  //         [0, 'screenWidth/2', 'screenWidth'],
  //       ]
  //     }
  //   })
  // }


</script>
