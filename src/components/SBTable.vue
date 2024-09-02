<template>
  <div class="rounded-lg bg-white border overflow-x-auto">
    <table class="w-full text-black">
      <thead class="uppercase">
        <tr v-if="headers" class="border-b bg-gray-50">
          <th v-for="header in headers" :key="header" class="px-6 py-3" :class="[{ 'w-48': header.title === 'Ações' && !header.classes }]">
            <div :class="['flex gap-2 items-center', { 'justify-center': header.title === 'Ações' }, header.classes]">
              {{ header.title }}
              <i :class="[handleIconsClass(header), 'cursor-pointer']" v-if="header.title != 'Ações' && !header.disableOrder" @click="this.handleHeaderClick(header)"></i>
            </div>
          </th>
        </tr>
      </thead>
      <!-- <Transition name="custom-classes" enter-active-class="animate__animated animate__slideInDown" leave-active-class="animate__animated animate__slideOutDown"> -->
      <tbody v-if="items && items.length > 0">
        <tr v-for="(item, index) in items" :key="index" class="border-b hover:bg-slate-50">
          <td
            v-for="header in headers"
            :key="header"
            :class="[header.title === 'Ações' ? 'flex justify-center' : header.align, 'px-6 py-3']"
            :style="header.width ? `width: ${header.width}` : ''">
            <div v-if="item" :class="[header.title === 'Ações' ? '' : '']">
              <slot :name="header.field" :item="item">{{ item[header.field] }}</slot>
            </div>
          </td>
        </tr>
      </tbody>
      <!-- </Transition> -->
    </table>
    <p class="text-center italic py-5 border-b" v-if="items.length < 1">Nenhum item a ser exibido.</p>
    <SBNavigationBar
      v-model="currentPage"
      :disablePagination="disablePagination"
      :itemsPerPage="items.length"
      :limit="itemsPerPage"
      :totalItems="totalItems"
      :totalPages="totalPages" />
  </div>
</template>

<script>
import SBNavigationBar from '@/components/SBNavigationBar'

export default {
  name: 'SBTable',
  components: {
    SBNavigationBar,
  },
  props: {
    disablePagination: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      required: true,
    },
    items: Array,
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    totalItems: {
      type: Number,
    },
    totalPages: {
      type: Number,
    },
  },
  emits: ['selectedItem', 'update:modelValue', 'order'],
  data: () => ({
    currentPage: 1,
    orderField: { field: '', tableOrder: '' },
  }),
  methods: {
    handleHeaderClick(header) {
      header.orderState = (header.orderState % 3) + 1

      switch (header.orderState) {
        case 1:
          header.direction = null
          break
        case 2:
          header.direction = 'asc'
          break
        case 3:
          header.direction = 'desc'
          break
      }

      this.filter(header.field, header.direction, header.tableOrder)
    },
    handleIconsClass(header) {
      let string = ''
      if (header.direction === 'asc' && this.orderField.field === header.field && this.orderField.tableOrder === header.tableOrder && header.orderState === 2) {
        string += ' fa-solid fa-circle-chevron-up '
      } else if (header.direction === 'desc' && this.orderField.field === header.field && header.orderState === 3) {
        string += ' fa-solid fa-circle-chevron-down '
      } else {
        string += ' fa-solid fa-chevron-up'
      }
      return string
    },
    filter(field, direction, tableOrder) {
      this.$emit('order', { direction, field, tableOrder })
      this.orderField.field = field
      this.orderField.tableOrder = tableOrder
    },
  },
  watch: {
    currentPage(page) {
      this.$emit('update:modelValue', page)
    },
    modelValue() {
      this.currentPage = this.modelValue
    },
  },
  mounted() {
    this.headers.forEach((header) => (header.orderState = 1))
    this.currentPage = this.modelValue
  },
}
</script>
