<template>
  <div class="bg-white rounded-lg border">
    <div class="text-4xl text-blue-700 pb-3" v-if="header">
      {{ header }}
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SBCard',

  props: {
    header: String,
  },
}
</script>
