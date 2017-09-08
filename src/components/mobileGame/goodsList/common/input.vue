<template>
  <input
     :class="inputClass"
     :type="inputType"
     :placeholder="inputPlaceholder"
     ref="input"
     v-bind:value="value"
     v-on:blur="inputBlur"
     v-on:input="updateValue($event.target.value)"
  >
</template>

<script>
  /**
   * 输入框组件
   */
  export default {
    props: {
      value: {},
      inputPlaceholder: {type: String, default: ''},
      inputType: {type: String, default: ''},
      inputClass: {type: String, default: ''},
    },
    methods: {
      /* 更新值 */
      updateValue (value) {
        let formattedValue = value
        // 删除两侧的空格符
        .trim()
        // 保留 0 小数位
        .slice(
          0,
          value.indexOf('.') === -1
            ? value.length
            : value.indexOf('.')
        )
        /* 如果为空值提前结束 */
        if (formattedValue.length === 0) {
          this.$emit('input', formattedValue)
          this.$emit('change')
          return
        }
        formattedValue = isNaN(parseInt(formattedValue)) ? '0' : parseInt(formattedValue)
        /* 取整 */
        // 如果值不统一，手动覆盖以保持一致
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        // 通过 input 事件发出数值
        this.$emit('input', formattedValue)
        this.$emit('change')
      },
      inputBlur () {
        this.$emit('blur')
      }
    }
  }
</script>
