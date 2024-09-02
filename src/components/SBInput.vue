<template>
  <div v-bind="$attrs" class="group py-1">
    <div class="flex justify-between items-center">
      <SBLabel :label="label" :required="required" />
      <div class="text-xs bg-slate-50 p-1 border rounded" v-if="counter && inputValue">
        {{ inputValue.length }}
      </div>
    </div>
    <div class="flex items-center rounded-lg border text-black text-sm overflow-hidden" :class="[{ 'bg-slate-50': !disabled, 'bg-slate-100': disabled, 'border-red-500': error }]">
      <div v-if="preIcon" class="w-12 p-3 text-center border-r" :class="[{ 'cursor-pointer': hasPreIconAction }]" @click="dispatchPreIconAction()">
        <i class="fa-solid" :class="[preIcon]" />
      </div>
      <div class="w-12 p-3 text-center border-r" v-if="type == 'money'">R$</div>
      <input
        v-model="inputValue"
        :disabled="disabled"
        :type="type != 'password' ? (type == 'money' ? 'number' : type) : secret"
        @input="updateValue"
        :placeholder="placeholder"
        :minlength="minlength"
        :maxlength="maxlength"
        class="grow focus:outline-none focus:ring-0 p-3"
        :class="[{ 'bg-slate-50': !disabled, 'bg-slate-100': disabled }]"
        @blur="updateValue"
        @keydown.enter.prevent="emitEnter"
        @keyup="handleMask" />
      <div v-if="posIcon" class="w-12 p-3 text-center border-l" :class="[{ 'cursor-pointer': hasPosIconAction }]" @click="dispatchPosIconAction()">
        <i class="fa-solid" :class="[posIcon]" />
      </div>
      <div v-if="type == 'password'" class="w-12 p-3 text-center border-l cursor-pointer" @click="updateType()">
        <i class="fa-solid fa-eye" v-if="secret == 'password'" />
        <i class="fa-solid fa-eye-slash" v-else />
      </div>
    </div>
    <div class="text-red-400 text-xs p-2" v-if="error">
      <p v-for="(item, i) in errorMessage" :key="i">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import SBLabel from '@/components/SBLabel.vue'
export default {
  name: 'SBInput',
  components: {
    SBLabel,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
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
  }),

  methods: {
    handleMask() {
      if (!this.mask) {
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
      this.$emit('preIconAction')
    },
    dispatchPosIconAction() {
      this.$emit('posIconAction')
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
  },

  created() {
    this.inputValue = this.modelValue
  },
}
</script>
