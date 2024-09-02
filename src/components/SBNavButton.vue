<template>
  <a v-bind="$attrs" class="flex items-center justify-center cursor-pointer h-10 px-3" @click.prevent="previousPage">
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'SBNavButton',
  props: {
    icon: String,
  },
}
</script>

<style></style>
