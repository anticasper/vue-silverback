<template>
  <nav v-if="!disablePagination" class="flex justify-between items-center px-3">
    <div class="text-gray-500">
      Exibindo <b>{{ totalPages > 1 ? modelValue * limit - limit + 1 : modelValue * itemsPerPage - itemsPerPage + 1 }}</b> à
      <b>{{ modelValue * limit - (limit - itemsPerPage) }}</b> de <b>{{ totalItems }}</b> itens.
    </div>
    <div>
      <ul v-if="totalPages > 1" class="inline-flex items-center h-10 rounded-lg border divide-x">
        <li :class="{ [disableClass]: currentPage === 1 }" @click="previousPage">
          <SBNavButton class="border-e-0 rounded-s-lg" icon="fa-solid fa-chevron-left mx-3" />
        </li>

        <div v-if="totalPages < 5" class="flex items-center divide-x">
          <li v-for="i in totalPages" :key="i" @click="goToPage(i)">
            <!-- class="{ activeClass: i === currentPage, [disableClass]: i > totalPages }" -->
            <SBNavButton>
              {{ i }}
            </SBNavButton>
          </li>
        </div>

        <div v-else class="flex items-center divide-x">
          <li @click="goToPage(currentPage == totalPages || currentPage < 3 ? 1 : currentPage - 2)">
            <SBNavButton :class="[`${currentPage === 1 ? activeClass : borderClass}`]">
              {{ currentPage == totalPages || currentPage < 3 ? 1 : currentPage - 2 }}
            </SBNavButton>
          </li>
          <li @click="goToPage(currentPage == totalPages || currentPage < 3 ? 2 : currentPage - 1)">
            <SBNavButton :class="[`${currentPage === 2 ? activeClass : borderClass}`]">
              {{ currentPage == totalPages || currentPage < 3 ? 2 : currentPage - 1 }}
            </SBNavButton>
          </li>

          <li v-if="pageCurrentHandler()" @click="goToPage(currentPage < 3 ? 3 : currentPage)">
            <SBNavButton :class="[`${currentPage !== 1 && currentPage !== 2 ? activeClass : borderClass}`]"> {{ currentPage < 3 ? 3 : currentPage }} </SBNavButton>
          </li>

          <li @click="gotToPage(i)">
            <SBNavButton> ... </SBNavButton>
          </li>
          <li v-if="penultimatePage" @click="goToPage(penultimatePage)">
            <SBNavButton :class="[`${currentPage === penultimatePage ? activeClass : borderClass}`]">
              {{ penultimatePage }}
            </SBNavButton>
          </li>
          <li v-if="lastPage" @click="goToPage(lastPage)">
            <SBNavButton :class="[`${currentPage === lastPage ? activeClass : borderClass}`]">
              {{ lastPage }}
            </SBNavButton>
          </li>
        </div>
        <li :class="{ [disableClass]: currentPage === lastPage }" @click="nextPage">
          <SBNavButton class="border-s-0 rounded-e-lg" icon="fa-solid fa-chevron-right mx-3" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import SBNavButton from '@/components/SBNavButton'

export default {
  name: 'SBNavigationBar',
  components: {
    SBNavButton,
  },
  props: {
    disablePagination: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: { type: Number, default: 10 },
    limit: { type: Number, default: 10 },
    totalItems: Number,
    totalPages: Number,
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    penultimatePage() {
      return this.totalPages > 1 ? this.totalPages - 1 : null
    },
    lastPage() {
      return this.totalPages
    },
  },
  data: () => ({
    activeClass: 'bg-blue-500 hover:bg-blue-600 text-white ',
    borderClass: 'hover:bg-gray-100',
    currentPage: 1,
    disableClass: 'opacity-50',
  }),
  methods: {
    goToPage(pageNumber) {
      if (pageNumber === '...') {
        return
      }
      this.currentPage = pageNumber
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++
      }
    },
    pageCurrentHandler() {
      return this.currentPage != this.totalPages && this.totalPages - 1 != this.currentPage
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
  },
  watch: {
    currentPage(page) {
      this.$emit('update:modelValue', page)
    },
    actualPage() {
      this.currentPage = 1
    },
    modelValue() {
      this.currentPage = this.modelValue
    },
  },
  mounted() {
    this.currentPage = this.modelValue
  },
}
</script>
