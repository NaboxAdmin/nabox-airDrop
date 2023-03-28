<template>
  <div class="input-cont">
    <input type="text" :value="value" :placeholder="placeholder" @input="changeValue">
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    placeholder: '',
    value:{
      type: String,
      default: '',
      require: true
    }
  },
  data(){
    return{
      currentValue: this.value
    }
  },
  watch: {
    value(newVal){
      this.currentValue = newVal;
      this.$emit('input', this.currentValue);
    }
  },
  methods: {
    changeValue(e){
      this.currentValue = e.target.value;
      this.$emit('input', this.currentValue);
    },
  }
}
</script>

<style lang="scss" scoped>
.input-cont {
  display: flex;
  input {
    background-color: #FFFFFF;
    flex: 1;
    padding: 22px;
    outline: 0;
    display: block;
    font-size: 28px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    &::placeholder {
      font-size: 28px;
      color: #C9CEDF;
    }
  }
}
</style>
