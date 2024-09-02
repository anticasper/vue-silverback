<template>
  <div v-bind="$attrs">
    <div class="flex gap-8" v-for="(item, i) in items" :key="i">
      <div class="w-2 bg-gray-200 relative">
        <div class="absolute left-[50%]">
          <div class="relative left-[-50%]">
            <slot name="date" :item="item">{{ item.date }}</slot>
          </div>
        </div>
      </div>
      <div class="mb-5 grow">
        <slot name="box" :item="item">{{ item.box }}</slot>
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

<style></style>
