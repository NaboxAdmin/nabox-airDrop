<template>
  <button @click="$emit('click')" :disabled="disabled" class="btn-cont" :class="[type === 'ghost' && 'ghost']">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: [Boolean, String],
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.btn-cont {
  width: 100%;
  position: relative;
  align-items: center;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 16px;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 30px;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.03em;
  outline: 0;
  padding: 20px 0;
  transition: background-color 0.2s, opacity 0.2s;
  color: #FFFFFF;
  background-color: #21C980;
  line-height: 42px;
  border: none;
  &.ghost {
    background-color: #FFFFFF;
    color: #21C980;
    box-shadow: none;
  }
  &:disabled {
    background-color: #abb1ba;
    border-color: #abb1ba;
    box-shadow: none;
    color: #ffffff;
    cursor: not-allowed;
  }
}
</style>
