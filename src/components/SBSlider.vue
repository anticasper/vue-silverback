<template>
  <div :class="`mb-3`">
    <div class="flex justify-between items-center">
      <SBLabel :label="label" :required="required" />
      <div class="text-xs text-gray-300" v-if="inputValue">
        {{ inputValue }}
      </div>
    </div>
    <div class="">
      <input
        v-model="inputValue"
        :disabled="disabled"
        @input="updateValue"
        :placeholder="placeholder"
        type="range"
        :min="min"
        :max="max"
        class="w-full h-2 rounded-lg appearance-none slider"
        @blur="updateValue"
        @keydown.enter.prevent="emitEnter" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SBLabel from '@/components/SBLabel.vue'

export default defineComponent({
  components: {
    SBLabel,
  },
  props: {
    label: String,
    disabled: Boolean,
    placeholder: String,
    required: Boolean,
    modelValue: [String, Number],
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },

  data: () => ({
    inputValue: '',
    error: null,
    hasError: false,
  }),

  methods: {
    update() {
      this.$emit('update:modelValue', this.inputValue)
    },

    updateValue() {
      this.update()
    },

    emitEnter() {
      this.$emit('enter')
    },

    emitCopy() {
      this.$emit('clickCopy', this.inputValue)
    },

    emitVideo() {
      this.$emit('clickVideo')
    },
  },

  created() {
    this.inputValue = this.modelValue
  },

  watch: {
    inputValue() {
      this.update()
    },

    modelValue() {
      if (this.modelValue != this.inputValue) {
        this.inputValue = this.modelValue
      }
    },
  },
})
</script>

<style>
.slider {
  @apply [&::-webkit-slider-thumb]:w-2.5
  [&::-webkit-slider-thumb]:h-2.5
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-blue-600
  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-webkit-slider-thumb]:cursor-pointer

  [&::-moz-range-thumb]:w-2.5
  [&::-moz-range-thumb]:h-2.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-blue-600
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-blue-600
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out
  [&::-moz-range-thumb]:cursor-pointer

  [&::-webkit-slider-runnable-track]:w-full
  [&::-webkit-slider-runnable-track]:h-2
  [&::-webkit-slider-runnable-track]:bg-gray-100
  [&::-webkit-slider-runnable-track]:rounded-full

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-100
  [&::-moz-range-track]:rounded-full;
}
</style>
