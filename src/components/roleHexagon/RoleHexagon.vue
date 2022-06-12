<template>
  <div class="role-hexagon-page">
    <div id="role-hexagon-box-top" class="role-hexagon-box-top">
<!--            <div class="hexagon"></div>-->
<!--            <div class="hexagon"></div>-->
    </div>
    <div id="role-hexagon-box-bottom" class="role-hexagon-box-bottom">
<!--            <div class="hexagon"></div>-->
<!--            <div class="hexagon"></div>-->
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
    drawHexagon(line, hexagonId) {
      const hexagonBoxTop = document.getElementById('role-hexagon-box-top')
      const hexagonBoxBottom = document.getElementById('role-hexagon-box-bottom')

      // 判断父级存在
      if (hexagonBoxTop !== undefined && hexagonBoxTop !== null && hexagonBoxBottom !== undefined && hexagonBoxBottom !== null) {

        const hexagonBoxClassName = 'role-hexagon'  // 基本类名
        const hexagonBoxId = `${hexagonBoxClassName}-${hexagonId}`  //元素ID

        // 创建六边形的 div 盒子元素 create element
        const roleHexagon = document.createElement('div')
        roleHexagon.id = hexagonBoxId
        roleHexagon.className = hexagonBoxClassName

        // 六边形的样式参数
        const roleHexagonFloat = `float: left;`
        const roleHexagonMarginRight = `margin-right: var(--HEXAGON-MARGIN-RIGHT);`
        const roleHexagonWidth = `width: var(--HEXAGON-WIDTH);`
        const roleHexagonHeight = `height: var(--HEXAGON-HEIGHT);`
        const roleHexagonClipPath = `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);`
        const roleHexagonBgColor = `background-color: var(--hexagon-gray);`

        const roleHexagonOpacity = `opacity: 0`

        // 设置六边形样式 set style
        roleHexagon.setAttribute('style', `${roleHexagonFloat} ${roleHexagonMarginRight} ${roleHexagonWidth} ${roleHexagonHeight} ${roleHexagonClipPath} ${roleHexagonBgColor} ${roleHexagonOpacity}`)

        if(line !== undefined && line !== null) {
          if (line === 1) {
            hexagonBoxTop.appendChild(roleHexagon)
          } else {
            hexagonBoxBottom.appendChild(roleHexagon)
          }
        }
      }
    },
    hexagonsAppearAnimation() {

      // 先正序获取所有六边形的dom，然后再遍历dom制作动画
      let hexagonDomList = []
      for (let i = 0; ; i++) {
        const hexagonDom = document.getElementById(`role-hexagon-${i}`)
        if (hexagonDom !== undefined && hexagonDom !== null) {
          hexagonDomList.push(hexagonDom)
        } else {
          break;
        }
      }

      for (let i = 0; i < hexagonDomList.length; i++) {
        const animeDelay = i * 50  // 每个六边形的动画间隔时间
        this.hexagonAppearAnimation(hexagonDomList[i], animeDelay)
      }

    },
    hexagonAppearAnimation(hexagonDom, animeDelay) {
      // 绘制淡入动画
      if(hexagonDom !== undefined && hexagonDom !== null) {
        hexagonDom.animate(
          [
            {
              opacity: 0
            },
            {
              opacity: 1
            }
          ],
          {
            delay: animeDelay + 50,
            duration: 200,
            direction: 'normal',
            // easing: 'ease-in-out',
            fill: 'forwards',
          }
        )
        hexagonDom.animate(
          [
            {
              transform: `scale(0.5)`
            },
            {
              transform: `scale(1)`
            }
          ],
          {
            delay: animeDelay,
            duration: 150,
            direction: 'normal',
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        )
      }
    },
    initRoleHexagon() {
      for (let i = 0; i<40; i++) {
        if (i % 2 === 1) {
          this.drawHexagon(1,i)
        } else {
          this.drawHexagon(2,i)
        }
      }

      this.hexagonsAppearAnimation()
    }
  },
  mounted() {
    this.initRoleHexagon()

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

    overflow: hidden;

  }

  .role-hexagon-box-top{

    position: absolute;
    left: var(--TOP-HEXAGON-BOX-OFFSET);
    top: var(--TOP-HEXAGON-BOX-TOP);

    width: var(--MAX-SCREEN-WIDTH);
    height: var(--HEXAGON-BOX-HEIGHT);

    /*background-color: #42b98388;*/

    overflow: hidden;

  }

  .role-hexagon-box-bottom{

    position: absolute;
    left: var(--BOTTOM-HEXAGON-BOX-OFFSET);
    top: var(--BOTTOM-HEXAGON-BOX-TOP);

    width: var(--BOTTOM-HEXAGON-BOX-WIDTH);
    height: var(--HEXAGON-BOX-HEIGHT);

    /*background-color: #4642B987;*/

    overflow: hidden;
  }

  .hexagon {

    float: left;
    margin-right: var(--HEXAGON-MARGIN-RIGHT);

    width: var(--HEXAGON-WIDTH);
    height: var(--HEXAGON-HEIGHT);

    /*clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);  !* hexagon *!*/
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);  /* hexagon */

    background-color: var(--hexagon-gray);
  }

</style>