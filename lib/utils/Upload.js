/**
 * 图片上传 对接VVOS.js请求处代码
 * @param {Object} options: { headers: 用户token, file: 上传文件 }
*/
import VVOS from 'vv';
import api from '../api/index';

// 对象遍历数组
const eachObject = (data) => {
  let value = []
  Object.entries(data).forEach(obj => {
   value.push(obj[obj.length - 1])
  })
  return value
}

// // url转换为base64
// const isUrlOrBase64 = (data, index) => {
//   let isUrl = /^http:\/\/|https:\/\//;
//   let isBase64 = /^data:.+;base64,/;
//   if (isUrl.test(data)) {
//     let base64 = urlToBase64(data);
//     return dataURLtoFile(base64, index);
//   }
//   if (isBase64.test(data)) {
//     return dataURLtoFile(data, index)
//   }
//   return data
// }

// // base64转换为file
// const dataURLtoFile = (dataurl, filename = 0) => {
//   let arr = dataurl.split(',');
//   let mime = arr[0].match(/:(.*?);/)[1];
//   let bstr = atob(arr[1]);
//   let n = bstr.length;
//   let u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// }

// const urlToBase64 = (url) => {
//   let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), img = new Image;
//   img.crossOrigin = 'Anonymous'
//   img.src = url
//   img.onload = () => {
//     canvas.width = img.width
//     canvas.height = img.height
//     ctx.drawImage(img, 0, 0, img.width, img.height)
//     let dataUrl = canvas.toDataURL('image/jpeg')
//     return dataUrl;
//   }
// }

class Upload {
  constructor(options = {}) {
    this.options = options
    this.upload = new VVOS({
      api: {
        gettoken: this.options.headers + api.api.gettoken,  // 上传时取得token
        notifier: this.options.headers + api.api.notifier // 上传完成后通知接口
      },
      cover: true,
      client: 'vos-js.sdk 1.3.0'
    })
  }

  submit(callback) {
    this.upload.addfiles(this.options.files);

    this.upload.submit({
      headers: { // 取得token时添加业务参数，例如：自定义storage参数
        Authorization: this.options.cookie
      },
      gettoken: {
        'type': '2'
      },
      notifier: {
        'type': '2'
      }
    }, (err, res) => {
      return callback['result'](err, eachObject(res && res.data.data || []));
    }, (err, process) => {
      return callback['process'](err, process);
    });
  }
}

export default Upload;