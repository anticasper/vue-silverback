<template>
  <ol class="flex px-2">
    <li v-for="(item, i) in bread" :key="i" :class="['text-sm flex items-center', { 'cursor-pointer  text-bold': i < bread.length - 1 }]">
      <span @click="goTo(item)" v-if="item && item.title">
        {{ item.title }}
      </span>
      <i class="fa-solid fa-chevron-right mx-2 py-1 text-xs" v-if="i < bread.length - 1" />
    </li>
  </ol>
</template>

<script>
export default {
  name: 'SBBreadcrumb',
  props: {
    bread: Array,
  },
  methods: {
    goTo(item) {
      if (item && item.name) {
        this.$router.push({ name: item.name })
      }
    },
  },
}
</script>
