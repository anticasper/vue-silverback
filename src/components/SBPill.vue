<template>
  <div class="py-1 px-3 text-center" :class="[color ?? 'bg-gray-300', block ? 'block' : 'inline-block', { 'text-white': dark, 'rounded-full': !label, 'rounded-lg': label }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: String,
    dark: Boolean,
    label: Boolean,
    block: Boolean,
  },
}
</script>
