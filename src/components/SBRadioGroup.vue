<template>
  <div>
    <SBLabel :label="label" />
    <div class="flex gap-5">
      <slot />
    </div>
  </div>
</template>

<script>
import SBLabel from '@/components/SBLabel.vue'

export default {
  name: 'SBRadioGroup',
  components: {
    SBLabel,
  },
  props: {
    label: String,
  },
}
</script>

<style></style>
