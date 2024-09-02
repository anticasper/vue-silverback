<template>
  <div v-bind="$attrs" class="group py-1">
    <SBLabel :label="label" :required="required" />
    <div class="flex items-center bg-slate-50 rounded-lg border text-black text-sm">
      <div @click="showModalZoom" class="grow p-3 cursor-pointer">
        {{ inputText ?? placeholder }}
      </div>
      <span class="p-3 border-l cursor-pointer" @click="clear" v-if="inputValue != null && !disabled && clearable">
        <i class="fa-solid fa-xmark"></i>
      </span>
      <span class="p-3 border-l cursor-pointer" @click="showModalZoom">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
    <Modal v-model="modalZoom" size="w-8/12 overflow-x-scoll">
      <slot></slot>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'SBInputZoom',
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    required: Boolean,
    modelValue: [String, Number],
    text: String,
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    inputValue: '',
    modalZoom: null,
    inputText: '',
  }),
  methods: {
    update() {
      if (!this.disabled) {
        if (this.inputValue) {
          this.inputText = this.text ?? this.inputValue
        }
        this.$emit('update:modelValue', this.inputValue)
      }
    },

    clear() {
      this.inputValue = null
      this.inputText = null
      this.$emit('update:text', null)
    },

    showModalZoom() {
      if (!this.disabled) {
        this.modalZoom = true
      }
    },
    closeModalZoom() {
      if (!this.disabled) {
        this.modalZoom = false
      }
    },

    emitEnter() {
      this.$emit('enter')
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
      this.modalZoom = false
      if (this.modelValue != this.inputValue) {
        this.inputValue = this.modelValue
      }
      this.inputText = this.text ?? this.inputValue
    },

    // text() {
    //   this.update()
    // },
  },
}
</script>
