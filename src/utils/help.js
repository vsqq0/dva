import $ from 'jquery';
// import React from 'react';
// import { resolve } from "path";
import querystring from 'querystring';
//todo 把jquery改为fetch兼容ie8以上 fetch不支持ie
//https://openapi.alipay.com/gateway.do?charset=utf-8&method=alipay.trade.wap.pay&sign=YMUAETVugxXUycVWb2XR5YGl8vGUPVCkjVLvQNX+qh+7/cCyoVw/vgX4sI+jRtMOSbILvTQ2Dh9GS1AIhsPMc8VyX3tJ8CJepZuo2ptFIHkhLL1MS03SylvHFkY6jDL3oz0T0UlTc1eRhb+yPB9yCzyDLvehbDqgbVqTfkqusX7AcrHlu1th906/BtxZlF/ssEhgglbL8fWWNdirH77szbvhc2A2PpHogo3tRDPo+La0uyzYwJFa/q4eXO/Zf7B+03FGb8zwp1eaCVfzYLozsgYPhUkVQX21Ha94ZaPHICiF1I4oLf6d7DnB7zKDPfxpto3UMLDyQDN74qLoudxreQ==&return_url=http://localhost:8080/LhtyPC/pay/return_url.jsp&notify_url=http://www.zjttmall.com/alipaynotify&version=1.0&app_id=2017031306205218&sign_type=RSA2&timestamp=2018-02-07+13:20:26&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json&biz_content={"body":"wqe","out_trade_no":"dsad","product_code":"QUICK_WAP_WAY","subject":"qwewq","timeout_express":"2m","total_amount":"1.00"}
//https://openapi.alipay.com/gateway.do?charset=utf-8&method=alipay.trade.wap.pay&sign=Si6ZgkMFDYMBNxDm%2FaFqUmBEOg9asMH7zSj6B1C%2FHkvph%2FSov3nNDCxhkDmEMVv%2FVc719FfIwk6y0eZVYCHpXf5eq2IYKIVAAgoQrFny%2BEHLnsMGJQqENMp5Lg6infPtFiFv2Mfye05ixFK6yUWsVqkoiuj19KSFfXE7XBT%2FXQsLkfVlpKdVWcpnysrprbvOC6qkgM8FdUlCfdf79l3iZ%2BNxZ83pn%2BJsFH4uCxFKFJ79A0gwyd6du1o3xB%2Btv%2BHycCOnE669AMa9g%2FK5YAS%2BE%2BMni0j%2FwcMYMLgteehPRtZ%2BCONQY2Agoq6vAVsJ7XMO2cXACt101IgevDh%2FastaLQ%3D%3D&return_url=http%3A%2F%2Flocalhost%3A8080%2FLhtyPC%2Fpay%2Freturn_url.jsp&notify_url=http%3A%2F%2Fwww.zjttmall.com%2Falipaynotify&version=1.0&app_id=2017031306205218&sign_type=RSA2&timestamp=2018-02-07+10%3A57%3A59&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json&biz_content={"body":"wqe","out_trade_no":"dsad","product_code":"QUICK_WAP_WAY","subject":"qwewq","timeout_express":"2m","total_amount":"1.00"}

export default class Help {
  /**
   * 数组转树结构
   */
  static arrayToTree(tree) {
    let data = [];
    let findKid = dad => {
      dad['children'] = [];
      tree.map((kid, i1) => {
        if (kid['parent_id'] === dad.id) {
          findKid(kid);
          dad['children'].push(kid);
        }
      });
      if (dad['parent_id'] === 0) {
        data.push(dad);
      }
    };
    tree.map((dad, i) => {
      if (dad['parent_id'] === 0) {
        findKid(dad);
      }
    });
    return data;
  }
  /**
   * 判断是否是微信打开
   */
  static isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') !== -1;
    if (isWeixin) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 请用post或者get方法  ~\(≧▽≦)/~啦啦啦
   */
  static ajax(url, type, data) {
    return new Promise((resolve, reject) => {
      url = url.indexOf('?') >= 0 ? url : url + '?';
      let token =
        '&key=' +
        Help.getCookie('key') +
        '&token=' +
        Help.getCookie('token') +
        '&';
      data === undefined
        ? (url = url + token)
        : (data = querystring.stringify(data) + token);
      $.ajax({
        type: type,
        url: url,
        data: data || '',
        dataType: 'json',
        // async: false,
        error: function(request) {
          reject(request);
        },
        success: function(json) {
          resolve(json);
        }
      });
    });
  }
  /**
   * 用get方式请求后端,不知道就全用post好啦 (不改动数据库,请求数据比较少的时候使用)
   * @param {string} url 请求地址
   * @param {any} data 请求参数{a:1}的形式（可不填）
   * @returns {Object}
   */
  static get(url, data) {
    return this.ajax(url, 'GET', data);
  }
  /**
   * 用post方式请求后端
   * @param {string} url 请求地址
   * @param {any} data 请求参数{a:1}的形式（可不填）
   * @returns {Object}
   */
  static post(url, data) {
    return this.ajax(url, 'POST', data);
  }
  /**
   * 同计时器的调用方式只是做了Promise的封装
   * @param {any} time 秒
   * @param {function} hander 时间到了后的回调
   */
  setTimeOut(hander, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        hander();
        resolve();
      }, time);
    });
  }

  /**
   * 取得url里的参数 例子/user/id=1 可获得id的值
   * @param {string} key url里参数
   * @returns {string} 返回url里key的值
   */
  static hashUrl(key) {
    return window.location.hash
      .split(key)[1]
      .split('/')[0]
      .split('=')[1];
  }

  /**
   * 设置用户cookie
   * @param {string} key
   * @param {string} token
   */
  static setToken(key, token) {
    this.setCookie('key', key);
    this.setCookie('token', token);
  }
  /**
   *  设置cookie
   * @param {string} key
   * @param {any} value
   * @param {any} time 0秒表示删除这条cookie(可不填)
   */
  static setCookie(key, value, time) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (time || 2678400) * 1000);
    document.cookie =
      key +
      '=' +
      escape(encodeURIComponent(value)) +
      ';expires=' +
      expires.toGMTString() +
      ';path=' +
      escape('/');
  }
  /**
   * 获取cookie的值
   * @param {string} key
   * @returns {string}
   */
  static getCookie(key) {
    var myCookie = document.cookie;
    var data = myCookie.split('; ');
    for (var i = 0; i < data.length; i++) {
      var co = data[i].split('=');
      if (co[0] === key) {
        return decodeURIComponent(co[1]);
      }
    }
    return '';
  }
}
