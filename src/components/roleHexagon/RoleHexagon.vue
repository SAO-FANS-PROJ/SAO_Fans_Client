<template>
  <div class="role-hexagon-page">
<!--    <div @click="initRoleHexagon">replay</div>-->
    <div id="role-hexagon-box-top" class="role-hexagon-box-top">
<!--            <div class="hexagon"></div>-->
<!--            <div class="hexagon"></div>-->
<!--      <div style="position: absolute; bottom: 0px; float: left; width: var(&#45;&#45;HEXAGON-WIDTH); height: 500px; margin-right: var(&#45;&#45;HEXAGON-MARGIN-RIGHT); background-color: red;"></div>-->
<!--      <div style="position: absolute; bottom: 0px; float: left; width: var(&#45;&#45;HEXAGON-WIDTH); height: 500px; margin-right: var(&#45;&#45;HEXAGON-MARGIN-RIGHT); background-color: red;"></div>-->
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
      roleInfos: [
          {
            roleId: 0,
            roleName: 'Asuna',
            roleImg: 'https://s1.ax1x.com/2022/07/05/jtdxA0.md.png',
            imgSize: '190%',
            imgPosition: '50% -240%',
            imgFilter: '50%'
          },{
          roleId: 1,
          roleName: 'Kirito',
          roleImg: 'https://s3.bmp.ovh/imgs/2022/07/05/4ca6bba90fae3899.png',
          imgSize: '165%',
          imgPosition: '95% 115%',
          imgFilter: '40%'
        },{
          roleId: 2,
          roleName: 'Kirito',
          roleImg: 'https://s3.bmp.ovh/imgs/2022/07/05/4ca6bba90fae3899.png',
          imgSize: '165%',
          imgPosition: '95% 115%',
          imgFilter: '40%'
        },{
          roleId: 3,
          roleName: 'Kirito',
          roleImg: 'https://s3.bmp.ovh/imgs/2022/07/05/4ca6bba90fae3899.png',
          imgSize: '165%',
          imgPosition: '95% 115%',
          imgFilter: '40%'
        },
      ],
      hexagonBoxClassName: 'role-hexagon',
    }
  },
  methods: {
    drawHexagon(line, hexagonId) {
      const hexagonBoxTop = document.getElementById('role-hexagon-box-top')
      const hexagonBoxBottom = document.getElementById('role-hexagon-box-bottom')

      // 判断父级存在
      if (hexagonBoxTop !== undefined && hexagonBoxTop !== null && hexagonBoxBottom !== undefined && hexagonBoxBottom !== null) {

        const hexagonBoxClassName = this.hexagonBoxClassName  // 基本类名
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
        const roleHexagonBgColor = `background-color: var(--hexagon-gray);`  // 不透明度最低值 0.01 可以避免图形完全透明导致重绘
        const roleHexagonOpacity = `opacity: 0.01;` // 不透明度最低值 0.01 可以避免图形完全透明导致重绘
        const roleHexagonDropFilter = '-webkit-backdrop-filter: blur(15px); backdrop-filter: blur(15px);'  // 向后方元素应用的 filter
        const roleHexagonActivePointEvent = 'pointer-events: auto;' // 因为装六边形的盒子不响应鼠标事件了，所以这里显式声明六边形响应鼠标事件，使其实现隔代响应


        // 设置六边形样式 set style
        roleHexagon.setAttribute('style', `${roleHexagonFloat} ${roleHexagonMarginRight} ${roleHexagonWidth} ${roleHexagonHeight} ${roleHexagonClipPath} ${roleHexagonBgColor} ${roleHexagonOpacity} ${roleHexagonDropFilter} ${roleHexagonActivePointEvent}`)
        // 给六边形设置一个键
        roleHexagon.setAttribute('hexagonKey', hexagonId)

        // 鼠标移入移出动画
        roleHexagon.addEventListener('mouseenter', this.roleMouseEnter)
        roleHexagon.addEventListener('mouseleave', this.roleMouseLeave)

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
      // 绘制淡入动画, 0.01 和 0.99 可以避免图形完全透明和完全不透明导致的重绘
      if(hexagonDom !== undefined && hexagonDom !== null) {
        hexagonDom.animate(
          [
            {
              backgroundColor: 'var(--hexagon-gray-transparent)',
              opacity: 0.01
            },
            {
              backgroundColor: 'var(--hexagon-gray)',
              opacity: 0.99
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
    drawRoles() {
      // 生成角色
      const hexagonBoxTop = document.getElementById('role-hexagon-box-top')
      const hexagonBoxBottom = document.getElementById('role-hexagon-box-bottom')

      // 判断父级存在
      if (hexagonBoxTop !== undefined && hexagonBoxTop !== null && hexagonBoxBottom !== undefined && hexagonBoxBottom !== null) {
        this.roleInfos.forEach((roleInfo, index) => {
          const realIndex = index + 1;
          if (realIndex % 2 === 0) { // 如果是偶数
            this.drawRole(hexagonBoxBottom, roleInfo, realIndex)
          } else {
            this.drawRole(hexagonBoxTop, roleInfo, realIndex)
          }
        })
      }

    },
    drawRole(dom, role, realIndex) {
      if(dom !== null && dom !== undefined) {

        // 创建角色图片背景
        const roleImageBoxId = `role-image-${realIndex}`
        const roleImageClassName = 'role-image-class'
        const roleImageBox = document.createElement('div')
        roleImageBox.id = roleImageBoxId
        roleImageBox.className = roleImageClassName

        // 样式
        const roleImageBoxSize = `width: var(--HEXAGON-WIDTH); height: calc( var(--HEXAGON-HEIGHT) * 2.5);`
        const roleImageBoxLeft = `calc(( var(--HEXAGON-MARGIN-RIGHT) + var(--HEXAGON-WIDTH) ) * ${Math.floor(realIndex / 2)})`  // index 除 2 后向下取整，再乘以六边形宽度，得出偏置宽度
        const roleImageBoxPosition = `position: absolute; bottom: 0px; left: ${roleImageBoxLeft};`
        const roleImageBoxClip = 'clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 50% 100%, 0% 90%);'
        const roleImageBoxPointerEvent = 'pointer-events:none;'
        const roleImageBoxOpacity = `opacity: 0.01;` // 不透明度最低值 0.01 可以避免图形完全透明导致重绘
        const roleImageBoxBackgroundImage = `background-image: url(${role.roleImg}); background-repeat: no-repeat;`
        let roleImageBoxBackgroundImageSize = 'background-size: 300%;'
        if (role.imgSize !== '' && role.imgSize !== null && role.imgSize !== undefined) {
          roleImageBoxBackgroundImageSize = `background-size: ${role.imgSize};`
        }
        let roleImageBoxBackgroundImagePosition = 'background-position: center;'
        if (role.imgPosition !== '' && role.imgPosition !== null && role.imgPosition !== undefined) {
          roleImageBoxBackgroundImagePosition = `background-position: ${role.imgPosition};`
        }
        let roleImageBoxBackgroundImageFilter = `filter: grayscale(40%);`
        if (role.imgFilter !== '' && role.imgFilter !== null && role.imgFilter !== undefined) {
          roleImageBoxBackgroundImageFilter = `filter: grayscale(${role.imgFilter});`
        }
        roleImageBox.setAttribute('style', `${roleImageBoxSize} ${roleImageBoxPosition} ${roleImageBoxClip} ${roleImageBoxPointerEvent} ${roleImageBoxOpacity} ${roleImageBoxBackgroundImage} ${roleImageBoxBackgroundImageSize} ${roleImageBoxBackgroundImagePosition} ${roleImageBoxBackgroundImageFilter}`)

        dom.appendChild(roleImageBox)

        const animationDelay = realIndex * 50
        this.roleImageAppearAnimation(roleImageBox, animationDelay)
      }
    },
    roleImageAppearAnimation(roleDom, delay) {

      roleDom.animate(
          [
            {
              opacity: 0.01
            },
            {
              opacity: 0.99
            }
          ],
          {
            delay: delay + 300,
            duration: 200,
            direction: 'normal',
            // easing: 'ease-in-out',
            fill: 'forwards',
          }
      )
    },
    roleMouseEnter(event) {

      const roleIndex = event.target.getAttribute('hexagonKey')
      if (roleIndex !== '' && roleIndex !== 0 && roleIndex !== null && roleIndex !== undefined) {
        const hexagonId = `role-hexagon-${roleIndex}`
        const roleImageId = `role-image-${roleIndex}`
        const hexagonDom = document.getElementById(hexagonId)
        const roleImageDom = document.getElementById(roleImageId)
        if (hexagonDom !== null && hexagonDom !== undefined && roleImageDom !== null && roleImageDom !== undefined) {

          hexagonDom.style.cursor = 'pointer'  // 设置鼠标进入六边形后形状变成小手

          hexagonDom.animate(
              [
                {
                  backgroundColor: 'var(--hexagon-gray)',
                },
                {
                  backgroundColor: 'var(--hexagon-gray-opaque)',
                }
              ],
              {
                duration: 350,
                direction: 'normal',
                easing: 'ease-in-out',
                fill: 'forwards',
              }
          )

          const roleImageDomFilter = roleImageDom.style.filter
          if (roleImageDomFilter !== '' && roleImageDomFilter !== null && roleImageDomFilter !== undefined) {
            roleImageDom.setAttribute('active-role-filter-value', roleImageDomFilter)
            roleImageDom.animate(
                [
                  {
                    filter: roleImageDomFilter,
                  },
                  {
                    filter: `grayscale(0%)`,
                  }
                ],
                {
                  duration: 230,
                  direction: 'normal',
                  easing: 'ease-in-out',
                  fill: 'forwards',
                }
            )
          }
        }
      }
    },
    roleMouseLeave(event) {

      const roleIndex = event.target.getAttribute('hexagonKey')
      if (roleIndex !== '' && roleIndex !== 0 && roleIndex !== null && roleIndex !== undefined) {
        const hexagonId = `role-hexagon-${roleIndex}`
        const roleImageId = `role-image-${roleIndex}`
        const hexagonDom = document.getElementById(hexagonId)
        const roleImageDom = document.getElementById(roleImageId)
        if (hexagonDom !== null && hexagonDom !== undefined && roleImageDom !== null && roleImageDom !== undefined) {
          hexagonDom.animate(
              [
                {
                  backgroundColor: 'var(--hexagon-gray-opaque)',
                },
                {
                  backgroundColor: 'var(--hexagon-gray)',
                }
              ],
              {
                duration: 280,
                direction: 'normal',
                easing: 'ease-in-out',
                fill: 'forwards',
              }
          )

          const activeRoleImageFilterValue = roleImageDom.getAttribute('active-role-filter-value')
          if (activeRoleImageFilterValue !== '' && activeRoleImageFilterValue !== null && activeRoleImageFilterValue !== undefined) {
            roleImageDom.animate(
                [
                  {
                    filter: 'grayscale(0%)',
                  },
                  {
                    filter: activeRoleImageFilterValue,
                  }
                ],
                {
                  duration: 180,
                  direction: 'normal',
                  easing: 'ease-in-out',
                  fill: 'forwards',
                }
            )
          }
        }
      }
    },
    addRoleHexagonClickEvent() {
      const rolesCount = this.roleInfos.length
      for (let hexagonId = 1; hexagonId <= rolesCount; hexagonId++) {  // 因为角色是从第二个六边形上开始绘制的，所以索引要从 1 开始 （左下露出一半的为 0 号六边形，左上为 1 号六边形，依此类推）
        const hexagonBoxClassName = this.hexagonBoxClassName  // 基本类名
        const hexagonBoxId = `${hexagonBoxClassName}-${hexagonId}`  //元素ID
        const hexagonDomWhoHaveRole = document.getElementById(hexagonBoxId)
        if (hexagonDomWhoHaveRole !== null && hexagonDomWhoHaveRole !== undefined) {
          hexagonDomWhoHaveRole.addEventListener('click', this.RoleHexagonClickEvent)
        }
      }
    },
    RoleHexagonClickEvent(event) {
      const roleIndex = event.target.getAttribute('hexagonKey')
      this.$store.commit('updateActiveRole', roleIndex)
    },
    initRoleHexagon() {

      const hexagonBoxTop = document.getElementById('role-hexagon-box-top')
      const hexagonBoxBottom = document.getElementById('role-hexagon-box-bottom')

      // 判断父级存在
      if (hexagonBoxTop !== undefined && hexagonBoxTop !== null && hexagonBoxBottom !== undefined && hexagonBoxBottom !== null) {

        // 清空
        hexagonBoxTop.innerHTML = ''
        hexagonBoxBottom.innerHTML = ''
      }
      // this.roleInfos.length + 40  比总角色数还要长40
      for (let i = 0; i<this.roleInfos.length + 40; i++) {
        if (i % 2 === 1) {
          this.drawHexagon(1,i)
        } else {
          this.drawHexagon(2,i)
        }
      }
      this.hexagonsAppearAnimation()

      this.drawRoles()

      this.addRoleHexagonClickEvent()
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

    width: var(--REALLY-LONG);
    height: var(--HEXAGON-BOX-HEIGHT);

    /* 阻止六边形盒子的鼠标事件，但是六边形本身显示声明了不阻止鼠标事件响应，因此实现了隔代响应；即鼠标移动到六边形上时是有反应的，但装六边形的父级(装六边形的盒子)并不会遮挡响应 */
    pointer-events: none;

    /*background-color: #42b98388;*/

    /*overflow: hidden;*/

  }

  .role-hexagon-box-bottom{

    position: absolute;
    left: var(--BOTTOM-HEXAGON-BOX-OFFSET);
    top: var(--BOTTOM-HEXAGON-BOX-TOP);

    width: var(--REALLY-LONG);
    height: var(--HEXAGON-BOX-HEIGHT);

    /* 阻止六边形盒子的鼠标事件，但是六边形本身显示声明了不阻止鼠标事件响应，因此实现了隔代响应；即鼠标移动到六边形上时是有反应的，但装六边形的父级(装六边形的盒子)并不会遮挡响应 */
    pointer-events: none;

    /*background-color: #4642B987;*/

    /*overflow: hidden;*/
  }

  .hexagon {

    float: left;
    margin-right: var(--HEXAGON-MARGIN-RIGHT);

    width: var(--HEXAGON-WIDTH);
    height: var(--HEXAGON-HEIGHT);

    /*clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);  !* hexagon *!*/
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);  /* hexagon */

    background-color: var(--hexagon-gray-opaque);
  }

</style>