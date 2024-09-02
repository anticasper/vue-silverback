<template>
  <i class="fa-solid cursor-pointer p-2 hover:border-gray-300 hover:bg-gray-200 rounded-lg text-gray-700" :class="icon" />
</template>

<script>
export default {
  name: 'SBIconButton',
  props: {
    icon: String,
  },
}
</script>

<style></style>
