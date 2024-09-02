<template>
  <div tabindex="-1" class="fixed rounded bottom-2 right-2 z-100 py-2 px-5 bg-green-500 text-white transition ease-in-out delay-150" v-if="dialog">
    <span>{{ message ?? 'Sucesso' }}</span>
    <i class="fa-solid fa-xmark pl-5" @click="close()"></i>
  </div>
</template>

<script>
export default {
  name: 'SBToast',
  props: {
    modelValue: Boolean,
    message: String,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    close() {
      this.dialog = false
      this.$emit('update:modelValue', this.dialog)
    },
  },
  watch: {
    modelValue() {
      if (this.modelValue) {
        this.dialog = true
        setTimeout(() => {
          this.dialog = false
          this.$emit('update:modelValue', this.dialog)
        }, 2000)
      }
    },
  },
}
</script>
