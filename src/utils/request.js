/**
 * Created by apple on 2018/4/20.
 */

import {request as fetch} from '@tarojs/taro';
import config from '../config';
import Taro from '@tarojs/taro';
import Util from './Util';

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  if (response.statusCode >= 400 && response.statusCode < 500) {
    Taro.showToast({
      title: '网络出错,请稍后重试!',
      icon: 'none'
    });
  }
  if (response.statusCode > 500) {
    Taro.showToast({
      title: '系统异常,请稍后重试!',
      icon: 'none'
    });
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function encodeUriQuery(val, pctEncodeSpaces) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%3B/gi, ';').replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}

function serializeValue(v) {
  if (Util.isObject(v)) {
    return Util.isDate(v) ? v.toISOString() : JSON.stringify(v);
  }
  return v;
}


function transformRequestData(data) {
  let obj = deleteUndefindeProps(data);
  return Util.isObject(obj) ? JSON.stringify(obj) : obj;
}

function deleteUndefindeProps(Obj) {
  var newObj;
  if (Obj instanceof Array) {
    newObj = [];  // 创建一个空的数组
    var i = Obj.length;
    while (i--) {
      newObj[i] = deleteUndefindeProps(Obj[i]);
    }
    return newObj;
  } else if (Obj instanceof Object) {
    newObj = {};  // 创建一个空对象
    for (var k in Obj) {  // 为这个对象添加新的属性
      newObj[k] = deleteUndefindeProps(Obj[k]);
    }
    return newObj;
  } else {
    return Util.isUndefined(Obj) ? null : Obj;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(options) {
  const newUrl = config.publicUrl + options.url;
  // 请求地址加入公共路径
  return fetch({
    ...options,
    url: newUrl,
    data: transformRequestData(options.data),
  })
    .then(checkStatus)
    .then(data => {
      return data.data;
    })
    .catch(err => ({err}));
}
