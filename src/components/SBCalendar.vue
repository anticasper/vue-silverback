<template>
  <div class="w-full max-w-full rounded p-4 z-50 mt-2 bg-white" v-bind="$attrs">
    <div class="flex pb-3">
      <div class="grow font-bold text-lg">
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
      <div class="grid grid-cols-7 items-center text-center border-t border-x font-bold divide-x">
        <div class="py-4">DOM</div>
        <div class="py-4">SEG</div>
        <div class="py-4">TER</div>
        <div class="py-4">QUA</div>
        <div class="py-4">QUI</div>
        <div class="py-4">SEX</div>
        <div class="py-4">SAB</div>
      </div>

      <div class="grid grid-cols-7 border-r border-t">
        <div
          v-for="(day, i) in calendario"
          :key="i"
          class="min-h-36 text-center border-l border-b hover:bg-blue-500 hover:text-white cursor-pointer"
          :class="[
            { 'bg-blue-500 text-white': inputValue === day.toISOString().substring(0, 10) },
            { 'bg-slate-200': day.toISOString().substring(0, 10) == today.toISOString().substring(0, 10) },
            { 'text-red-500 bg-slate-100': day.getMonth() != targetDate.getMonth() },
          ]"
          @click="setDate(day)">
          <div class="block border-b">{{ day.getDate() }}</div>
          <div class="p-2">
            <slot :name="day.toISOString().substring(0, 10)" :item="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SBCalendar',
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
  },

  methods: {
    openDate() {
      this.open = !this.open
    },

    clear() {
      this.inputDate = null
      this.inputValue = null
    },

    setDate(day) {
      this.inputValue = day.toISOString().substring(0, 10)
      this.inputDate = day.toLocaleDateString()
      this.open = false
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
      const date = new Date(this.modelValue + 'T03:00:00.000Z')
      this.setDate(date)
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

<style>
.dp-custom-input {
  border-color: #dc3545;
}

.input-slot-image {
  font-size: 17px;
  color: #dc3545;
}

.right-inner-addon {
  position: relative;
}

.right-inner-addon i {
  position: absolute;
  padding: 10px 12px;
  right: 0;
}

.right-inner-addon input.form-control {
  padding-right: 30px;
}
</style>
