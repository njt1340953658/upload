/**
* 进度条样式
*/
<template>
  <div class="progress-bar_content_list default-theme">
    <!-- 线性进度条 -->
    <div v-if="mode === 'vertical'">
      <div class="progress-bar__tip">
        <span class="progress-bar__tiptext">{{label}}</span>
      </div>
      <div class="progress-bar__outer">
        <div class="progress-bar__inner" :style="barStyle"></div>
        <span class="progress-bar__tiplabel">{{percentage}}%</span>
      </div>
    </div>

    <!-- 圆形进度条 -->
    <PrecentBar v-if="mode === 'horizontal'" :barColor="color[status]" :progress="percentage" />
  </div>
</template>
 
<script>
import PrecentBar from "./precent.vue";

export default {
  name: "Progress",
  props: {
    status: String, // 进度条当前状态
    label: String, // 显示名称
    mode: {
      type: String,
      default: "vertical",
      required: false
    },
    strokeWidth: { // 进度条宽度
      type: Number,
      default: 2,
      required: false,
      validator: val => val >= 0
    },
    percentage: {
      // 显示进度
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100
    }
  },

  data() {
    return {
      color: {
        success: "#67c23a",
        exception: "#f56c6c",
        warning: "#e6a23c"
      }
    };
  },

  computed: {
    barStyle() {
      const style = {};
      style.width = this.percentage + "%";
      style.height = this.strokeWidth + "px";
      style.backgroundColor = this.color[this.status] || "#409eff";
      return style;
    }
  },

  components: {
    PrecentBar
  }
};
</script>
 
<style lang="less">
.progress-bar_content_list.default-theme {
  color: #606266;
  font-size: 12px;
  .progress-bar__outer {
    background: #ebeef5;
    border-radius: 100px;
    margin-top: 2px;
  }
  .progress-bar__tiplabel {
    float: right;
  }
  .center_text {
    font-size: 16px;
    color: #606266;
    font-weight: normal;
  }
}
</style>