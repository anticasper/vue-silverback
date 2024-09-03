<template>
  <div v-bind="$attrs" class="group py-1" @focusout="open = false" tabindex="-1">
    <SBLabel :label="label" :required="required" />
    <div
      class="flex items-center rounded-lg border text-black text-sm relative"
      :class="[{ 'bg-slate-50': !disabled, 'bg-slate-100': disabled }]">
      <div class="grow p-3 cursor-pointer" @click="openSelect()" v-if="!multiple">{{ text }}</div>
      <div class="grow p-2 flex gap-2" @click="openSelect()" v-if="multiple">
        <div v-for="(item, i) in list" :key="i" class="bg-slate-300 text-gray-800 rounded-full py-1 px-2 text-xs">
          {{ item.label ?? item }} <i class="mx-2 fa-solid fa-xmark cursor-pointer" @click="remove(i)"></i>
        </div>
      </div>
      <TransitionX>
        <div
          class="absolute top-full left-0 z-50 bg-white w-full border max-h-32 rounded-lg overflow-y-scroll"
          v-if="open">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="p-2 hover:bg-slate-50 cursor-pointer"
            :class="[{ 'bg-slate-100': item.value ? item.value == inputValue : item == inputValue }]"
            @click="select(item)">
            {{ item.label ?? item }}
          </div>
        </div>
      </TransitionX>
      <span class="p-3 border-l cursor-pointer" @click="open = !open && !disabled">
        <i class="fas fa-chevron-down" :class="{ 'rotated-icon-select': open }"></i>
      </span>

      <span class="p-3 border-l cursor-pointer" @click="clear" v-if="inputValue != null && !disabled && clearable">
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
  },

  inheritAttrs: false,

  data: () => ({
    inputValue: '',
    error: null,
    open: false,
    text: null,
    list: [],
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
        this.inputValue = item.value ? item.value : item
        this.text = item.label ? item.label : item
      } else {
        if (
          !this.list.some((listItem) => listItem.value === item.value && listItem.label === item.label) ||
          !this.list.includes(item)
        ) {
          this.list.push(item)
        }

        this.inputValue = this.list
      }
      this.open = false
      this.update()
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
        if (el.value) {
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
