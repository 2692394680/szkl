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
  <svg :class="svgClass" aria-hidden="true" :style="`width:${size};height:${size};`">
    <use class="icon" :xlink:href="iconClassName" :fill="color" x="8%" y="7%"></use>
  </svg>
</template>

<style scoped lang="less">
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
.icon{
  width: 100%;
  height: 100%;
}
</style>
