<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { AlignGuidelines } from 'fabric-guideline-plugin'

// 组件库展开
const elementExpanded = ref([0, 1])
// 组件添加鼠标在画布的位置
const elementOffsetX = ref(0)
const elementOffsetY = ref(0)
// 声明画布
let canvas
const canvasEl = ref()
// 组件库
const elementLibrary = ref([
  {
    title: '基础组件',
    list: [
      {
        title: '矩形',
        data: new fabric.Rect({
          left: 100, // 距离画布左侧的距离，单位是像素
          top: 100, // 距离画布上边的距离
          fill: 'red', // 填充的颜色
          width: 60, // 方形的宽度
          height: 60// 方形的高度
        })
      }
    ]
  }
])

// 组件库拖动开始
function elementDragStartHandle(e: any, item: object) {
  e.dataTransfer.setData('type', JSON.stringify(item))
}

// 组件库拖动结束
function elementDragEndHandle(e: any, item) {
  // 组件没有拖放置画布则不添加
  if (e.clientX < 400 || e.clientY < 64) return
  const vpt = canvas.viewportTransform
  // 减去左侧边栏的宽度
  // 减去移动画布偏移
  item.data.left = (e.clientX - 400 - vpt[4]) / vpt[0]
  // 减去顶部栏的高度
  item.data.top = (e.clientY - 64 - vpt[5]) / vpt[0]
  // 添加到画布
  canvas.add(cloneDeep(item.data))
  // 清除缓存
  e.dataTransfer.clearData()
}

// 初始化画布
function initCanvas() {
  canvas = new fabric.Canvas('canvas')

  // 初始化辅助线
  const guideline = new AlignGuidelines({
    canvas,
    aligningOptions: {
      lineColor: '#32D10A',
      lineWidth: 2,
      lineMargin: 2
    }
  })
  guideline.init()

  // 鼠标按下时触发
  canvas.on('mouse:down', opt => {
    const evt = opt.e
    if (evt.altKey) { // 是否按住alt
      canvas.isDragging = true // isDragging 是自定义的，开启移动状态
      canvas.lastPosX = evt.clientX // lastPosX 是自定义的
      canvas.lastPosY = evt.clientY // lastPosY 是自定义的
    }
  })
  // 鼠标移动时触发
  canvas.on('mouse:move', opt => {
    elementOffsetX.value = opt.e.offsetX
    elementOffsetY.value = opt.e.offsetY
    if (canvas.isDragging) {
      const evt = opt.e
      const vpt = canvas.viewportTransform // 聚焦视图的转换
      vpt[4] += evt.clientX - canvas.lastPosX
      vpt[5] += evt.clientY - canvas.lastPosY
      canvas.requestRenderAll() // 重新渲染
      canvas.lastPosX = evt.clientX
      canvas.lastPosY = evt.clientY
    }
  })
  // 鼠标松开时触发
  canvas.on('mouse:up', () => {
    canvas.setViewportTransform(canvas.viewportTransform) // 设置此画布实例的视口转换
    canvas.isDragging = false // 关闭移动状态
  })

  // 监听鼠标滚轮事件
  canvas.on('mouse:wheel', opt => {
    const delta = opt.e.deltaY // 滚轮向上滚一下是 -100，向下滚一下是 100
    let zoom = canvas.getZoom() // 获取画布当前缩放值
    // 控制缩放范围在 0.01~20 的区间内
    zoom *= 0.999 ** delta
    if (zoom > 20) zoom = 20
    if (zoom < 0.01) zoom = 0.01

    // 设置画布缩放比例
    // 关键点！！！
    // 参数1：将画布的所放点设置成鼠标当前位置
    // 参数2：传入缩放值
    canvas.zoomToPoint(
      {
        x: opt.e.offsetX, // 鼠标x轴坐标
        y: opt.e.offsetY // 鼠标y轴坐标
      },
      zoom // 最后要缩放的值
    )
  })
}

// 画布自适应
function adaptiveCanvas(isFirst:boolean) {
  if (canvas) {
    const width = canvasEl.value.clientWidth
    const height = canvasEl.value.clientHeight
    // 首次进入页面减去两个侧边栏宽度
    canvas.setWidth(isFirst ? width - 800 : width)
    canvas.setHeight(height)
  }
}

onMounted(() => {
  initCanvas()
  adaptiveCanvas(true)
  window.onresize = () => {
    adaptiveCanvas(false)
  }
})
</script>

<template>
  <t-layout>
    <t-header>
      <TheHeader></TheHeader>
    </t-header>
    <t-layout>
      <t-aside width="400px">
        <t-menu :collapsed="false" width="400px" :expanded="elementExpanded"
                @expand="elementExpanded = $event">
          <t-submenu :title="item.title" :value="index" collapsed v-for="(item, index) in elementLibrary"
                     :key="index">
            <div class="element-row">
              <t-row>
                <t-col :span="3" v-for="(item2, index2) in item.list" :key="index2">
                  <div class="element-item" :draggable="true"
                       @dragstart="elementDragStartHandle($event, item2)"
                       @dragend="elementDragEndHandle($event,item2)">
                    <img src="@/assets/border.png" alt=""/>
                    <div>{{ item2.title }}</div>
                  </div>
                </t-col>
              </t-row>
            </div>
          </t-submenu>
        </t-menu>
      </t-aside>

      <t-content>
        <div class="bg-cyan-800" ref="canvasEl">
          <canvas id="canvas" width="1000" height="1000"></canvas>
        </div>
      </t-content>

      <t-aside width="400px">

      </t-aside>
    </t-layout>
  </t-layout>
</template>

<style scoped lang="less">
.element-row {
  //padding: 0 10px;

  .element-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    border-radius: 4px;
  }

  .element-item:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }

  img {
    width: 40px;
    height: 40px;
  }
}
</style>
