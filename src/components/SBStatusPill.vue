<template>
  <span class="rounded-full py-1 px-3 text-white" :class="{ 'bg-green-400': value, 'bg-red-400': !value }">
    {{ value ? 'Ativo' : 'Inativo' }}
  </span>
</template>

<script>
export default {
  name: 'SBStatusPill',
  props: {
    value: Boolean,
  },
}
</script>

<style></style>
