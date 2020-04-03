// 存在组件间循环引用的场景，因此在外部统一注册
import UploadUI from './UploadUI.vue';

const install = (Vue) => {
  Vue.component(UploadUI.name, UploadUI)
}

export default {
  install,
  version: '1.0.0'
}
