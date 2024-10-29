<template>
  <div v-bind="$attrs" class="group py-1">
    <div class="flex justify-between items-center">
      <SBLabel :label="label" :required="required" />
      <div class="text-xs text-gray-300" :class="[{ 'text-red-300': minlength && inputValue && inputValue.length < minlength }]" v-if="counter && inputValue">
        {{ inputValue.length }}
        <span v-if="maxlength"> /{{ maxlength }}</span>
      </div>
    </div>
    <div
      class="flex items-center rounded-lg border text-sm overflow-hidden"
      :class="[
        { 'bg-slate-50': !disabled && !outlined && !bgColor, 'bg-slate-100': disabled, 'border-red-500': error, 'text-black': !dark, 'text-white': dark },
        borderColorComputed,
        bgColorComputed,
      ]">
      <div class="p-3 text-center border-r bg-blue-500 text-white" :class="['cursor-pointer', { 'py-3': !dense }, { 'py-2': dense }]" @click="dispatchPreIconAction()">
        Escolher Arquivo
      </div>
      <div class="p-3" v-if="!fileName">Nenhum Arquivo Selecionado</div>
      <div class="p-3" v-if="fileName">{{ fileName }}</div>
      <input type="file" class="hidden" id="SBFileInput" @change="onChangeFile" />
    </div>
  </div>
</template>

<script>
import SBLabel from '@/components/SBLabel.vue'
export default {
  name: 'SBInputFile',
  components: {
    SBLabel,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    label: String,
    borderColor: String,
    bgColor: String,
    maxlength: String,
    minlength: String,
    modelValue: [String, Number],
    placeholder: String,
    required: Boolean,
    mask: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    preIcon: {
      type: String,
      default: null,
    },
    posIcon: {
      type: String,
      default: null,
    },
    rules: Array,
    counter: Boolean,
  },

  computed: {
    hasPreIconAction() {
      return this.$attrs?.onPreIconAction
    },
    hasPosIconAction() {
      return this.$attrs?.onPosIconAction
    },
  },

  inject: ['registerError'],

  data: () => ({
    inputValue: '',
    error: null,
    errorMessage: [],
    secret: 'password',
    indice: null,
    borderColorComputed: null,
    bgColorComputed: null,
    fileName: null,
    file: null,
  }),

  methods: {
    handleMask() {
      if (!this.mask || !this.inputValue) {
        return
      }

      const mask = this.mask
      const inputValue = this.inputValue
      let valorTratado = ''
      let inputIndex = 0

      for (let i = 0; i < mask.length; i++) {
        if (inputIndex > inputValue.length) {
          break
        }

        const maskChar = mask[i]
        const inputChar = inputValue[inputIndex]

        if (maskChar === '#') {
          if (/\d/.test(inputChar)) {
            valorTratado += inputChar
            inputIndex++
          } else {
            break // Invalid character for the mask, stop processing
          }
        } else if (maskChar === 'A') {
          if (/[a-zA-Z]/.test(inputChar)) {
            valorTratado += inputChar
            inputIndex++
          } else {
            break // Invalid character for the mask, stop processing
          }
        } else if (maskChar === 'N') {
          if (/[a-zA-Z0-9]/.test(inputChar)) {
            valorTratado += inputChar
            inputIndex++
          } else {
            break // Invalid character for the mask, stop processing
          }
        } else if (maskChar === 'X') {
          valorTratado += inputChar
          inputIndex++
        } else {
          // It's a literal character in the mask, add it directly
          valorTratado += maskChar
          if (inputChar === maskChar) {
            inputIndex++
          }
        }
      }

      this.inputValue = valorTratado
    },
    emitEnter() {
      this.$emit('enter')
    },
    update() {
      if (this.inputValue == '') this.inputValue = null
      this.validate()
      this.$emit('update:modelValue', this.inputValue)
    },
    validate() {
      if (!this.rules || this.rules.length == 0) {
        return true
      }
      let error = false
      this.errorMessage = []
      for (let i = 0; i < this.rules.length; i++) {
        const element = this.rules[i]
        if (element(this.inputValue)) {
          this.errorMessage.push(element(this.inputValue))
          error = true
        }
      }
      this.indice = this.registerError(error, this.indice)
      this.error = error
    },
    updateType() {
      if (this.secret != 'password') {
        this.secret = 'password'
      } else {
        this.secret = 'text'
      }
    },
    updateValue() {
      this.update()
    },
    dispatchPreIconAction() {
      this.file = document.getElementById('SBFileInput')
      this.file.click()
    },
    dispatchPosIconAction() {
      this.$emit('posIconAction')
    },
    onChangeFile(event) {
      this.$emit('update:modelValue', event.target.files[0])
      this.fileName = event.target.files[0].name
    },
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

    file() {
      if (this.file && this.file.files[0]) {
        this.fileName = this.file.files[0].name
      }
    },
  },

  created() {
    this.inputValue = this.modelValue
  },
  mounted() {
    if (this.borderColor && this.borderColor.includes('border')) {
      this.borderColorComputed = this.borderColor
    }

    if (this.bgColor && this.bgColor.includes('bg')) {
      this.bgColorComputed = this.bgColor
    }
  },
}
</script>
