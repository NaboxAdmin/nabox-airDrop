<template>
  <div class="size-26 text-center text-21 mt-3 mb-2">{{ noMore ? $t('tips.tips18') : $t('tips.tips17') }}</div>
</template>

<script>
export default {
  props: {
    noMore: {
      type: Boolean,
      default: false
    }
  },
  name: "NoData"
}
</script>

<style scoped>
.text-21 {
  color: #21C980;
}
</style>
