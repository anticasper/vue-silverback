<template>
  <Transition name="my-transitionX">
    <slot></slot>
  </Transition>
</template>

<script></script>

<style>
.my-transitionX-enter-active,
.my-transitionX-leave-active {
  transition: all 0.25s ease-out;
}

.my-transitionX-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.my-transitionX-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
