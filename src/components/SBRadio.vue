<template>
  <div v-bind="$attrs" class="group py-1">
    <div class="flex items-center gap-2 py-2 cursor-pointer" @click="update">
      <div class="size-6 rounded-full border bg-slate-50 flex place-content-center hover:border-blue-500">
        <transition name="pop">
          <i class="mt-1 fa-solid fa-check" v-if="inputValue == value" />
        </transition>
      </div>
      <span> {{ label }} </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SBRadio',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: String,
    value: String,
    required: Boolean,
    modelValue: String,
  },

  data: () => ({
    inputValue: false,
  }),

  methods: {
    update() {
      if (!this.disabled) {
        if (this.inputValue != this.value) {
          this.inputValue = this.value
          this.$emit('update:modelValue', this.value)
        } else {
          this.inputValue = null
          this.$emit('update:modelValue', null)
        }
      }
    },
  },

  created() {
    if (!this.modelValue) {
      this.inputValue = false
    }
    this.inputValue = this.modelValue
  },

  watch: {
    modelValue() {
      if (this.modelValue != this.value) {
        this.inputValue = this.modelValue
      }
    },
  },
})
</script>
<style>
.pop-enter-active,
.pop-leave-active {
  animation: pop-in 0.1s ease-out;
}

.pop-leave-active {
  animation: pop-out 0.1s ease-in;
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pop-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
