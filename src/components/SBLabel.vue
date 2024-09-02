<template>
  <label class="block p-1">
    <b>{{ label }}</b>
    <span v-if="required" class="text-red-400 px-1">
      <strong>*</strong>
    </span>
  </label>
</template>

<script>
export default {
  name: 'SBLabel',

  props: {
    label: String,
    required: Boolean,
  },
}
</script>
