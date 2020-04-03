<template>
  <div class="sas">
    <upload-ui
      multiple
      filename
      :filelist="filelist"
      :headers="headers"
      upload-list="listSlot"
      :beforeUpload="beforeUpload"
      @on-remove="handleRemove"
      @on-preview="handlePreview"
      @on-success="handleOnSuccess"
    >
      <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      <template slot="list-content" slot-scope="scope">
        <button>{{scope}}</button>
      </template>
      <div slot="drag-content">将文件拖到此处，或点击上传</div>
    </upload-ui>
  </div>
</template>

<script>
import Message from "vue-m-message";
const isText = /^\w+$/i;
export default {
  data() {
    return {
      headers: {
        cookie: "b47a9001-f3a8-45e4-97ed-c1c7a93947fd",
        action: "/api/tutor-gw"
      },
      filelist: []
    };
  },

  methods: {
    // 点击放大
    handlePreview(item) {
      console.log("on-preview", item);
    },
    // 删除剩余元素
    handleRemove(list) {
      console.log("on-remove", list);
    },
    // 上传成功的元素
    handleOnSuccess(list) {
      console.log("on-success", list);
    },
    beforeUpload(file) {
      const length = file.name.lastIndexOf(".");
      const str = file.name.substring(file.name, length);
      if (!isText.test(str)) {
        Message.error(str + "，文件格式不正确");
        return false;
      }
      return true;
    }
  }
};
</script>