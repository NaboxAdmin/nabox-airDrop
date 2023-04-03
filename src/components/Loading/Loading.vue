<template>
  <div class="loading-cont-item">
    <div class="loader">
      <div class="square" ></div>
      <div class="square"></div>
      <div class="square last"></div>
      <div class="square clear"></div>
      <div class="square"></div>
      <div class="square last"></div>
      <div class="square clear"></div>
      <div class="square "></div>
      <div class="square last"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style scoped>
.loading-cont {
  position: relative;
  height: 50vh;
}
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-25%);
  margin-left: -27.5px;
  margin-top: -27.5px;
}

.square {
  background: #f0f3f3;
  width: 30px;
  height: 30px;
  float: left;
  top: -10px;
  margin-right: 5px;
  margin-top: 5px;
  position: relative;
  opacity: 0;
  -webkit-animation: enter 6s infinite;
  animation: enter 6s infinite;
}

.enter {
  top: 0px;
  opacity: 1;
}

.square:nth-child(1) {
  -webkit-animation-delay: 1.8s;
  -moz-animation-delay: 1.8s;
  animation-delay: 1.8s;
}

.square:nth-child(2) {
  -webkit-animation-delay: 2.1s;
  -moz-animation-delay: 2.1s;
  animation-delay: 2.1s;
}

.square:nth-child(3) {
  -webkit-animation-delay: 2.4s;
  -moz-animation-delay: 2.4s;
  animation-delay: 2.4s;
  background: #53b8a9;
}

.square:nth-child(4) {
  -webkit-animation-delay: 0.9s;
  -moz-animation-delay: 0.9s;
  animation-delay: 0.9s;
}

.square:nth-child(5) {
  -webkit-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  animation-delay: 1.2s;
}

.square:nth-child(6) {
  -webkit-animation-delay: 1.5s;
  -moz-animation-delay: 1.5s;
  animation-delay: 1.5s;
}

.square:nth-child(8) {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.square:nth-child(9) {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.clear {
  clear: both;
}

.last {
  margin-right: 0;
}
</style>
