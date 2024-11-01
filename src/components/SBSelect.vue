<template>
  <div v-bind="$attrs" class="group py-1" @focusout="open = false" tabindex="-1">
    <SBLabel :label="label" :required="required" />
    <div class="flex items-center rounded-lg border text-black text-sm relative" :class="[{ 'bg-slate-50': !disabled, 'bg-slate-100': disabled }]">
      <div :class="[{ 'py-3': !dense }, { 'py-2': dense }]" class="px-2 grow cursor-pointer" @click="openSelect()" v-if="!multiple">
        <slot name="selected" :item="selectedObject" v-if="selectedObject"> {{ text }} </slot>
        <span v-else>{{ text }}</span>
      </div>
      <div :class="[{ 'py-2': !dense }, { 'py-1': dense }]" class="px-2 grow flex gap-1" @click="openSelect()" v-if="multiple">
        <div v-for="(item, i) in list" :key="i" class="">
          <span class="bg-gray-300 text-gray-800 rounded-lg py-1 px-2 text-xs" v-if="i <= 1">
            {{ item.label ?? item }} <i class="fa-solid fa-xmark cursor-pointer" @click="remove(i)"></i>
          </span>

          <span class="bg-gray-300 text-gray-800 rounded-lg py-1 px-2 text-xs" v-if="i == 2"> +{{ list.length - 2 }} </span>
        </div>
      </div>

      <TransitionX>
        <div class="absolute top-full left-0 z-50 bg-white w-full border rounded-lg overflow-y-scroll" :class="[boxSize]" v-if="open">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="p-2 hover:bg-slate-50 cursor-pointer flex gap-x-2 items-center"
            :class="[{ 'bg-slate-100': item.value ? item.value == inputValue : item == inputValue }]"
            @click="select(item)">
            <div class="size-4 rounded" :class="[{ 'bg-blue-500': list.includes(item) }, { 'bg-gray-200': !list.includes(item) }]" v-if="multiple" />
            <slot name="option" :item="item">
              {{ propText ? item[propText] : item.label ?? item }}
            </slot>
          </div>
        </div>
      </TransitionX>
      <span class="p-3 border-l cursor-pointer" @click="open = !open">
        <i class="fas fa-chevron-down" :class="{ 'rotated-icon-select': open }"></i>
      </span>

      <span :class="[{ 'py-3': !dense }, { 'py-2': dense }]" class="px-2 border-l cursor-pointer" @click="clear" v-if="inputValue != null && !disabled && clearable">
        <i class="fa-solid fa-xmark"></i>
      </span>
    </div>
  </div>
</template>

<script>
import SBLabel from '@/components/SBLabel.vue'
import TransitionX from '@/components/TransitionX.vue'

export default {
  name: 'SBSelect',
  components: {
    SBLabel,
    TransitionX,
  },
  props: {
    label: String,
    required: Boolean,
    dense: { type: Boolean, default: false },
    modelValue: [String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    items: Array,
    propText: {
      type: String,
      default: null,
    },
    propValue: {
      type: String,
      default: null,
    },
    boxSize: {
      type: String,
      default: 'max-h-32',
    },
  },

  inheritAttrs: false,

  data: () => ({
    inputValue: '',
    error: null,
    open: false,
    text: null,
    list: [],
    selectedObject: null,
  }),

  methods: {
    openSelect() {
      if (!this.disabled) {
        this.open = !this.open
      } else {
        this.open = false
      }
    },
    select(item) {
      if (!this.multiple) {
        // Seta o valor do input para quando houver uma propriedade definida. Caso contrário tenta pela padrão e por fim seta o item completo
        if (this.propValue) {
          this.inputValue = item[this.propValue]
        } else if (item.value) {
          this.inputValue = item.value
        } else {
          this.inputValue = item
        }
        // Seta o valor do texto para quando houver uma propriedade definida. Caso contrário tenta pela padrão e por fim seta o item completo
        if (this.propText) {
          this.text = item[this.propText]
        } else if (item.label) {
          this.text = item.label
        } else {
          this.text = item
        }
        // Controle de objeto cru
        this.selectedObject = item
        this.open = false
        return this.update()
      } else {
        console.log('multiple')
        if (this.propValue) {
          console.log('tem propvalue')
          if (!this.list.some((listItem) => listItem[this.propValue] === item[this.propValue])) {
            console.log('linha 1')
            this.list.push(item)
          }
        } else if (item.value) {
          console.log('tem item value')
          if (!this.list.some((listItem) => listItem.value === item.value)) {
            this.list.push(item)
          }
        } else if (!this.list.includes(item)) {
          console.log('não possui item na lista')
          this.list.push(item)
        } else {
          console.log('else ')
          this.list = this.list.filter(function (el) {
            return el !== item
          })
        }
        this.inputValue = this.list
        return
      }
    },
    remove(index) {
      this.list.splice(index, 1)
      this.inputValue = this.list

      if (this.list.length === 0) {
        this.inputValue = null
      }
    },
    update() {
      this.$emit('update:modelValue', this.inputValue)
    },

    updateValue() {
      if (!this.inputValue && this.required) {
        this.error = `${this.label} é obrigatório.`
      }
      this.update()
    },

    clear() {
      if (this.multiple) {
        this.list = []
      }
      this.inputValue = null
      this.text = null
      this.open = false
      this.updateValue()
    },

    setValue() {
      const object = this.items.find((el) => {
        if (this.propValue) {
          return el[this.propValue] == this.inputValue
        } else if (el.value) {
          return el.value == this.inputValue
        } else {
          return el == this.inputValue
        }
      })
      if (object) {
        this.select(object)
      }
    },
  },

  created() {
    this.inputValue = this.modelValue
    this.setValue()
  },

  watch: {
    inputValue() {
      this.update()
      this.setValue()
      if (this.multiple && this.inputValue && this.list.length) {
        this.inputValue = null
      }
    },

    modelValue() {
      if (this.modelValue != this.inputValue) {
        this.inputValue = this.modelValue
      }
    },

    list() {
      if (!this.list || this.list.length < 0) {
        this.inputValue = null
      }
    },
  },
}
</script>
<style>
.rotated-icon-select {
  transform: rotate(-180deg);
  transition: transform 0.3s ease ease-out;
}
.fas {
  transition: transform 0.3s ease-out;
}
</style>
