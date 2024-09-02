<template>
  <div :class="{ 'text-red-500': !valid, 'text-black': valid }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SBForm',
  props: {
    modelValue: Boolean,
  },
  data: () => ({
    error: [],
    valid: false,
  }),
  provide() {
    return {
      registerError: this.registerError,
    }
  },
  methods: {
    registerError(error, index) {
      if (index || index == 0) {
        this.error[index] = error
        this.setError()
        return index
      } else {
        this.error.push(error)
        this.setError()
        return this.error.length - 1
      }
    },
    setError() {
      let error = false
      for (let i = 0; i < this.error.length; i++) {
        const element = this.error[i]
        if (element) {
          error = true
        }
      }
      this.valid = !error
      this.$emit('update:modelValue', this.valid)
    },
  },
  watch: {
    error() {},
  },
}
</script>

<style></style>
