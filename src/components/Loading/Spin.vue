<template>
  <div class="spin-cont"/>
</template>

<script>
export default {
  name: "Spin"
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
