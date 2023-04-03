<template>
  <div class="spin-cont" :class="[isFullLoading && 'large']"/>
</template>

<script>
export default {
  name: "Spin",
  props: {
    isFullLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.spin-cont {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: transparent;
  border: 8px solid #eee;
  border-top-color: #21C980;
  animation: spinAnimation 1.2s linear infinite;
  &.large {
    height: 50px;
    width: 50px;
    border: 6px solid #eee;
    border-top-color: #21C980;
  }
}
@keyframes spinAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
