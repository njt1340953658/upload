/**
* 环形进度条
*/
<template>
  <div class="content_bar_progress" ref="box">
    <svg
      style="transform: rotate(-90deg)"
      :width="width"
      :height="width"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        :r="(width-radius) / 2"
        :cy="width /2 "
        :cx="width / 2"
        :stroke-width="radius"
        :stroke="backgroundColor"
        fill="none"
      />
      <circle
        ref="$bar"
        :r="(width-radius) / 2"
        :cy="width / 2"
        :cx="width / 2"
        :stroke="barColor"
        :stroke-width="radius"
        stroke-linecap="round"
        :stroke-dasharray="(width - radius) * 3.14"
        :stroke-dashoffset="(width - radius) * 3.14 * (100 - progress) / 100"
        fill="none"
      />
    </svg>
    <div class="center_text-font">
      <p v-if="!$slots.default" class="title">{{progress}}%</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>

const methods = {
  setCircleWidth() {
    let box = this.$refs.box;
    let width = box.clientWidth;
    let height = box.clientHeight;
    let cW = width > height ? height : width;
    this.width = cW;
  },
}

export default {
  props: {
    radius: {
      type: [Number, String],
      default: 5
    }, // 进度条厚度
    progress: {
      type: [Number, String],
      default: 20
    }, // 进度条百分比
    barColor: {
      type: String,
      default: "#1890ff"
    }, // 进度条颜色
    backgroundColor: {
      type: String,
      default: "rgb(229, 233, 242)"
    }, // 背景颜色
  },

  data() {
    return {
      width: 100,
    };
  },

  mounted() {
    this.setCircleWidth();
    window.addEventListener("resize", this.setCircleWidth(), 300);
  },

  methods,
};
</script>

<style scoped>
.content_bar_progress {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center_text-font {
  position: absolute;
  color: #606266;
  font-size: 16px;
}
</style>