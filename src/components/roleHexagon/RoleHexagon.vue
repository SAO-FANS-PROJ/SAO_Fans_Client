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
<!--    <div id="testdiv"></div>-->
  </div>
</template>

<script>
export default {
  name: "RoleHexagon",
  data: () => {
    return {
      roleInfos: [
        {
          roleId: 1,
          roleName: 'Asuna',
          roleImg: 'https://s1.ax1x.com/2022/07/05/jtdxA0.md.png',
          imgSize: '190%',
          imgPosition: '50% -240%',
          imgFilter: '50%',
        },{
          roleId: 2,
          roleName: 'Kirito',
          roleImg: 'https://s3.bmp.ovh/imgs/2022/07/05/4ca6bba90fae3899.png',
          imgSize: '165%',
          imgPosition: '95% 115%',
          imgFilter: '40%',
          detailDisplay: {
            animationTime: 600,
            easing: 'cubic-bezier(.69,.11,.25,.95)',
            hexagon: {
              height: `calc((40vh + 40vw) / 2)`,
              width: `calc((40vh + 40vw) / 1.5)`,
              left: `50vw`,
              top: `20vh`,
              backgroundColor: 'white',
              innerBoxShadow: '0 0 350px #0467FF54 inset',
              clipPath: 'polygon(100% 60%, 100% 60%, 100% 60%, 10% 100%, 0% 70%, 0% 70%)',
            },
            image: {
              height: `calc(((40vh + 40vw) / 2.5) * 2.5)`,   // 高等于宽*2.5 与角色图片没点击时是相同比例
              width: `calc((40vh + 40vw) / 2.5)`,
              left: `50vw`,
              top: `calc(20vh - calc((((40vh + 40vw) / 2.5) * 2.5) - ((40vh + 40vw) / 2)))`,    // 如果要保持背景和图片的下边一致 top = 背景的top - (图片的高度 - 背景的高度)
              backgroundSize: `100%`,
              backgroundPosition: '95% 95%',
              sizeAnimationProportion: 1, // 角色图片的缩放动画比位置变化动画快多少倍
              clipPath: 'polygon(0% 0%, 100% 0%, calc((40vh + 40vw) / 1.5) calc((((40vh + 40vw) / 2.5) * 2.5) - (((40vh + 40vw) / 2) * 0.4)), calc(((40vh + 40vw) / 1.5) * 0.1) 100%, calc(((40vh + 40vw) / 1.5) * 0.1) 100%)',

              // polygon(0% 0%, 100% 0%, 100% calc((((40vh + 40vw) / 2) * 0.4) * ((((40vh + 40vw) / 2.5) - (((40vh + 40vw) / 1.5) * 0.1)) / (((40vh + 40vw) / 1.5) * 0.9))), calc(((40vh + 40vw) / 1.5) * 0.1) 100%, 0% calc(((40vh + 40vw) / 2) * 0.3))

            }
          },
        },
      ],
      hexagonBoxClassName: 'role-hexagon',
      roleImageClassName: 'role-image',
      roleImageExpandableClassName: 'role-image-expandable',
      roleHexagonExpandableClassName: 'role-hexagon-expandable',
      animateHexagonBoxClassName: 'animate-role-hexagon',
      animateDisplayShapeBoxClassName: 'animate-role-display-shape',
      roleMaskClassName: 'role-mask',
    }
  },
  computed: {
    activeRoleIndex() {return this.$store.state.activeRole},
    roleExpandAnimation() {return this.$store.state.roleExpandAnimation}
  },
  watch: {
    activeRoleIndex(newRoleIndex) {
      if (newRoleIndex !== null && newRoleIndex !== undefined && newRoleIndex !== '') {
        this.expandRoleDetail(newRoleIndex)
      }
    }
  },
  methods: {
    drawHexagon(line, hexagonId) {
      const hexagonBoxTop = document.getElementById('role-hexagon-box-top')
      const hexagonBoxBottom = document.getElementById('role-hexagon-box-bottom')

      // 判断父级存在
      if (hexagonBoxTop !== undefined && hexagonBoxTop !== null && hexagonBoxBottom !== undefined && hexagonBoxBottom !== null) {

        const hexagonBoxClassName = this.hexagonBoxClassName  // 基本类名
        const hexagonBoxId = `${this.hexagonBoxClassName}-${hexagonId}`  //元素ID

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
        const hexagonDom = document.getElementById(`${this.hexagonBoxClassName}-${i}`)
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
        const roleImageBoxId = `${this.roleImageClassName}-${realIndex}`
        const roleImageClassName = this.roleImageClassName
        const roleImageBox = document.createElement('div')
        roleImageBox.id = roleImageBoxId
        roleImageBox.className = roleImageClassName

        // 样式
        const roleImageBoxSize = `width: var(--HEXAGON-WIDTH); height: calc( var(--HEXAGON-HEIGHT) * 2.5);`
        const roleImageBoxLeft = `calc(( var(--HEXAGON-MARGIN-RIGHT) + var(--HEXAGON-WIDTH) ) * ${Math.floor(realIndex / 2)})`  // index 除 2 后向下取整，再乘以六边形宽度，得出偏置宽度
        const roleImageBoxPosition = `position: absolute; bottom: 0px; left: ${roleImageBoxLeft};`
        const roleImageBoxZIndex = `z-index: var(--ROlE-IMAGE-Z-INDEX);`
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
        roleImageBox.setAttribute('style', `${roleImageBoxSize} ${roleImageBoxPosition} ${roleImageBoxZIndex} ${roleImageBoxClip} ${roleImageBoxPointerEvent} ${roleImageBoxOpacity} ${roleImageBoxBackgroundImage} ${roleImageBoxBackgroundImageSize} ${roleImageBoxBackgroundImagePosition} ${roleImageBoxBackgroundImageFilter}`)

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
        const hexagonId = `${this.hexagonBoxClassName}-${roleIndex}`
        const roleImageId = `${this.roleImageClassName}-${roleIndex}`
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
        const hexagonId = `${this.hexagonBoxClassName}-${roleIndex}`
        const roleImageId = `${this.roleImageClassName}-${roleIndex}`
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
    },
    expandRoleDetail(roleIndex){

      console.log('roleIndex', roleIndex)

      // 生成角色
      const hexagonBoxTop = document.getElementById('role-hexagon-box-top')
      const hexagonBoxBottom = document.getElementById('role-hexagon-box-bottom')

      // 判断父级存在
      if (hexagonBoxTop !== undefined && hexagonBoxTop !== null && hexagonBoxBottom !== undefined && hexagonBoxBottom !== null) {
        if (roleIndex % 2 === 0) { // 如果是偶数
          this.expandableRole(hexagonBoxBottom, 'bottom', roleIndex)
        } else {
          this.expandableRole(hexagonBoxTop, 'top', roleIndex)
        }
      }


    },
    expandableRole(dom, domPosition, roleIndex) {

      // 这个地方需要换一下思路了
      // 首先获取到 角色图片 和 背景六边形 的 dom (以下简称 I 和 H)
      // 然后获取 I 和 H 的位置属性和宽高属性  getBoundingClientRect()
      // 获取源 I 和 H 的内容属性
      // 使用 position: fixed 定位，结合上一步获取的位置，就能够在原位置生成 I 和 H 的副本; 与此同时隐藏掉原来的 I 和 H

      // 从 data 里获取 I 和 H 的新裁切属性、新位置属性、新尺寸属性
      // 生成两个透明的灰色遮罩，分别位于 id = ‘role-hexagon-box-top’ 和 id = ‘role-hexagon-box-bottom’ 的 div 中 (这两个div是用来装所有的 I 和 H 的)

      // 修改 I 和 H 的 z-index 使其出现在遮罩的上面
      // 与上一步同时动画 I 和 H
      // 与上一步同时动画遮罩的淡入

      // 存储动画对象至 vuex

      // 设置遮罩的点击事件(关闭)


      // console.log('role index: ', roleIndex)
      if( roleIndex!==null
          && this.roleInfos[roleIndex-1].detailDisplay !== undefined
          && this.roleInfos[roleIndex-1].detailDisplay.hexagon !== undefined
          && this.roleInfos[roleIndex-1].detailDisplay.image !== undefined
          && this.roleInfos[roleIndex-1].detailDisplay.animationTime !== undefined && this.roleInfos[roleIndex-1].detailDisplay.animationTime !== null
          && this.roleInfos[roleIndex-1].detailDisplay.easing !== undefined
        ){

        const roleHexagonDom = document.getElementById(`${this.hexagonBoxClassName}-${roleIndex}`)
        const roleImageDom = document.getElementById(`${this.roleImageClassName}-${roleIndex}`)

        if ( roleHexagonDom !== null && roleHexagonDom !== undefined && roleImageDom !== null && roleImageDom !== undefined ) {
          const roleHexagonClient = roleHexagonDom.getBoundingClientRect()
          const roleImageClient = roleImageDom.getBoundingClientRect()

          const roleHexagonStyle = roleHexagonDom.style
          const roleImageStyle = roleImageDom.style

          if( roleHexagonClient !== null && roleHexagonClient !== undefined && roleImageClient !== null && roleImageClient !== undefined
              && roleHexagonStyle !== null && roleHexagonStyle !== undefined && roleImageStyle !== null && roleImageStyle !== undefined ) {


            // console.log('roleHexagonClient', roleHexagonClient)
            // console.log('roleImageClient', roleImageClient)
            // console.log('roleHexagonStyle', roleHexagonStyle)
            // console.log('roleImageStyle', roleImageStyle)



            // 创建可扩展的角色图片
            const roleImageExpandableBoxId = `${this.roleImageExpandableClassName}-${roleIndex}`
            const roleImageExpandableClassName = this.roleImageExpandableClassName
            const roleImageExpandableBox = document.createElement('div')
            roleImageExpandableBox.id = roleImageExpandableBoxId
            roleImageExpandableBox.className = roleImageExpandableClassName

            // 角色图片样式
            const roleImageExpandableBoxSize = `width: ${roleImageStyle.width}; height: ${roleImageStyle.height};`
            const roleImageExpandableBoxPosition = `position: fixed; left: ${roleImageClient.left}px; top: ${roleImageClient.top}px;`
            const roleImageExpandableClipPath = `clip-path: ${roleImageStyle.clipPath};`
            const roleImageExpandableBackground = `background-image: ${roleImageStyle.backgroundImage}; background-repeat: no-repeat; background-size: ${roleImageStyle.backgroundSize}; background-position: ${roleImageStyle.backgroundPosition};`
            const roleImageExpandableZIndex = `z-index: var(--ROLE-IMAGE-EXPANDABLE-Z-INDEX);`

            roleImageExpandableBox.setAttribute('style', `${roleImageExpandableBoxSize} ${roleImageExpandableBoxPosition} ${roleImageExpandableClipPath} ${roleImageExpandableBackground} ${roleImageExpandableZIndex}`)
            dom.appendChild(roleImageExpandableBox)


            // 创建可扩展的角色六边形
            const roleHexagonExpandableBoxId = `${this.roleHexagonExpandableClassName}-${roleIndex}`
            const roleHexagonExpandableClassName = this.roleHexagonExpandableClassName
            const roleHexagonExpandableBox = document.createElement('div')
            roleHexagonExpandableBox.id = roleHexagonExpandableBoxId
            roleHexagonExpandableBox.className = roleHexagonExpandableClassName

            // 样式
            const roleHexagonExpandableBoxSize = `width: ${roleHexagonStyle.width}; height: ${roleHexagonStyle.height};`
            const roleHexagonExpandableBoxPosition = `position: fixed; left: ${roleHexagonClient.left}px; top: ${roleHexagonClient.top}px;`
            const roleHexagonExpandableBoxClipPath = `clip-path: ${roleHexagonStyle.clipPath};`
            const roleImageExpandableBackgroundColor = `background-color: var(--hexagon-gray-opaque);`
            const roleHexagonExpandableZIndex = `z-index: var(--ROLE-HEXAGON-EXPANDABLE-Z-INDEX);`


            roleHexagonExpandableBox.setAttribute('style', `${roleHexagonExpandableBoxSize} ${roleHexagonExpandableBoxPosition} ${roleHexagonExpandableBoxClipPath} ${roleImageExpandableBackgroundColor} ${roleHexagonExpandableZIndex}`)
            dom.appendChild(roleHexagonExpandableBox)


            // 隐藏原来的 dom  ( visibility: hidden; 的隐藏会让元素消失，但仍然占位 )
            roleImageDom.style.visibility = 'hidden'
            roleHexagonDom.style.visibility = 'hidden'




            // 创建遮罩
            const RoleDisplayMask = document.createElement('div')
            RoleDisplayMask.className = this.roleMaskClassName
            RoleDisplayMask.id = `${this.roleMaskClassName}-${domPosition}`

            const roleMaskPosition = 'position: fixed; top: var(--ZERO-PIXEL); left: var(--ZERO-PIXEL);'
            const roleMaskSize = 'width: var(--MAX-SCREEN-WIDTH); height: var(--MAX-SCREEN-HEIGHT);'
            const roleMaskBackgroundColor = 'background-color: var(--mask-gray);'
            const roleMaskPointerEvent = 'pointer-events: all;'
            const roleMaskMouseCursor = 'cursor: zoom-out;'

            const roleMaskZIndex = 'z-index: var(--ROlE-MASK-Z-INDEX);'
            // 设置遮罩样式 set style*/
            const maskStyle = `${roleMaskPosition} ${roleMaskSize} ${roleMaskBackgroundColor} ${roleMaskPointerEvent} ${roleMaskMouseCursor} ${roleMaskZIndex}`
            RoleDisplayMask.setAttribute('style', maskStyle)

            dom.appendChild(RoleDisplayMask) // 创建遮罩


            // 设置背景六边形的动画
            const roleHexagonAnimation = roleHexagonExpandableBox.animate([
              {
                clipPath: `${roleHexagonExpandableBox.style.clipPath}`,
                height: `${roleHexagonExpandableBox.offsetHeight}px`,
                width: `${roleHexagonExpandableBox.offsetWidth}px`,
                left: `${roleHexagonExpandableBox.style.left}`,
                top: `${roleHexagonExpandableBox.style.top}`,
                backgroundColor: `${roleHexagonExpandableBox.style.backgroundColor}`,
              },
              {
                clipPath: this.roleInfos[roleIndex-1].detailDisplay.hexagon.clipPath,
                height: this.roleInfos[roleIndex-1].detailDisplay.hexagon.height,
                width: this.roleInfos[roleIndex-1].detailDisplay.hexagon.width,
                left: this.roleInfos[roleIndex-1].detailDisplay.hexagon.left,
                top: this.roleInfos[roleIndex-1].detailDisplay.hexagon.top,
                backgroundColor: this.roleInfos[roleIndex-1].detailDisplay.hexagon.backgroundColor,
                boxShadow: this.roleInfos[roleIndex-1].detailDisplay.hexagon.innerBoxShadow,
              }
              ],
              {
                duration: this.roleInfos[roleIndex-1].detailDisplay.animationTime,
                direction: 'normal',
                easing: this.roleInfos[roleIndex-1].detailDisplay.easing,
                fill: 'forwards',
              }
            )

            // filter: drop-shadow(0px 0px 200px red);
            // box-shadow: 0 0 400px #0467ff54 inset;


            // 设置可扩展角色图片的动画 (位置)
            const roleImagePositionAnimation = roleImageExpandableBox.animate([
              {
                height: `${roleImageExpandableBox.offsetHeight}px`,
                width: `${roleImageExpandableBox.offsetWidth}px`,
                left: `${roleImageExpandableBox.style.left}`,
                top: `${roleImageExpandableBox.style.top}`,
                clipPath: `${roleImageExpandableBox.style.clipPath}`,
              },
              {
                height: this.roleInfos[roleIndex-1].detailDisplay.image.height,
                width: this.roleInfos[roleIndex-1].detailDisplay.image.width,
                left: this.roleInfos[roleIndex-1].detailDisplay.image.left,
                top: this.roleInfos[roleIndex-1].detailDisplay.image.top,
                clipPath: this.roleInfos[roleIndex-1].detailDisplay.image.clipPath,
              }
              ],
              {
                duration: this.roleInfos[roleIndex-1].detailDisplay.animationTime,
                direction: 'normal',
                easing: this.roleInfos[roleIndex-1].detailDisplay.easing,
                fill: 'forwards',
              }
            )

            // 设置可扩展角色图片的动画 (尺寸)
            const roleImageSizeAnimation = roleImageExpandableBox.animate([
              {
                backgroundSize: `${roleImageExpandableBox.style.backgroundSize}`,
                backgroundPosition: `${roleImageExpandableBox.style.backgroundPosition}`,
              },
              {
                backgroundSize: this.roleInfos[roleIndex-1].detailDisplay.image.backgroundSize,
                backgroundPosition: this.roleInfos[roleIndex-1].detailDisplay.image.backgroundPosition,
              }
              ],
              {
                duration: this.roleInfos[roleIndex-1].detailDisplay.animationTime / this.roleInfos[roleIndex-1].detailDisplay.image.sizeAnimationProportion,
                direction: 'normal',
                easing: this.roleInfos[roleIndex-1].detailDisplay.easing,
                fill: 'forwards',
              }
            )


            // 遮罩出现的动画
            const roleMastAnimation = RoleDisplayMask.animate([
              {
                opacity: 0.1
              },
              {
                opacity: 0.9
              }
              ],
              {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'both'
              }
            )


            // 把动画对象存储到vuex里
            this.$store.commit('updateRoleExpandAnimation', {roleMastAnimation, roleHexagonAnimation, roleImagePositionAnimation, roleImageSizeAnimation})

            // 给遮罩添加点击(关闭)事件
            // 设置一个延迟，防抖
            setTimeout(() => {
              RoleDisplayMask.addEventListener('click', this.closeRoleDetail)
            }, 300)
          }
        }
      }
    },
    closeRoleDetail() {
      // 角色详情页面关闭动画
      const animations = this.roleExpandAnimation
      const activeRoleIndex = this.activeRoleIndex
      if (animations !== undefined && activeRoleIndex !== undefined) {
        const roleMastAnimation = animations.roleMastAnimation
        const roleHexagonAnimation = animations.roleHexagonAnimation
        const roleImagePositionAnimation = animations.roleImagePositionAnimation
        const roleImageSizeAnimation = animations.roleImageSizeAnimation


        if (roleMastAnimation !== undefined && roleHexagonAnimation !== undefined && roleImagePositionAnimation !== undefined && roleImageSizeAnimation !== undefined) {
          const animeFullTime = roleHexagonAnimation.currentTime
          if (animeFullTime !== null) {
            const roleHexagonOriginDom = document.getElementById(`${this.hexagonBoxClassName}-${activeRoleIndex}`)
            const roleImageOriginDom = document.getElementById(`${this.roleImageClassName}-${activeRoleIndex}`)
            const roleHexagonExpandableDom = document.getElementById(`${this.roleHexagonExpandableClassName}-${activeRoleIndex}`)
            const roleImageExpandableDom = document.getElementById(`${this.roleImageExpandableClassName}-${activeRoleIndex}`)
            const roleMaskDom = document.getElementsByClassName(this.roleMaskClassName)
            if( roleHexagonOriginDom !== null && roleHexagonOriginDom !== undefined
                && roleImageOriginDom !== null && roleImageOriginDom !== undefined
                && roleHexagonExpandableDom !== null && roleHexagonExpandableDom !== undefined
                && roleImageExpandableDom !== null && roleImageExpandableDom !== undefined
                && roleMaskDom !== null && roleMaskDom !== undefined && roleMaskDom.length > 0 && roleMaskDom[0] !== null && roleMaskDom[0] !== undefined
            ){
              //移除遮罩上的监听器，防抖
              roleMaskDom[0].removeEventListener('click', this.closeRoleDetail)

              // 把 vuex 里存的动画都倒放一遍
              roleMastAnimation.reverse()
              roleHexagonAnimation.reverse()
              roleImagePositionAnimation.reverse()
              roleImageSizeAnimation.reverse()

              // setTimeout 动画结束后
              // 1. 显示原角色dom 、
              // 2. 销毁遮罩、可动画角色六边形 和 可动画角色图片
              // 3. 清除vuex中已点击的 activeRole 状态 (置空字符串)
              setTimeout(() => {
                roleHexagonExpandableDom.remove() //  移除可动画角色六边形
                roleImageExpandableDom.remove() //  移除可动画角色图片
                roleMaskDom[0].remove() // 移除遮罩
                this.$store.commit('updateActiveRole', '')  // 清除vuex中已点击的 activeRole 状态 (置空字符串)
                roleHexagonOriginDom.style.visibility = 'visible' // 设置原角色六边形为可见
                roleImageOriginDom.style.visibility = 'visible' // 设置原角色图片可见
              }, animeFullTime)
            }

          }

        }

      }
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