<template>
  <div class="inline-block">
    <div class="relative">
      <div class="absolute left-full -top-2 text-2xs p-1 rounded-full flex items-center justify-center" :class="[color ?? 'bg-gray-300', { 'text-white': dark }]">
        {{ content }}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    color: String,
    dark: Boolean,
  },
}
</script>

<style>
.text-2xs {
  font-size: 0.6rem;
}
</style>
