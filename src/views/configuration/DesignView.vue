<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import { ELEMENT_LIBRARY } from '@/views/configuration/constants/design_constants'
import { ref, defineComponent, watch, onMounted, onBeforeMount, shallowRef } from 'vue'
import Vue3DraggableResizable, { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { menusEvent } from 'vue3-menus'
import lodash from 'lodash'

defineComponent({
  components: {
    Vue3DraggableResizable,
    DraggableContainer
  }
})

const elementExpanded = ref([0, 1])
// 画布数据
const canvasList = ref<any>([])
// 当前选中组件在画布数据中的下标
const canvasTheIndex = ref(0)
// 画布中添加组件时，组件的层级
const canvasZIndex = ref(1)

// 剪切板数据
const copyList = ref<any>([])
// 画布中被选中组件数据
const selectedList = ref<number[]>([])

// 是否正在移动
const isMove = ref(false)
const prevOffsetX = ref(0)
const prevOffsetY = ref(0)
// 历史记录
const historyList = ref<any>([])
// 历史记录最大存储数
const historyMaxStep = ref(25)
// 历史记录数据当前下标
const historyTheIndex = ref(0)
// 右键菜单数据
const menuList = shallowRef({
  menus: [{
    label: '复制',
    tip: 'Ctrl+C',
    click: () => copyHandle()
  }, {
    label: '粘贴',
    tip: 'Ctrl+V',
    disabled: true,
    click: (menu, event) => {
      copyList.value.forEach(item => {
        item.id = Date.parse(Date())
        item.x = event.x - 360
        item.y = event.y - 68
      })
      canvasList.value.push.apply(canvasList.value, lodash.cloneDeep(copyList.value))
    }
  }]
})

function elementDragStartHandle(e: any, item: object) {
  e.dataTransfer.setData('type', JSON.stringify(item))
}

function elementDragEndHandle(e: any) {
  e.dataTransfer.clearData()
}

// 往画布添加数据
function onDropHandle(e) {
  canvasList.value.push({
    id: Date.parse(Date()),
    y: parseInt(e.offsetY),
    x: parseInt(e.offsetX),
    z: canvasZIndex.value,
    width: 200,
    height: 200,
    rotation: 0,
    informationList: [],
    ...JSON.parse(e.dataTransfer.getData('type'))
  })
  canvasZIndex.value++
}

// 画布组件开始拖动时
function dragStartHandle() {
  console.log('start')
  prevOffsetX.value = canvasList.value[canvasTheIndex.value].x
  prevOffsetY.value = canvasList.value[canvasTheIndex.value].y
  if (selectedList.value.length === 0) return
  isMove.value = true
}

// 画布组件拖动中
function draggingHandle(data: any) {
  // if (selectedList.value.length === 0) return
  // if (isMove.value) {
  //   selectedList.value.forEach((item) => {
  //     defaultX.value[item] = lodash.cloneDeep(canvasList.value[item].x)
  //     defaultY.value[item] = lodash.cloneDeep(canvasList.value[item].y)
  //   })
  //   isMove.value = false
  // } else {
  //   selectedList.value.forEach((item) => {
  //     canvasList.value[item].x = data.x - prevOffsetX.value + defaultX[item]
  //     canvasList.value[item].y = data.y - prevOffsetY.value + defaultY[item]
  //   })
  // }
}

// 画布组件拖动结束
function dragEndHandle(data: any) {
  canvasList.value[canvasTheIndex.value].x = data.x
  canvasList.value[canvasTheIndex.value].y = data.y
  prevOffsetX.value = 0
  prevOffsetY.value = 0
}

// 组件调整大小后
function onResizeStop({
  x,
  y,
  w,
  h
}) {
  canvasList.value[canvasTheIndex.value].x = x
  canvasList.value[canvasTheIndex.value].y = y
  canvasList.value[canvasTheIndex.value].width = w
  canvasList.value[canvasTheIndex.value].height = h
}

function onKeyDown(e: any) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'z':
        canvasTheIndex.value = 0
        undoRecord()
        break
      case 'y':
        e.preventDefault()
        canvasTheIndex.value = 0
        redoRecord()
        break
      case 'c':
        copyList.value = []
        copyList.value.push(lodash.cloneDeep(canvasList.value[canvasTheIndex.value]))
        break
      case 'v':
        copyList.value.forEach((item) => {
          item.id = Date.parse(Date())
          item.y += 20
          item.x += 20
        })
        canvasList.value.push.apply(canvasList.value, lodash.cloneDeep(copyList.value))
        break
    }
  }
  // if (e.shiftKey) {
  //   e.preventDefault()
  //   this.checkShift = true
  // }
  // document.onkeyup = () => {
  //   if (e.shiftKey) {
  //     e.preventDefault()
  //     this.checkShift = false
  //   }
  // }
  // // 监听delete键
  // if (e.keyCode === 46 && this.theIndex !== 0) {
  //   this.list.splice(this.theIndex, 1)
  //   this.theIndex = 0
  // }
}

// 复制
function copyHandle() {
  copyList.value = [lodash.cloneDeep(canvasList.value[canvasTheIndex.value])]
  // 启用右键菜单粘贴选项
  menuList.value.menus[1].disabled = false
}
// 右键菜单
function rightClick(event:MouseEvent) {
  menusEvent(event, menuList.value, event)
  event.preventDefault()
}

// 添加历史记录数据
function pushRecord(data: any) {
  // 判断传入记录是否和当前记录相同
  if (JSON.stringify(data) !== JSON.stringify(historyList.value[historyTheIndex.value])) {
    if (historyTheIndex.value !== historyList.value.length - 1) {
      historyList.value.splice(historyTheIndex.value + 1, historyList.value.length)
    }
    historyTheIndex.value = historyList.value.length
    historyList.value.push(lodash.cloneDeep(data))
    // 历史记录超出最大条数，删除最旧的一条
    if (historyList.value.length > historyMaxStep.value) {
      historyList.value.shift()
    }
  }
}

// 恢复
function redoRecord() {
  if (historyTheIndex.value < historyList.value.length - 1) {
    historyTheIndex.value++
    canvasList.value = lodash.cloneDeep(historyList.value[historyTheIndex.value])
  }
}

// 撤销
function undoRecord() {
  if (historyTheIndex.value >= 0) {
    historyTheIndex.value--
    canvasList.value = lodash.cloneDeep(historyList.value[historyTheIndex.value])
  }
}

onMounted(() => {
  // 监听按键
  window.addEventListener('keydown', onKeyDown)
})
onBeforeMount(() => {
  // 解绑按键
  window.removeEventListener('keydown', onKeyDown)
})
watch(
  canvasList,
  lodash.debounce((newVal, oldVal) => {
    pushRecord(newVal)
  }, 500),
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <t-layout>
    <t-header>
      <TheHeader></TheHeader>
    </t-header>
    <t-layout>
      <t-aside width="20%">
        <t-menu :collapsed="false" width="100%" :expanded="elementExpanded"
                @expand="elementExpanded = $event">
          <t-submenu :title="item.title" :value="index" collapsed v-for="(item, index) in ELEMENT_LIBRARY"
                     :key="index">
            <div class="element-row">
              <t-row>
                <t-col :span="3" v-for="(item2, index2) in item.list" :key="index2">
                  <div class="element-item" :draggable="true"
                       @dragstart="elementDragStartHandle($event, item2)" @dragend="elementDragEndHandle">
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
        <div class="canvas" @drop="onDropHandle" @dragover.prevent
             @contextmenu="rightClick">
          <DraggableContainer :referenceLineColor="'#cccccc'">
            <Vue3DraggableResizable
                v-for="(item, index) in canvasList"
                :key="index"
                :x="item.x"
                :y="item.y"
                :w="item.width"
                :h="item.height"
                :handles="item.handles"
                @activated="canvasTheIndex=index"
                @drag-start="dragStartHandle"
                @dragging="draggingHandle"
                @drag-end="dragEndHandle"
                @resize-end="onResizeStop"
                @click.right="canvasTheIndex = index"
            >
              <t-input class="textBox" type="text" v-model="item.value"></t-input>
            </Vue3DraggableResizable>
          </DraggableContainer>
        </div>
      </t-content>
      <t-aside></t-aside>
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

.canvas {
  background-color: #eeeeee;
  height: calc(100vh - 64px);
  position: relative;
  margin: 0 auto;

  //.my-class {
  //  border: 1px solid #eeeeee;
  //}

  .module {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-active-class {
    border: 1px solid #0045d3;
  }

  .textBox {
    padding: 3px 4px;
    z-index: -1;
  }

  .click {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }

  //组件库
  .item {
    background-color: #fff;
    width: 100%;
    height: 100%;
  }

  .rectangle {
  }

  .round {
    border-radius: 999px;
  }
}
</style>
