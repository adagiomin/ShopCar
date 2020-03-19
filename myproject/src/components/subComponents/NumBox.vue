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
  mounted() {//mounted阶段，实例挂载于Dom上（可处理业务逻辑）
    mui(".mui-numbox").numbox(); // 初始化数字选择框组件
  },
  methods: {
    countChanged() {   //子向父传值，父@getcount="getSelectedCount"
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],     //父向子传值，父:max="prodInfo.stock_quantity"
  watch: {  //监听max，设置上限
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