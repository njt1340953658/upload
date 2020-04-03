#### upload-ui上传组件

#### 1. 引用

```shell
# 开发版
yarn add upload-ui
```

```javascript
import Vue from 'vue'
import UploadUi from 'upload-ui';

Vue.use(UploadUi)
```

#### 2. 使用示例

> 使用上大体与[element-upload](https://element.eleme.cn/2.8/#/zh-CN/component/upload)相似，可以参考element-ui

```html
 <upload-ui
  multiple
  accept="image/*"
  :filelist="fileList"
  upload-list="isHide"
  :before-upload="beforeUpload"
  @on-success="handleSuccess"
  @on-remove="handleRemove"
  @on-preview="handlePictureCardPreview"
  :headers="{
    action: '/api/gw-totur/',
    cookie: '9ef332a1-4946-48e4-929c-e6f4dbae7e17'
  }"
>
  <div class="el-upload__tip" slot="tip">
    <i class="el-icon-info" />文件名不得包含中文及特殊字符
  </div>
  <template slot="list-content" slot-scope="scope">
    <button>{{scope}}</button>  // 自定义上传文件名称返回为当前上传成功文件
  </template>
</upload-ui>
```

#### 3. 参数 && 方法 API

#### Upload Attribute
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| accept | 接受上传的文件类型 | string | - | - |
| multiple | 是否支持多选文件 | boolean | - | false |
| filename | 是否显示上传前的文件名 | boolean | - | false |
| width | 文件列表为picture时，设置宽 | string/number | - |
| height | 文件列表为picture时，设置高 | string/number | - |
| list-type | 文件列表的类型 | string | text/picture/drag | text |
| headers | 请求头设置(action: 请求连接；cookie: 用户token) | object | - | - |
| filelist | 上传的文件列表，例如: [{url: 'https://xxx.cdn.com/xxx.jpg'}] | array | - | [] |
| upload-list | 是否显示默认上传成功后的列表 | String | isHide(不显示列表，drag-content开启)/listSlot(开启自定义列表插槽，list-content开启) | - 不开启 |
| before-upload | 上传文件之前的钩子，参数为上传的文件，若返回 false ，则停止上传。 | function(file) | - | - |
| on-remove | 文件列表移除文件时的钩子 | function(fileList) | - | -
| on-preview | 点击文件列表中已上传的文件时的钩子 | function(file) | - | - |
| on-success | 文件上传成功时的钩子 | function(fileList) | - | - |

#### Upload Methods
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| click | 上传点击 | function() | - | - |

#### Slot
| name | 说明 |
| --- | --- |
| tip | 提示说明文字 |
| list-content | 自定义上传文件名称返回为当前上传成功文件
| drag-content | 自定义拖拽框内的文本信息
