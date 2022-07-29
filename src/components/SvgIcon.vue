<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  size: {
    type: String,
    default: '1em'
  }
})

const iconClassName = computed(() => {
  return `#${props.iconName}`
})

const svgClass = computed(() => {
  if (props.className) return `svg-icon ${props.className}`
  return 'svg-icon'
})
</script>

<script lang="ts">
export default {
  name: 'SvgIcon'
}
</script>

<template>
  <svg :class="svgClass" aria-hidden="true" :style="`width:${props.size};height:${props.size};`">
    <use :xlink:href="iconClassName" :fill="color"></use>
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  //position: relative;
  //fill: currentColor;
  //vertical-align: -2px;
}
</style>
