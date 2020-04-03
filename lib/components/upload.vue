/*
* upload ui层组件
*/
<template>
  <div class="ui-upload-container">
    <!-- 卡片类上传 -->
    <div class="picture-card" v-if="listType === 'picture'">
      <div class="ui-upload-picture-card">
        <ul>
          <li
            :key="index"
            @mouseleave="handleMouseLeave"
            @mousemove="handleMousemove(index)"
            class="ui-upload-picture-card-items"
            v-for="(item, index) in dataSource"
            :style="{ width: `${Number(width)}px` , height: `${Number(height)}px`}"
          >
            <img class="ui-upload-picture-img-items" v-show="item.url" :src="item.url" alt />
            <Progress
              :key="index"
              v-if="!item.url"
              mode="horizontal"
              :percentage="percentage || 0"
              class="ui-upload-picture-progress"
            />
            <div class="ui-upload-picture-operation" v-show="isMask === index">
              <span class="upload-list__item-preview_info" @click="handlePreview(item)">
                <i class="iconfont">&#xe60e;</i>
              </span>
              <span class="upload-list__item-delete_del" @click="handleDelete(index, item)">
                <i class="iconfont">&#xe615;</i>
              </span>
            </div>
          </li>
        </ul>
        <div v-if="isShow" class="ui-upload-click" @click="handleClickUpload">
          <i class="iconfont">&#xe643;</i>
        </div>
      </div>
      <div class="ui-upload-text-tip">
        <slot name="tip"></slot>
      </div>
    </div>

    <!-- button按钮上传 -->
    <div class="ui-upload-button" v-if="listType === 'text'">
      <button class="ui-upload-button-color" @click="handleClickUpload">点击上传</button>
      <div class="ui-upload-button-text-tip">
        <slot name="tip"></slot>
      </div>
      <Progress v-if="uploadList === 'isHide' && isProgress" mode="vertical" :percentage="percentage || 0" />
      <ul class="ui-upload-line-container" v-if="uploadList !== 'isHide'">
        <li :key="index" v-for="(item, index) in dataSource">
          <template v-if="uploadList !== 'listSlot'">
            <i class="iconfont ui-upload-line-text-icon">&#xe606;</i>
            <a style="font-size: 12px">{{ item.url || '正在上传中，请稍等...' }}</a>
            <i
              class="iconfont ui-upload-line-delete-icon"
              @click="handleDelete(index, item)"
            >&#xe615;</i>
          </template>
          <slot v-if="uploadList === 'listSlot'" name="list-content" :props="dataSource"></slot>
          <br />
          <Progress :key="index" mode="vertical" v-if="!item.url" :percentage="percentage || 0" />
        </li>
      </ul>
    </div>

    <!-- 拖拽文件样式 -->
    <template v-if="listType === 'drag'">
      <div v-drag="handleParse" class="ui-upload-drag" @click="handleClickUpload">
        <template v-if="!uploadList">
          <div class="iconfont ui-upload-drag-icon">&#xe624;</div>
          <div class="ui-upload-drag-text">
            将文件拖到此处，或
            <a style="color: #409EFF">点击上传</a>
          </div>
        </template>
        <slot v-if="uploadList" name="drag-content"></slot>
      </div>
      <div class="ui-upload-text-tip">
        <slot name="tip"></slot>
      </div>
      <Progress
        label="正在上传中，请稍等..."
        v-if="uploadList === 'isHide' && isProgress"
        mode="vertical"
        :percentage="percentage || 0"
      />
      <ul class="ui-upload-line-container" v-if="uploadList !== 'isHide'">
        <li :key="index" v-for="(item, index) in dataSource">
          <template v-if="uploadList !== 'listSlot'">
            <i class="iconfont ui-upload-line-text-icon">&#xe606;</i>
            <a style="font-size: 12px">{{item.url || '正在上传中，请稍等...'}}</a>
            <i
              class="iconfont ui-upload-line-delete-icon"
              @click="handleDelete(index, item)"
            >&#xe615;</i>
          </template>
          <slot v-if="uploadList === 'listSlot'" name="list-content" :props="dataSource"></slot>
          <br />
          <Progress mode="vertical" v-if="!item.url" :percentage="percentage || 0" />
        </li>
      </ul>
    </template>

    <!-- 上传input -->
    <input
      ref="file"
      type="file"
      name="file"
      :accept="accept"
      :multiple="multiple"
      style="display: none"
      @change="handleChangeUpload"
    />
  </div>
</template>

<script>
import Message from "vue-m-message";
import Progress from "./progress";
import directive from "../utils/directive.js";
import uploadSubmit from "../utils/Upload.js";

const methods = {
  // 点击上传
  handleClickUpload(e) {
    e.preventDefault();
    this.$emit("click");
    this.$refs.file.value = null;
    this.$refs.file.dispatchEvent(new MouseEvent("click"));
  },

  // 选择文件
  handleChangeUpload(event) {
    this.percentage = 0;
    const files = event.target.files;
    this.handleUpload(files);
  },

  // 选择文件 => 处理上传逻辑
  handleUpload(files) {
    let postFiles = Array.prototype.slice.call(files);
    postFiles = postFiles.filter(opt =>
      this.beforeUpload ? this.beforeUpload && this.beforeUpload(opt) : opt
    );
    if (postFiles.length === 0) return false;
    const option = postFiles.map((item, key) =>
      this.filename
        ? item
        : new File(
            [item],
            parseInt((key + 1) * Math.random() * new Date().getTime()),
            {
              type: item.type
            }
          )
    );
    this.isProgress = true;
    this.handleSubmit(option);
  },

  // 上传提交
  handleSubmit(option) {
    const that = this;
    this.dataSource = option;
    this.uploadFiles = new uploadSubmit({
      files: option,
      cookie: this.headers.cookie,
      headers: this.headers.action
    });
    this.uploadFiles.submit({
      result(err, data) {
        if (err) {
          that.percentage = 0;
          that.isProgress = false;
          that.dataSource = data || [];
          const error = `${err}`;
          const errArr = error.split(" ");
          const errinfo = (err && err.status) || errArr[errArr.length - 1];
          Message({
            type: "error",
            message: `${errinfo}，上传文件失败，请重试...`,
            position: that.listType === "drag" ? "top-right" : "top-center"
          });
        }
        if (that.percentage >= 100) {
          that.isProgress = false;
          that.dataSource = data;
          that.$emit("on-success", Array.from(that.dataSource));
          if (!err && !that.multiple && that.listType === "picture") {
            that.isShow = false;
          }
        }
      },
      process(err, process) {
        that.percentage = Number((process.percent * 100).toFixed());
      }
    });
  },

  // 拖拽上传文件
  handleParse(event) {
    if (event.dataTransfer && event.dataTransfer.files) {
      const files = event.dataTransfer.files;
      this.handleUpload(files);
    } else {
      return Message({
        type: "warning",
        position: "top-right"
      });
    }
  },

  // 鼠标进入
  handleMousemove(index) {
    this.isMask = index;
  },

  // 鼠标离开
  handleMouseLeave() {
    this.isMask = false;
  },

  // 点击放大
  handlePreview(item) {
    this.$emit("on-preview", item);
  },

  // 点击删除
  handleDelete(key, opt) {
    this.dataSource.splice(key, 1);
    this.$emit("on-remove", Array.from(this.dataSource));
    if (this.listType && !this.multiple && this.dataSource.length === 0) {
      this.isShow = true;
    }
  }
};

export default {
  name: "Upload",
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
  data() {
    return {
      isMask: false,
      percentage: 0,
      uploadFiles: undefined,
      dataSource: this.filelist || [],
      isProgress: false,
      isShow: this.multiple || !this.filelist ? true : false
    };
  },

  watch: {
    filelist(newVal) {
      this.dataSource = newVal;
    }
  },

  methods,

  components: {
    Progress
  }
};
</script>

<style lang="less" scoped>
@import "../css/upload.less";
.ui-upload-drag {
  width: 360px;
  height: 180px;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  text-align: center;
  display: inline-block;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  margin-bottom: 15px;
  .ui-upload-drag-icon {
    font-size: 67px;
    color: #c0c4cc;
    margin: 36px 0 16px;
    line-height: 50px;
  }
  .ui-upload-drag-text {
    color: #606266;
    font-size: 12px;
    text-align: center;
  }
}
</style>