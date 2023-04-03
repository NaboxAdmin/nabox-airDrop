<template>
  <div class="mask-cont"
       @touchmove="touchmoveEvent"
       @click.stop="$emit('maskClick')"
       v-loading="loading"
       :class="[show && 'show_pop', !customClass && 'defaultClass', opacity && 'opacity']">
    <div :class="[show && 'show-main', customClass && 'customClass']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: Boolean,
      default: false
    },
    preventBoo: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    touchmoveEvent(e) {
      this.preventBoo && e.preventDefault();
    }
  }
}
</script>

<style scoped lang="scss">
@import "PopUp";
</style>
