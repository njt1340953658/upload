import Vue from 'vue'
import App from './App.vue'
import UploadUi from '../lib/index';

Vue.use(UploadUi);

new Vue({
  el: '#app',
  render: h => h(App)
})
