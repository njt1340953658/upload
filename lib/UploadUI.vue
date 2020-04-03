/**
* upload 入口
*/
<template>
  <div class="upload-ui_card-list">
    <Upload
      :width="width"
      :height="height"
      :accept="accept"
      :headers="headers"
      :multiple="multiple"
      :filelist="filelist"
      :filename="filename"
      :list-type="listType"
      :upload-list="uploadList"
      :beforeUpload="beforeUpload"
      @on-remove="handleRemove"
      @on-preview="handlePreview"
      @on-success="handleOnSuccess"
    >
      <div slot="tip">
        <slot name="tip"></slot>
      </div>
      <template slot="drag-content">
        <slot name="drag-content"></slot>
      </template>
      <template slot="list-content" slot-scope="scope">
        <slot name="list-content" :props="scope.props"></slot>
      </template>
    </Upload>
  </div>
</template>

<script>
import Upload from "./components/upload";

const methods = {
  // 点击放大
  handlePreview(item) {
    this.$emit("on-preview", item);
  },
  // 删除剩余元素
  handleRemove(list) {
    this.$emit("on-remove", Array,from(list));
  },
  // 上传成功的元素
  handleOnSuccess(list) {
    this.$emit("on-success", Array.from(list));
  }
};

export default {
  name: "UploadUi",
  props: {
    headers: Object,
    accept: String,
    multiple: Boolean,
    filelist: Array,
    filename: Boolean,
    beforeUpload: Function,
    width: [Number, String],
    height: [Number, String],
    "upload-list": String,
    "list-type": {
      type: String,
      default: "text"
    }
  },
  methods,
  components: {
    Upload
  }
};
</script>

<style lang="less">
@import "./css/basicless.css";
@font-face {
  font-family: "iconfont";
  src: url("./assets/font/iconfont.woff") format("woff"),
    url("./assets/font/iconfont.woff2") format("woff2");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>