<template>
  <div v-bind="$attrs" class="group py-1" @focusout="open = false" tabindex="-1">
    <SBLabel :label="label" :required="required" />
    <div class="flex items-center bg-slate-50 rounded-lg border text-black text-sm relative">
      <div class="w-12 p-3 text-center border-r cursor-pointer" @click="openDate()">
        <i class="fa-solid fa-calendar-days"></i>
      </div>
      <input
        v-model="inputDate"
        :disabled="disabled || range"
        type="text"
        @input="updateValue"
        :placeholder="placeholder || 'dd/mm/yyyy'"
        class="bg-slate-50 grow focus:outline-none focus:ring-0 p-3"
        @keydown.enter.prevent="keyEnter()" />
      <div class="w-12 p-3 text-center border-l cursor-pointer" v-if="inputValue" @click="clear()">
        <i class="fa-solid fa-x"></i>
      </div>
      <div class="absolute top-full w-full max-w-[640px] bg-white border rounded p-4 z-50 mt-2" v-if="open">
        <div class="flex border-b pb-3">
          <div class="grow font-bold">
            <span class="capitalize">{{ targetDate?.toLocaleString('default', { month: 'long' }) }}</span> de
            {{ targetDate?.toLocaleString('default', { year: 'numeric' }) }}
          </div>
          <div class="w-8 text-center cursor-pointer hover:bg-slate-50" @click="subtractOneMonth">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <div class="w-8 text-center cursor-pointer hover:bg-slate-50" @click="addOneMonth">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
        <div class="pt-3">
          <div class="grid grid-cols-7 pb-2">
            <div class="text-center font-bold">DOM</div>
            <div class="text-center font-bold">SEG</div>
            <div class="text-center font-bold">TER</div>
            <div class="text-center font-bold">QUA</div>
            <div class="text-center font-bold">QUI</div>
            <div class="text-center font-bold">SEX</div>
            <div class="text-center font-bold">SAB</div>
          </div>

          <div class="grid grid-cols-7">
            <div
              v-for="(day, i) in calendario"
              :key="i"
              class="h-8 flex items-center justify-center text-center cursor-pointer"
              :class="[{ 'text-red-500 bg-slate-100': day.getMonth() != targetDate.getMonth() }, { 'bg-blue-400 text-white': inDateRange(day.toISOString().substring(0, 10)) }]"
              @click="setDate(day)">
              <span
                class="rounded-full size-8 flex items-center justify-center hover:bg-blue-500 hover:text-white"
                :class="[
                  { 'bg-blue-500 text-white ': inputValue === day.toISOString().substring(0, 10) },
                  { 'bg-slate-200': day.toISOString().substring(0, 10) == today.toISOString().substring(0, 10) },
                ]">
                {{ day.getDate() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-red-500 text-sm py-1 px-2" v-if="hasError">
      <i class="fa-solid fa-triangle-exclamation" />
      {{ error }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SBLabel from '@/components/SBLabel.vue'

export default defineComponent({
  name: 'SBDate',
  components: {
    SBLabel,
  },
  data: () => ({
    inputValue: '',
    error: null,
    hasError: false,
    textInputOptions: {
      enterSubmit: true,
    },
    teleportCenter: false,
    calendario: [],
    targetDate: null,
    open: false,
    inputDate: null,
  }),

  computed: {
    formatedInput() {
      if (!this.inputValue) {
        return ''
      }
      return new Date(this.inputValue + 'T03:00:00.000Z').toLocaleDateString()
    },
    today() {
      return new Date()
    },
  },

  props: {
    divClass: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    required: Boolean,
    placeholder: String,
    modelValue: String,
    range: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    openDate() {
      this.open = !this.open
    },

    clear() {
      if (this.range) {
        this.inputDate = null
        this.inputValue = []
      } else {
        this.inputDate = null
        this.inputValue = null
      }
    },

    setDate(date) {
      const day = new Date(date)
      if (day == 'Invalid Date') {
        return
      }
      if (!this.range) {
        this.inputValue = day.toISOString().substring(0, 10)
        this.inputDate = day.toLocaleDateString()
        this.open = false
      } else {
        if (!Array.isArray(this.inputValue)) {
          this.inputValue = []
          this.inputDate = []
        }
        if (this.inputValue.length == 2) {
          this.inputValue = []
          this.inputDate = []
        }
        this.inputValue.push(day.toISOString().substring(0, 10))
        this.inputDate.push(day.toLocaleDateString())
        if (this.inputValue.length == 2) {
          this.inputValue.sort()
          this.inputDate.sort()
          this.inputDate = this.inputDate.join(' à ')
          this.open = false
        }
      }
    },

    inDateRange(day) {
      if (!this.range) {
        return false
      }
      if (!Array.isArray(this.inputValue)) {
        if (day === this.inputValue) {
          return true
        } else {
          return false
        }
      }

      if (day >= this.inputValue[0] && day <= this.inputValue[1]) {
        return true
      } else if (day === this.inputValue[0]) {
        return true
      }
      return false
    },

    update() {
      if (this.inputValue == '') this.inputValue = null
      this.$emit('update:modelValue', this.inputValue)
    },

    keyEnter() {
      if (!this.inputDate || this.inputDate.length < 10) {
        return
      }
      this.updateValue()
      this.open = false
    },

    updateValue() {
      this.inputDate = this.handleMask('##/##/####', this.inputDate)
      if (!this.inputDate || this.inputDate.length < 10) {
        return
      }
      this.open = true
      const original = this.inputDate
      const isoDate = this.inputDate.split('/')
      try {
        const date = new Date(`${isoDate[2]}-${isoDate[1]}-${isoDate[0]}T03:00:00`)
        if (!date || date === 'Invalid Date') {
          this.setErrored(original)
        } else {
          this.hasError = false
          this.inputDate = date.toLocaleDateString()
          this.targetDate = date
          this.mountMonthly(date)
          this.setDate(date)
          this.open = true
        }
      } catch (error) {
        this.setErrored(original)
      }
    },

    handleMask(mask, inputValue) {
      if (!mask || !inputValue) {
        return
      }

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

      return valorTratado
    },

    setErrored(original) {
      this.hasError = true
      this.error = `A data ${original} é inválida`
      this.inputDate = null
      this.targetDate = this.getFirstDayOfMonth(new Date())
      this.mountMonthly(this.targetDate)
      this.open = false
    },

    checkScreenSize() {
      this.teleportCenter = window.innerHeight < 600
    },

    mountMonthly(targetDate) {
      const date = new Date(targetDate)

      let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

      // Cria um array com todos os dias do mês
      let daysArray = []
      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(new Date(date.getFullYear(), date.getMonth(), i))
      }

      // Se o primeiro dia do mês não for domingo, inclui os dias anteriores
      let firstDayWeekday = firstDayOfMonth.getDay()
      if (firstDayWeekday !== 0) {
        // 0 representa domingo
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
          let previousDay = new Date(firstDayOfMonth)
          previousDay.setDate(firstDayOfMonth.getDate() - i - 1)
          daysArray.unshift(previousDay)
        }
      }

      // Inclui os dias do próximo mês até completar a semana
      let lastDayOfWeek = daysArray[daysArray.length - 1].getDay()
      if (lastDayOfWeek !== 6) {
        // 6 representa sábado
        let nextDay = new Date(daysArray[daysArray.length - 1])
        for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
          nextDay.setDate(nextDay.getDate() + 1)
          daysArray.push(new Date(nextDay))
        }
      }
      this.calendario = daysArray
    },

    getFirstDayOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), 1)
    },

    addOneMonth() {
      const date = this.targetDate
      let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      this.targetDate = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 1)
      this.mountMonthly(this.targetDate)
    },

    subtractOneMonth() {
      const date = this.targetDate
      let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      this.targetDate = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() - 1, 1)
      this.mountMonthly(this.targetDate)
    },
  },

  emmits: ['update:modelValue'],

  created() {
    if (this.modelValue) {
      if (!Array.isArray()) {
        const date = new Date(this.modelValue + 'T03:00:00.000Z')
        this.setDate(date)
      } else {
        this.modelValue.forEach((element) => {
          const date = new Date(element + 'T03:00:00.000Z')
          this.setDate(date)
        })
      }
    }
  },

  mounted() {
    this.checkScreenSize()
    if (this.inputValue) {
      this.targetDate = new Date(this.inputValue)
    } else {
      this.targetDate = this.getFirstDayOfMonth(new Date())
    }
    this.mountMonthly(this.targetDate)
  },

  watch: {
    inputValue() {
      this.update()
    },

    modelValue() {
      if (this.modelValue == undefined) {
        this.inputValue = null
      }

      if (this.modelValue != null) {
        if (this.modelValue != this.inputValue) {
          const date = new Date(this.modelValue)
          this.setDate(date)
        }
      }
    },
  },
})
</script>
