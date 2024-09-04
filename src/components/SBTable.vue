<template>
  <div class="rounded-lg bg-white border overflow-x-auto">
    <table class="w-full text-black">
      <thead class="uppercase">
        <tr v-if="headers" class="border-b bg-gray-50">
          <th v-for="header in headers" :key="header" class="px-6" :class="[{ 'w-48': header.title === 'Ações' && !header.classes, 'py-3': !dense, 'py-1': dense }]">
            <div :class="['flex gap-2 items-center', { 'justify-center': header.title === 'Ações' }, header.classes]">
              {{ header.title }}
              <i :class="[handleIconsClass(header), 'cursor-pointer']" v-if="header.title != 'Ações' && !header.disableOrder" @click="this.handleHeaderClick(header)"></i>
            </div>
          </th>
          <th v-if="expanded" :class="[{ 'py-3': !dense, 'py-1': dense }]">
            <i class="fa-solid fa-sort-up"></i>
          </th>
        </tr>
      </thead>

      <tbody v-if="items && items.length > 0">
        <template v-for="(item, index) in computedItems" :key="index">
          <tr class="hover:bg-slate-50" :class="[{ 'border-b': !expanded || !item.expanded }]">
            <td
              v-for="header in headers"
              :key="header"
              :class="[header.title === 'Ações' ? 'flex justify-center' : header.align, 'px-6', { 'py-3': !dense, 'py-1': dense }]"
              :style="header.width ? `width: ${header.width}` : ''">
              <div v-if="item" :class="[header.title === 'Ações' ? '' : '']">
                <slot :name="header.field" :item="item">{{ item[header.field] }}</slot>
              </div>
            </td>
            <td v-if="expanded">
              <i class="fa-solid p-2 cursor-pointer" :class="[{ 'fa-sort-up': !item.expanded, 'fa-sort-down': item.expanded }]" @click="item.expanded = !item.expanded"></i>
            </td>
          </tr>
          <tr v-if="expanded && item.expanded" class="border-b">
            <td :colspan="headers.length + 1">
              <slot name="expanded" :item="item"></slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <p class="text-center italic py-5 border-b" v-if="items && items.length < 1">Nenhum item a ser exibido.</p>
    <div :class="[{ 'py-3': !dense, 'py-1': dense }]">
      <SBNavigationBar
        v-if="items"
        v-model="currentPage"
        :disablePagination="disablePagination"
        :itemsPerPage="items.length"
        :limit="itemsPerPage"
        :totalItems="totalItems"
        :totalPages="totalPages" />
    </div>
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
    externalOrder: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selectedItem', 'update:modelValue', 'order'],
  data: () => ({
    currentPage: 1,
    orderField: { field: '', tableOrder: '' },
    orderNative: null,
  }),
  computed: {
    computedItems() {
      if (this.externalOrder) {
        return this.items
      } else {
        if (this.orderNative) {
          return this.items.slice().sort((a, b) => {
            const field = this.orderNative.field
            const direction = this.orderNative.header === 'asc' ? 1 : -1

            if (a[field] < b[field]) {
              return -1 * direction
            } else if (a[field] > b[field]) {
              return 1 * direction
            } else {
              return 0
            }
          })
        } else {
          return this.items
        }
      }
    },
  },
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
      this.orderNative = {
        field: header.field,
        header: header.direction,
        order: header.tableOrder,
      }
      if (this.externalOrder) {
        this.filter(header.field, header.direction, header.tableOrder)
      }
    },
    handleIconsClass(header) {
      let string = 'fa-solid'
      if (this.externalOrder) {
        if (header.direction === 'asc' && this.orderField.field === header.field && this.orderField.tableOrder === header.tableOrder && header.orderState === 2) {
          string += ' fa-sort-up '
        } else if (header.direction === 'desc' && this.orderField.field === header.field && header.orderState === 3) {
          string += ' fa-sort-down '
        } else {
          string += ' fa-sort'
        }
      } else if (this.orderNative) {
        if (header.direction === 'asc' && this.orderNative.field === header.field && this.orderNative.tableOrder === header.tableOrder && header.orderState === 2) {
          string += ' fa-sort-up '
        } else if (header.direction === 'desc' && this.orderNative.field === header.field && header.orderState === 3) {
          string += ' fa-sort-down '
        } else {
          string += ' fa-sort'
        }
      } else {
        string += ' fa-sort'
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
    if (this.headers) {
      this.headers.forEach((header) => (header.orderState = 1))
    }
    this.currentPage = this.modelValue
  },
}
</script>
