<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import { ELEMENT_LIBRARY } from '@/views/configuration/constants/design_constants'
import { defineComponent, onBeforeMount, onMounted, ref, shallowRef, watch } from 'vue'
import Vue3DraggableResizable, { DraggableContainer } from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import { menusEvent } from 'vue3-menus'
import lodash from 'lodash'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRoute } from 'vue-router'
import { ConfigurationApi } from '@/api/configuration_api'
import { MessagePlugin } from 'tdesign-vue-next'

defineComponent({
  components: {
    Vue3DraggableResizable,
    DraggableContainer
  }
})

const configurationApi = new ConfigurationApi()
const route = useRoute()
// 组件库展开
const elementExpanded = ref([0, 1])
// 画布数据
const canvasList = ref<any>([{}])
// 当前选中组件在画布数据中的下标
const canvasTheIndex = ref(0)
// 画布中添加组件时，组件的层级
const canvasZIndex = ref(2)
// 属性栏切换
const rightTabsValue = ref('1')

// 剪切板数据
const copyList = ref<any>([])
// 画布中被选中组件数据
const selectedList = ref<number[]>([])
// 是否正在移动
const isMove = ref(false)
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
    w: 200,
    h: 200,
    rotation: 0,
    informationList: [],
    ...JSON.parse(e.dataTransfer.getData('type'))
  })
  canvasZIndex.value++
}

// 画布组件开始拖动时
function dragStartHandle() {
  console.log('start')
  if (selectedList.value.length === 0) return
  isMove.value = true
}

// 画布组件拖动中
function draggingHandle(data: any) {
}

// 画布组件拖动结束
function dragEndHandle(data: object) {
  Object.assign(canvasList.value[canvasTheIndex.value], data)
}

// 组件调整大小后
function onResizeStop(data: object) {
  Object.assign(canvasList.value[canvasTheIndex.value], data)
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
      case 's':
        e.preventDefault()
        // 阻止直接保存网页
        e.returnValue = false
        updateData()
        break
    }
  }
}

// 复制
function copyHandle() {
  copyList.value = [lodash.cloneDeep(canvasList.value[canvasTheIndex.value])]
  // 启用右键菜单粘贴选项
  menuList.value.menus[1].disabled = false
}

// 右键菜单
function rightClick(event: MouseEvent) {
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
  if (historyTheIndex.value > 0) {
    historyTheIndex.value--
    canvasList.value = lodash.cloneDeep(historyList.value[historyTheIndex.value])
  }
}

// 获取画布数据
async function getData() {
  if (route.query.url) {
    canvasList.value = await configurationApi.data(route.query.url)
  }
}

// 上传画布数据
async function updateData() {
  const modelId = route.query.id
  const file = new File([JSON.stringify(canvasList.value)], modelId + '.json', {
    type: 'application/json',
    lastModified: Date.now()
  })
  const formData = new FormData()
  formData.append('model', file)
  await configurationApi.update({ modelId }, formData)
  await MessagePlugin.success('保存成功')
}

onMounted(() => {
  // 监听按键
  window.addEventListener('keydown', onKeyDown)
  getData()
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
      <TheHeader>
        <div class="text-gray-400 flex">
          <t-tooltip content="Ctrl+Z" theme="light">
            <p class="cursor-pointer mr-4" @click="updateData">撤回</p>
          </t-tooltip>
          <t-tooltip content="Ctrl+Y" theme="light">
            <p class="cursor-pointer mr-4" @click="updateData">恢复</p>
          </t-tooltip>
          <t-tooltip content="Ctrl+S" theme="light">
            <p class="cursor-pointer mr-4" @click="updateData">保存</p>
          </t-tooltip>
        </div>
      </TheHeader>
    </t-header>
    <t-layout>
      <t-aside width="400px">
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
        <!--画布-->
        <div class="canvas" @drop="onDropHandle" @dragover.prevent
             @contextmenu="rightClick">
          <!--          <div class="close-canvas" @click="checkClose" @click.right="checkClose"></div>-->
          <DraggableContainer :referenceLineColor="'#cccccc'">
            <Vue3DraggableResizable
                v-for="(item, index) in canvasList"
                :key="index"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :handles="item.handles"
                :lockAspectRatio="item.lockAspectRatio"
                :parent="true"
                @activated="canvasTheIndex=index"
                @drag-start="dragStartHandle"
                @dragging="draggingHandle"
                @drag-end="dragEndHandle"
                @resize-end="onResizeStop"
                @click.right="canvasTheIndex=index"
            >
              <!--文本框-->
              <input class="textBox" type="text" v-model="item.value"
                     v-if="item.type==='textBox'"
                     :style="`color:${item.textColor};background-color:${item.bgColor};border-radius:${item.radius}px`"/>
              <!--矩形-->
              <div class="rectangle item" v-if="item.type==='rectangle'"
                   :style="`background-color:${item.bgColor};border-radius:${item.radius}px`"></div>
              <!--圆形-->
              <div class="round item" v-if="item.type==='round'"
                   :style="`background-color:${item.bgColor};`"></div>
              <!--开关-->
              <div class="justify-center items-center" v-if="item.type==='switch'"
                   :style="`width:${item.w}px;height:${item.h}px`">
                <SvgIcon :icon-name="item.value?'switch-on':'switch-off'" :size="'100%'"></SvgIcon>
              </div>
              <!--按钮-->
              <div v-if="item.type==='button'">
                <t-button size="large" block>{{ item.value }}</t-button>
              </div>
            </Vue3DraggableResizable>
          </DraggableContainer>
        </div>
      </t-content>
      <t-aside width="400px">
        <div class="design-right" v-show="canvasTheIndex===0">
          <t-tabs v-model="rightTabsValue">
            <!-- 默认插槽 和 具名插槽（panel）都是用来渲染面板内容 -->
            <t-tab-panel value="1" label="页面设置" :destroyOnHide="false">
              <p style="padding: 25px;">页面设置</p>
            </t-tab-panel>
          </t-tabs>
        </div>
        <div class="design-right" v-show="canvasTheIndex!==0">
          <t-tabs v-model="rightTabsValue">
            <t-tab-panel value="1" label="样式" :destroyOnHide="false">
              <!--位置和尺寸-->
              <div class="box">
                <t-row :gutter="25">
                  <t-col :span="6">
                    <t-input label="X：" class="item-input" v-model="canvasList[canvasTheIndex].x"
                             theme="normal"
                    ></t-input>
                  </t-col>
                  <t-col :span="6">
                    <t-input label="Y：" class="item-input" v-model="canvasList[canvasTheIndex].y"
                             theme="normal"></t-input>
                  </t-col>
                  <t-col :span="6">
                    <t-input label="W：" class="item-input" v-model="canvasList[canvasTheIndex].w"
                             theme="normal"></t-input>
                  </t-col>
                  <t-col :span="6">
                    <t-input label="H：" class="item-input" v-model="canvasList[canvasTheIndex].h"
                             theme="normal"></t-input>
                  </t-col>
                  <t-col :span="6">
                    <t-input label="R：" class="item-input" v-model="canvasList[canvasTheIndex].rotation"
                             theme="normal"></t-input>
                  </t-col>
                  <t-col :span="6">
                    <t-input label="圆角：" class="item-input" v-model.number="canvasList[canvasTheIndex].radius"
                             theme="normal" v-if="canvasList[canvasTheIndex].radius!==undefined"></t-input>
                  </t-col>
                </t-row>
              </div>
              <div class="box" v-if="canvasList[canvasTheIndex].textColor">
                <p class="mb-3">文字颜色</p>
                <t-color-picker v-model="canvasList[canvasTheIndex].textColor" format="HEX"
                                :color-modes="['monochrome']"></t-color-picker>
              </div>
              <div class="box" v-if="canvasList[canvasTheIndex].bgColor">
                <p class="mb-3">背景颜色</p>
                <t-color-picker v-model="canvasList[canvasTheIndex].bgColor" format="HEX"
                                :color-modes="['monochrome']"></t-color-picker>
              </div>
            </t-tab-panel>
            <t-tab-panel value="2" label="属性" :destroyOnHide="false">
              <div class="box">
                <t-input label="名称：" v-model="canvasList[canvasTheIndex].title"></t-input>
              </div>
              <div class="box">
                <t-input label="值：" v-model="canvasList[canvasTheIndex].value"
                         v-if="canvasList[canvasTheIndex].type==='textbox'"></t-input>
                <t-row>
                  <span>开关状态：</span>
                  <t-switch v-model="canvasList[canvasTheIndex].value"
                            v-if="canvasList[canvasTheIndex].type==='switch'"></t-switch>
                </t-row>
              </div>
            </t-tab-panel>
          </t-tabs>
        </div>
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

.close-canvas {
  background-color: red;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
}

.canvas {
  background-color: #eeeeee;
  height: calc(100vh - 64px);
  position: relative;
  margin: 0 auto;
  background-image:
      linear-gradient(rgba(255,255,255,.3) 1px, transparent 0),
      linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 0),
      linear-gradient(white 1px, transparent 0),
      linear-gradient(90deg, white 1px, transparent 0);
  background-size:
      15px 15px,
      15px 15px,
      75px 75px,
      75px 75px;

  .module {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-active-class {
    border: 1px solid #0045d3;
  }

  .textBox {
    width: 100%;
    height: 100%;
    padding: 0 5px;
    //z-index: -1;
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

//属性栏
.design-right {
  padding: 10px 15px;
  z-index: 900;

  .box {
    padding: 10px 5px;
    border-bottom: 1px solid #eeeeee;
    color: #8292AC;

    .title {
      margin: 10px 0;
      font-size: 16px;
      color: #545454;
    }

    .item-input {
      margin: 6px 0;
    }

    .item-data {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      text-align: left;

      .name {
        //width: 100px;
      }

      .icon {
        cursor: pointer;
      }
    }

    .item-color {
      margin: 15px 5px;
      padding: 5px;
      border: 1px solid #c0c0c0;
    }
  }
}
</style>
