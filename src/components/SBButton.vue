<template>
  <button
    :disabled="disabled"
    v-bind="$attrs"
    :class="[
      { 'text-black': dark || gray || light },
      { 'text-white': !dark && !outlined && !gray && !light },
      { 'w-full': block },
      { 'inline-block': !block },
      { 'opacity-50 cursor-auto': disabled },
      { [blueClass]: blue && !outlined },
      { [blueBorderClass]: blue && outlined },
      { [greenClass]: green && !outlined },
      { [greenBorderClass]: green && outlined },
      { [redClass]: red && !outlined },
      { [redBorderClass]: red && outlined },
      { [yellowClass]: yellow && !outlined },
      { [yellowBorderClass]: yellow && outlined },
      { 'rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300': gray },
      { 'rounded-lg 0 border border-slate-20 hover:bg-gray-50': light },
    ]"
    class="rounded-lg">
    <div class="py-2 px-4 flex items-center justify-center">
      <slot>
        <i class="fa-solid" :class="label ? `mr-2 ${this.icon}` : `${this.icon}`" v-if="icon"></i>
        {{ label }}
      </slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'SBButton',
  props: {
    label: String,
    color: String,
    icon: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    block: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
    blue: Boolean,
    green: Boolean,
    red: Boolean,
    yellow: Boolean,
    dark: Boolean,
    gray: Boolean,
    light: Boolean,
  },
  computed: {
    blueClass() {
      return 'bg-blue-600 hover:bg-blue-700'
    },
    greenClass() {
      return 'bg-green-500 hover:bg-green-600'
    },
    redClass() {
      return 'bg-red-500 hover:bg-red-600'
    },
    yellowClass() {
      return 'bg-yellow-400 hover:bg-yellow-300'
    },
    blueBorderClass() {
      return 'border border-blue-600 hover:border-blue-700 text-blue-600'
    },
    greenBorderClass() {
      return 'border border-green-500 hover:border-green-600 text-green-500'
    },
    redBorderClass() {
      return 'border border-red-500 hover:border-red-600 text-red-500'
    },
    yellowBorderClass() {
      return ' border border-yellow-400 hover:border-yellow-300 text-yellow-400'
    },
  },
}
</script>
