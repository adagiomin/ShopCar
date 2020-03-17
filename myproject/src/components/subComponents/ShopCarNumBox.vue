<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
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
    countChanged() {
      this.$store.commit("updateprodsInfo", {
        id: this.id,
        count: parseInt(this.$refs.numbox.value)
      });
    }
  },
  props: ["initcount", "id"]
};
</script>

<style>
</style>