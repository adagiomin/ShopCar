<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../assets/lib/mui/js/mui.js";
export default {
  mounted() {
    //实例挂载于Dom上（可处理业务逻辑）
    mui(".mui-numbox").numbox(); // 初始化数字选择框组件
  },
  methods: {
    countChanged() {   //已选数量改变，告知父元素
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],       //父组件传可选数量上限
  watch: {
    max: function(newVal, oldVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>

<style lang="css">
</style>