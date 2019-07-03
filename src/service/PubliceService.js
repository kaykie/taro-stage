/**
 * Created by apple on 2018/11/15.
 */
// import request from '../utils/request';
import config from '../config';
import Util from './Util'

export default class PublicService {

  /**
   * @param key 为需要存储的字段
   * @param data 为需要存储的东西,可以为any
   * **/
  static setStoreage(key, data) {
    wx.setStorage({
      key,
      data
    })
  }

  /**
   * @param key 为需要获取数据的字段
   * **/
  static getStoreage(key) {
    return wx.getStorageSync(key);
  }

  static removeStoreage(key){
    wx.removeStorage({
      key
    })
  }


  static genEncodeString(arrayBuffer) {
    let unit8Arr = new Uint8Array(arrayBuffer);
    let encodedString = String.fromCharCode.apply(null, unit8Arr);
    return decodeURIComponent(escape((encodedString)));//没有这一步中文会乱码
  }


  static setCache(key, value) {
    const fs = wx.getFileSystemManager();
    let filePath = `${wx.env.USER_DATA_PATH}/${env.prefix}${config.signature}.txt`;
    if (filePath) {
      fs.readFile({
        filePath,
        success: function (res) {
          let obj = this.genEncodeString(res.data);
          obj[key] = value;
          fs.writeFileSync(`${wx.env.USER_DATA_PATH}/${env.prefix}${config.signature}.txt`, JSON.stringify(obj), 'utf8');
        }
      })
    } else {
      let obj = {};
      obj[key] = value;
      fs.writeFileSync(`${wx.env.USER_DATA_PATH}/${env.prefix}${config.signature}.txt`, JSON.stringify(obj), 'utf8');
    }

  }

  /**
   * 判断数组里是否有两个相同的数据
   * @param arr 需要做判断的数组
   * @return true 有重复的数据  false 没有重复的数据
   */
  static isRepeat(arr) {
    let hash = {};
    let array = [];
    for (let obj of arr) {
      array.push(obj.word)
    }
    for (let i in array) {
      if (hash[array[i]])
        return true;
      hash[array[i]] = true;
    }
    return false;
  }

  static formatDateTime(time, format) {
    let t = new Date(time);
    let tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  };

  /**
   * @param 第一个参数给一对象 用于设置modal的相关信息
   * @param handle 为点击确定需要做的事
   * @param cancel 为点击取消需要做的事
   * **/
  static openConfirm({title, content, confirmText = '确定', cancelText = '取消'}, handle, cancel) {
    wx.showModal({
      title,
      content,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作');
          handle()

        } else {
          if (!cancel) return;
          cancel()
        }
      }
    });
  }

  /**
   * 防抖
   * @param delta 为延迟的秒数
   * @param fun 为需要调用的函数
   * **/
  static debounceLog(delta, fun) {
    let timeoutID = null;
    if (timeoutID) clearTimeout(timeoutID);  // reset timer
    timeoutID = setTimeout(function () {
      fun();
    }, delta);
  }

  /**
   * 节流
   * **/

  static throttle(fn, interval2) {
    let last;
    let timer;
    let interval = interval2 || 200;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn();
      }, interval);
    } else {
      last = now;
      fn();
    }
  }

  /**
   * 实现对象的深克隆
   * obj 为需要克隆对象
   * **/
  static deepClone(obj) {
    if (typeof obj !== "object") {
      return obj;
    }
    if (!obj) {
      return
    }
    let newObj = obj.constructor === Array ? [] : {};  //开辟一块新的内存空间
    for (let i  in  obj) {
      newObj [i] = this.deepClone(obj [i]);                 //通过递归实现深层的复制
    }
    return newObj;
  }

  /**
   * @param params 导出文件所需参数
   * @returns {*}   返回导出拼接字符串
   */
  static paramSerializer(params) {
    if (!params) return '';
    let urlPart = [];
    for (let k in params) {
      let value = params[k];
      if (value === null || Util.isUndefined(value)) continue;
      if (Util.isArray(value)) {
        for (let i = 0, l = value.length; i < l; i++) {
          urlPart.push(k + '=' + value[i])
        }
      } else {
        urlPart.push(k + '=' + value)
      }
    }
    return urlPart.join('&')
  }


  /**
   * 实现对象的深克隆
   * obj 为需要克隆对象
   * **/
  static deepClone2(obj) {
    for (let key in obj) {
      if (obj[key] === 0) {
        obj[key] = 22
      }
    }
    return obj
  }


  //解密方法
  static Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

  //加密方法
  static Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return encrypted.ciphertext.toString().toUpperCase();

  }


  static checkInput(data) {
    if (!data.requestId) {
      return 'requestId缺失，请重新拍照';
    }
    if (!data.personName) {
      return '名字不能为空';
    }
    if (!(/^[1][3|4|5|7|8|9][0-9]\d{4,8}$/.test(data.phoneNumber))) {

      return '手机号码格式不正确';
    }
    if (this.data.index < 0) {
      return '点击选择公司类型';
    }
    return '';
  }


  static randomWord(range) {
    let str = "",
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (let i = 0; i < range; i++) {
      let pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }


  static getBase64Size(base64url) {
    //获取base64图片大小，返回MB数字
    let str = base64url.replace('data:image/jpeg;base64,', '');
    console.log(str.length);
    const equalIndex = str.indexOf('=');
    if (str.indexOf('=') > 0) {
      str = str.substring(0, equalIndex);
    }
    const strLength = str.length;
    const fileLength = parseInt(strLength - (strLength / 8) * 2);
    // 由字节转换为MB
    let size = '';
    size = (fileLength / 1024).toFixed(2);
    const sizeStr = size + "";                        // 转成字符串
    const index = sizeStr.indexOf(".");                    // 获取小数点处的索引
    const dou = sizeStr.substr(index + 1, 2);     // 获取小数点后两位的值
    if (dou === "00") {                                // 判断后两位是否为00，如果是则删除00
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return parseInt(size);
  }

}
