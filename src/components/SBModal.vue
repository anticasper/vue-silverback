<template>
  <div tabindex="-1" class="py-10 overflow-x-hidden fixed z-50 w-screen h-[100vh] inset-0 bg-slate-400 bg-opacity-75 transition-opacity" v-if="inputValue">
    <div class="flex justify-center items-center p-4 w-full min-h-screen">
      <TheCard :class="size">
        <div class="flex justify-between pb-2 mb-3 border-b" v-if="header">
          <b>{{ title }}</b>
          <i class="fa-solid fa-x cursor-pointer" @click="update"></i>
        </div>
        <div>
          <slot></slot>
        </div>
        <div class="flex gap-3 justify-end pt-3 mt-3">
          <slot name="footer" />
        </div>
      </TheCard>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SBModal',
  props: {
    title: String,
    modelValue: Boolean,
    size: {
      type: String,
      default: 'w-6/12',
    },
    header: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    inputValue: false,
  }),
  methods: {
    update() {
      this.inputValue = !this.inputValue
      this.$emit('update:modelValue', this.inputValue)
    },
  },
  created() {
    this.inputValue = this.modelValue
  },
  watch: {
    modelValue() {
      if (this.modelValue != this.inputValue) {
        this.inputValue = this.modelValue
      }
    },
  },
}
</script>

<style></style>
