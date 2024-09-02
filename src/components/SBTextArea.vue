<template>
  <div v-bind="$attrs" class="group py-1">
    <SBLabel :label="label" :required="required" />
    <div class="flex items-center bg-slate-50 rounded-lg border text-black text-sm overflow-hidden">
      <textarea
        v-model="inputValue"
        :disabled="disabled"
        type="text"
        :placeholder="placeholder"
        :minlength="minlength"
        :maxlength="maxlength"
        class="bg-slate-50 grow focus:outline-none focus:ring-0 p-3"
        :class="{ 'is-invalid': hasError }"
        @blur="updateValue"
        rows="3"
        @keydown.enter.prevent>
      </textarea>
    </div>
    <div class="invalid-feedback" v-if="hasError">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SBTextArea',

  props: {
    divClass: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    required: Boolean,
    minlength: String,
    maxlength: String,
    modelValue: String,
  },

  inheritAttrs: false,

  data: () => ({
    inputValue: '',
    error: null,
    hasError: false,
  }),

  methods: {
    update() {
      if (this.inputValue == '') this.inputValue = null
      this.$emit('update:modelValue', this.inputValue)
    },

    updateValue() {
      this.update()
    },
  },

  emmits: ['update:modelValue'],

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
