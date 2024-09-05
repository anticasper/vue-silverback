<template>
  <div v-bind="$attrs" class="group py-1">
    <SBLabel :label="label" :required="required" />
    <div class="flex items-center bg-slate-50 rounded-lg border text-black text-sm">
      <div @click="showModalZoom" class="grow p-3 cursor-pointer">
        <slot name="selected" :item="selectedObject" v-if="selectedObject">
          <span v-if="inputValue">{{ propText ? selectedObject[propText] ?? placeholder : inputValue ?? placeholder }}</span>
          <span v-else>{{ placeholder }}</span>
        </slot>
        <span v-else>{{ placeholder }}</span>
      </div>
      <span class="p-3 border-l cursor-pointer" @click="clear" v-if="inputValue != null && !disabled && clearable">
        <i class="fa-solid fa-xmark"></i>
      </span>
      <span class="p-3 border-l cursor-pointer" @click="showModalZoom">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
    <SBModal v-model="modalZoom" size="w-8/12 overflow-x-scoll">
      <slot>
        <SBLabel :label="label" :required="required" class="mb-5" />
        <SBTable :items="items" :headers="computedHeaders">
          <template v-slot:action="{ item }">
            <SBButton blue @click="select(item)">Selecionar</SBButton>
          </template>
        </SBTable>
      </slot>
    </SBModal>
  </div>
</template>

<script>
import SBButton from '@/components/SBButton.vue'
import SBLabel from '@/components/SBLabel.vue'
import SBModal from '@/components/SBModal.vue'
import SBTable from '@/components/SBTable.vue'
export default {
  name: 'SBInputZoom',
  components: {
    SBButton,
    SBLabel,
    SBModal,
    SBTable,
  },
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
    items: Array,
    headers: Array,
    propText: String,
    propValue: String,
  },
  data: () => ({
    inputValue: '',
    modalZoom: null,
    inputText: '',
    selectedObject: null,
  }),
  methods: {
    select(item) {
      if (this.propValue) {
        this.inputValue = item[this.propValue]
      } else {
        this.inputValue = item
      }
      this.selectedObject = item
      this.update()
    },
    update() {
      if (!this.disabled) {
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
  computed: {
    computedHeaders() {
      const rawHeader = [...this.headers]
      rawHeader.push({ title: 'Ações', field: 'action' })
      return rawHeader
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
