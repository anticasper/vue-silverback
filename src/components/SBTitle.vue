<template>
  <section class="p-3 flex justify-between items-center bg-white border rounded-lg mb-3">
    <div>
      <slot name="base">
        <h1 class="mb-0 text-3xl px-2 text-blue-900 flex items-center font-semibold">
          <i :class="icon" class="mr-2 text-xl" v-if="icon" />
          <span>{{ title }}</span>
        </h1>
        <slot name="breadcrumb"></slot>
      </slot>
    </div>
    <div class="flex justify-end gap-x-2">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SBTitle',
  props: {
    icon: {
      type: String,
      default: null,
    },
    title: String,
  },
}
</script>
