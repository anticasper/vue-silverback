<template>
  <div v-bind="$attrs">
    <div class="flex gap-5 items-center background-line" v-for="(item, i) in items" :key="i">
      <div class="w-[100px]">
        <slot name="date" :item="item">
          <div class="text-center">{{ item.date }}</div>
        </slot>
      </div>
      <div class="grow my-1">
        <slot name="content" :item="item">{{ item.content }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SBTimeline',
  props: {
    items: Array,
  },
}
</script>

<style>
.background-line {
  position: relative;
  z-index: 10;
}
.background-line::before {
  content: '';
  position: absolute;
  left: 50px;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #cbd5e1;
  z-index: -10;
}
</style>
