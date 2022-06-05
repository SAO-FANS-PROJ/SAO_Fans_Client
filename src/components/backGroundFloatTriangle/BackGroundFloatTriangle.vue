<template>
  <div id="float-triangle-box" class="back-ground-float-triangle-background-box">
<!--    <div id="aaa" style="width: 200px; height: 500px; background-color: red" ></div>-->
  </div>
</template>

<script>
export default {
  name: "BackGroundFloatTriangle",
  data: () => {
    return {
      floatTriangles: []
    }
  },
  methods: {
    createTriangleBox(triangleIndex) {

      console.log('aaaaaaaaaa');

      // 获取屏幕尺寸 get page size
      const pageHeight = document.body.clientHeight ?? document.documentElement.clientHeight
      const pageWidth = document.body.clientWidth ?? document.documentElement.clientWidth

      const triangleBoxClassName = 'float-triangle'  // 基本类名
      const triangleBoxId = `${triangleBoxClassName}-${triangleIndex}`  //元素ID

      // 创建三角形的 div 盒子元素 create element
      const triangle = document.createElement('div')
      triangle.id = triangleBoxId
      triangle.className = triangleBoxClassName

      // 计算当前屏幕比例相对于标准16:9的比例大多少或者小多少  get the offset to basic 16:9 screen
      const screenRatio = pageWidth / pageHeight > 1.2 ? pageWidth / pageHeight : 1.2  // 如果屏幕比例大于 1.2 则取屏幕比例，如果小于 1.2 则取 1.2
      const basicScreenRatio = 1.7777777777    // 16:9 is 1.7777777777
      const screenRatioOffset = screenRatio / basicScreenRatio

      // 三角形盒子的尺寸
      const HeightProportion = 1.2
      const WidthProportion = 8
      const triangleBoxHeight = pageHeight / (Math.random() + HeightProportion)
      const triangleBoxWidth = triangleBoxHeight / (Math.random() + WidthProportion) * screenRatioOffset
      const triangleBoxSize = `height: ${triangleBoxHeight}px; width: ${triangleBoxWidth}px;`

      // 三角形盒子的位置
      const triangleBoxPositionLeft =  Math.random() * pageWidth
      const triangleBoxPositionTop =  (Math.random() * pageHeight) - (triangleBoxHeight / 2)
      const triangleBoxPosition = `position: fixed; left: ${triangleBoxPositionLeft}px; top: ${triangleBoxPositionTop}px;`

      // 三角形盒子的角度
      const triangleAngleNumber = Math.random() * 360  // circle is 360°
      const triangleAngle = `transform: rotate(${triangleAngleNumber}deg);`

      // 设置样式 set style
      triangle.setAttribute('style', `${triangleBoxSize} ${triangleBoxPosition} ${triangleAngle} background-color: var(--float-triangle-color);`)

      // 绘制装三角形的盒子 draw triangleBox
      const triangleBox = document.getElementById('float-triangle-box')
      if (triangleBox !== null && triangleBox !== undefined) {
        triangleBox.appendChild(triangle)
        // const newFloatTriangles =
        this.floatTriangles.push(triangleBoxId)
        return triangleBoxId
      } else {
        return null
      }
    },
    trianglesAnimate() {
      const triangleBoxList = this.floatTriangles  // 获取三角形的盒子的元素ID列表
      if (triangleBoxList !== undefined && triangleBoxList !== null && triangleBoxList.length !== 0) {  // 非空判断
        for(let i = 0; i < triangleBoxList.length; i++) {  // 循环获取三角形的盒子的元素ID
          const triangleBox = document.getElementById(triangleBoxList[i])  // 获取三角形的盒子的元素
          this.triangleAnimate(triangleBox, true)  // 为三角形的盒子的元素添加三角形裁剪动画和位移动画
        }
      }
    },
    triangleAnimate(triangleBox, init) {

      // init 为 true 时不会有出现动画
      if(init !== true) {
        // 生成随机帧序列
        const grayFrameAndNothingnessFrame = [{backgroundColor: 'var(--float-triangle-color)'}, {backgroundColor: 'var(--nothingness)'}] // 正常帧和空白帧
        const numberOfFramesMin = 7  // 最小总关键帧数
        const numberOfFramesMax = 12  // 最大总关键帧数
        const numberOfFrames = Math.floor(Math.random() * (numberOfFramesMax - numberOfFramesMin) + numberOfFramesMin)  // 生成随机关键帧数
        const triangleDisappearFrameList = [] // 定义关键帧列表
        for (let frameIndex = 0; frameIndex < numberOfFrames; frameIndex++) {  // 根据随机关键帧数循环
          const grayFrameOrNothingnessFrame = Math.round(Math.random())  // 随机选择 正常帧 和 空白帧 中的一个作为关键帧
          triangleDisappearFrameList.push(grayFrameAndNothingnessFrame[grayFrameOrNothingnessFrame]) // 将其添加至 关键帧列表
        }
        triangleDisappearFrameList.push(grayFrameAndNothingnessFrame[0])  // 结尾帧一定是有颜色的帧

        // 生成随机动画持续时间
        const minTriangleDisappearAnimeDuration = 400
        const maxTriangleDisappearAnimaDuration = 700
        const triangleDisappearAnimeDuration = Math.floor(Math.random() * (maxTriangleDisappearAnimaDuration - minTriangleDisappearAnimeDuration) + minTriangleDisappearAnimeDuration)

        // 出现动画
        triangleBox.animate(
            triangleDisappearFrameList,
            {
              duration: triangleDisappearAnimeDuration,
              easing: 'ease-in-out',
              fill: 'forwards',
              direction: 'normal'
            }
        )
      }

          // 三角形变形动画随机播放速度
          const minTrianglePointAnimeDuration = 18000
          const maxTrianglePointAnimaDuration = 23000
          const trianglePointAnimeDuration = Math.floor( Math.random() * (maxTrianglePointAnimaDuration - minTrianglePointAnimeDuration) + minTrianglePointAnimeDuration )

          // 三角形顶点的随机坐标（动画开始）
          const minPoint1AnimeStartDegree = 0
          const maxPoint1AnimeStartDegree = 15
          const point1AnimeStartDegree = Math.floor( Math.random() * (maxPoint1AnimeStartDegree - minPoint1AnimeStartDegree) + minPoint1AnimeStartDegree )
          // 三角形顶点的随机坐标（动画结束）
          const minPoint1AnimeEndDegree = 15
          const maxPoint1AnimeEndDegree = 30
          const point1AnimeEndDegree = Math.floor( Math.random() * (maxPoint1AnimeEndDegree - minPoint1AnimeEndDegree) + minPoint1AnimeEndDegree )

          // 三角形顶点的随机坐标（动画开始）
          const minPoint2AnimeStartDegree = 0
          const maxPoint2AnimeStartDegree = 15
          const point2AnimeStartDegree = Math.floor( Math.random() * (maxPoint2AnimeStartDegree - minPoint2AnimeStartDegree) + minPoint2AnimeStartDegree )
          // 三角形顶点的随机坐标（动画结束）
          const minPoint2AnimeEndDegree = 75
          const maxPoint2AnimeEndDegree = 90
          const point2AnimeEndDegree = Math.floor( Math.random() * (maxPoint2AnimeEndDegree - minPoint2AnimeEndDegree) + minPoint2AnimeEndDegree )

          // 三角形顶点的随机坐标（动画开始）
          const minPoint3AnimeStartDegree = 90
          const maxPoint3AnimeStartDegree = 100
          const point3AnimeStartDegree = Math.floor( Math.random() * (maxPoint3AnimeStartDegree - minPoint3AnimeStartDegree) + minPoint3AnimeStartDegree )
          // 三角形顶点的随机坐标（动画结束）
          const minPoint3AnimeEndDegree = 75
          const maxPoint3AnimeEndDegree = 90
          const point3AnimeEndDegree = Math.floor( Math.random() * (maxPoint3AnimeEndDegree - minPoint3AnimeEndDegree) + minPoint3AnimeEndDegree )

          // 增加三角形尺寸变化的动画
          triangleBox.animate(
              [
                {
                  clipPath: `polygon(0 ${point1AnimeStartDegree}%, 100% ${point2AnimeStartDegree}%, 0 ${point3AnimeStartDegree}%)`
                },
                {
                  clipPath: `polygon(0 ${point1AnimeEndDegree}%, 100% ${point2AnimeEndDegree}%, 0 ${point3AnimeEndDegree}%)`
                }
              ],
              {
                duration: trianglePointAnimeDuration,
                easing: 'ease-in-out',
                iterations: Infinity,
                direction: 'alternate'
              }
          )


          // 随机动画播放延迟
          // const minAnimeDelay = 500
          // const maxAnimaDelay = 1000
          // const animeDelay = Math.floor( Math.random() * (maxAnimaDelay - minAnimeDelay) + minAnimeDelay )

          // 三角形位移动画随机播放速度
          const minTriangleTransformAnimeDuration = 45000
          const maxTriangleTransformAnimaDuration = 55000
          const triangleTransformAnimeDuration = Math.floor( Math.random() * (maxTriangleTransformAnimaDuration - minTriangleTransformAnimeDuration) + minTriangleTransformAnimeDuration )

          // 在做位移动画前，先获取到 element 原有的 transform 参数
          const triangleDefaultTransform = triangleBox.style.transform

          const triangleTranslateStartOffset = -200
          const triangleTranslateStart = Math.random() * + triangleTranslateStartOffset

          const triangleTranslateEndOffset = 200
          const triangleTranslateEnd = Math.random() * + triangleTranslateEndOffset


          // 增加三角形位移变化的动画
          triangleBox.animate(
              [
                {
                  transform: `${triangleDefaultTransform} translate(${triangleTranslateStart}px, ${triangleTranslateStart}px)`,
                },
                {
                  transform: `${triangleDefaultTransform} translate(${triangleTranslateEnd}px, ${triangleTranslateEnd}px)`
                }
              ],
              {
                duration: triangleTransformAnimeDuration,
                // easing: 'ease-in-out',
                iterations: Infinity,
                direction: 'alternate'
              }
          )

    },

    triangleDisappear() {
      const triangleListLength = this.floatTriangles.length
      if (triangleListLength > 0){
        console.log('triangleListLength', triangleListLength)
        const oneOfTriangleList = Math.floor(Math.random() * triangleListLength)
        console.log(oneOfTriangleList);
        const disappearTriangle = document.getElementById(this.floatTriangles[oneOfTriangleList])  // 获取一个倒霉蛋
        if (disappearTriangle !== undefined && disappearTriangle !== null) {

          // 生成随机帧序列
          const grayFrameAndNothingnessFrame = [{backgroundColor: 'var(--float-triangle-color)'}, {backgroundColor: 'var(--nothingness)'}] // 正常帧和空白帧
          const numberOfFramesMin = 7  // 最小总关键帧数
          const numberOfFramesMax = 12  // 最大总关键帧数
          const numberOfFrames = Math.floor(Math.random() * (numberOfFramesMax - numberOfFramesMin) + numberOfFramesMin)  // 生成随机关键帧数
          const triangleDisappearFrameList = [] // 定义关键帧列表
          for (let frameIndex = 0; frameIndex < numberOfFrames; frameIndex++) {  // 根据随机关键帧数循环
            const grayFrameOrNothingnessFrame = Math.round(Math.random())  // 随机选择 正常帧 和 空白帧 中的一个作为关键帧
            triangleDisappearFrameList.push(grayFrameAndNothingnessFrame[grayFrameOrNothingnessFrame]) // 将其添加至 关键帧列表
          }

          // 生成随机动画持续时间
          const minTriangleDisappearAnimeDuration = 400
          const maxTriangleDisappearAnimaDuration = 700
          const triangleDisappearAnimeDuration = Math.floor(Math.random() * (maxTriangleDisappearAnimaDuration - minTriangleDisappearAnimeDuration) + minTriangleDisappearAnimeDuration)

          // 消失动画
          disappearTriangle.animate(
              triangleDisappearFrameList,
              {
                duration: triangleDisappearAnimeDuration,
                easing: 'ease-in-out',
                iterations: Infinity,
                direction: 'alternate'
              }
          )

          const _this = this
          // 动画结束后将其移除 dom
          setTimeout(() => {
            disappearTriangle.remove()
            _this.floatTriangles.splice(oneOfTriangleList, 1)
          }, triangleDisappearAnimeDuration)

        }
      }
    },

    initTriangle() {

      const _this = this
      let boxCount = 12

      // 生成12个三角形的盒子
      for (let i = 0; i < boxCount; i++) {
        _this.createTriangleBox(i)
      }
      // 给三角形应用动画
      _this.trianglesAnimate()

      const AppearAndDisappearSpeedMin = 2200
      const AppearAndDisappearSpeedMax = 3800
      const AppearAndDisappearSpeed = Math.round( Math.random() * (AppearAndDisappearSpeedMax - AppearAndDisappearSpeedMin) + AppearAndDisappearSpeedMin )
      // 每隔25s移除一个元素
      setInterval(() => {
        _this.triangleDisappear()
      }, AppearAndDisappearSpeed)

      // 每隔25s生成一个元素
      setInterval(() => {
        const newTriangleBoxId = _this.createTriangleBox(boxCount++)
        const newTriangleBox = document.getElementById(newTriangleBoxId)
        _this.triangleAnimate(newTriangleBox, false)
      }, AppearAndDisappearSpeed)

    },
  },
  mounted() {

    const _this = this
    _this.initTriangle()


    // setInterval(() => {
    //   const elem = document.getElementById('float-triangle-box')
    //   while(elem.hasChildNodes()) //当elem下还存在子节点时 循环继续
    //   {
    //     elem.removeChild(elem.firstChild);
    //   }
    //   _this.initTriangle()
    // }, 20000)


  }
}
</script>

<style scoped>
.back-ground-float-triangle-background-box {
  height: var(--MAX-SCREEN-HEIGHT);
  width: var(--MAX-SCREEN-WIDTH);

  /*background-color: red;*/
}

</style>