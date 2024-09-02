<template>
  <div v-bind="$attrs" class="group py-1">
    <SBLabel :label="label" :required="required" />
    <div class="flex items-center gap-2 py-2 cursor-pointer" @click="update">
      <div class="h-6 w-6 rounded border bg-slate-50 flex place-content-center hover:border-blue-500">
        <i class="mt-1 fa-solid fa-check" v-if="inputValue" />
      </div>
      <span> {{ status }} </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SBLabel from '@/components/SBLabel.vue'

export default defineComponent({
  name: 'SBCheck',
  components: {
    SBLabel,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
    status: String,
    required: Boolean,
    modelValue: Boolean,
  },

  data: () => ({
    inputValue: false,
  }),

  methods: {
    update() {
      if (!this.disabled) {
        this.inputValue = !this.inputValue
        this.$emit('update:modelValue', this.inputValue)
      }
    },
  },

  created() {
    if (!this.value) this.value = false
    this.inputValue = this.value
  },

  watch: {
    modelValue() {
      if (this.modelValue != this.inputValue) {
        this.inputValue = this.modelValue
      }
    },
  },
})
</script>
