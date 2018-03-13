import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {InputItem, Toast, List, Button, Modal, Grid, Flex, Card, Carousel, WingBlank, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import Head from '../../components/indexHead.js';
import Help from "../../utils/help.js";
import { createForm } from 'rc-form';

const prompt = Modal.prompt;
const operation = Modal.operation;

class App extends Component {
  state = {
    userInfo: [],
    account: ""
  };

  componentDidMount() {
    this.userReload();
  }

  addKey = data => {
    for (var key in data) {
      data[key]["key"] = key;
    }
    return data;
  };
  userReload = () => {
    let _this = this;
    $.ajax({
      type: "get",
      url: "finduserinfo",
      data:
        "key=" + Help.getCookie("key") + "&token=" + Help.getCookie("token"),
      dataType: "json",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
        _this.setState({
          userInfo: data.data.userInfo,
          addrList: data.data.addressList, //[]
          addrListLoading: false, //true
          defaultAddr: data.data.userInfo.addressId, //[]
          account: data.data.payWayInfo.account ||""
        });
      }
    });
  };

  logout = () => {
    $.ajax({
      type: "POST",
      url: "logout",
      data:
        "key=" + Help.getCookie("key") + "&token=" + Help.getCookie("token"),
      dataType: "text",
      async: false,
      error: function(request) {
        alert("系统繁忙，请稍后再试!");
        return false;
      },
      success: function(data) {
        var result = eval("(" + data + ")");
        Help.setCookie("key", null, 1, "/");
        Help.setCookie("token", null, 1, "/");
        Help.setCookie("user", null, 1, "/");
        // 放入cookie保存
        Toast.info("退出成功");
        window.location.hash = "#";
      }
    });
  };

  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    // const pNode = closest(e.target, '.am-modal-content');
    // if (!pNode) {
    //   e.preventDefault();
    // }
  };
  update = (key, value) => {
    let values = this.state.userInfo;
    let account = key == "account" ? value : this.state.account;
    values[key] = value || "";
    $.ajax({
      type: "post",
      url: "updateuserinfo",
      data:
        "key=" +
        Help.getCookie("key") +
        "&token=" +
        Help.getCookie("token") +
        "&user.userSalt=" +
        values.userSalt +
        "&user.email=" +
        values.email +
        "&user.phone=" +
        values.phone +
        "&user.sex=" +
        values.sex +
        "&user.userName=" +
        values.userName +
        "&account=" +
        account,
      dataType: "json",
      async: false,
      error: function(request) {
        alert("系统繁忙，请稍后再试!");
        return false;
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
        Toast.info("修改成功", 1);
      }
    });
    this.userReload();
  };

  render() {
    const font = {
      color: "rgb(169, 169, 169)",
      fontSize: "1rem",
      marginRight: "3%",
      float: "right"
    };
    return (
      <div>
        <Head
          title={
            <div style={{ fontSize: "1rem", color: "white" }}>个人资料</div>
          }
        />
        <div
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          同台头像<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span
            style={{
              color: "#dedede",
              marginTop: "-0.2rem",
              fontSize: "2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe605;
          </span>
        </div>
        <div
          onClick={() =>
            prompt(
              "修改用户名",
              "",
              [
                { text: "取消" },
                {
                  text: "修改",
                  onPress: value =>
                    new Promise(resolve => {
                      this.update("userSalt", value);
                      resolve();
                    })
                }
              ],
              "default",
              null,
              ["请输入用户名"]
            )
          }
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          用户名<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span style={font}>{this.state.userInfo.userSalt}</span>
        </div>
        <div
          onClick={() =>
            prompt(
              "修改昵称",
              "",
              [
                { text: "取消" },
                {
                  text: "修改",
                  onPress: value =>
                    new Promise(resolve => {
                      this.update("userName", value);
                      resolve();
                    })
                }
              ],
              "default",
              null,
              ["请输入昵称"]
            )
          }
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          昵称<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span style={font}>{this.state.userInfo.userName}</span>
        </div>
        <div
          onClick={() =>
            prompt(
              "修改支付宝账号",
              "",
              [
                { text: "取消" },
                {
                  text: "修改",
                  onPress: value =>
                    new Promise(resolve => {
                      this.update("account", value);
                      resolve();
                    })
                }
              ],
              "default",
              null,
              ["请输入支付宝账号"]
            )
          }
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          支付宝账号<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span style={font}>{this.state.account}</span>
        </div>
        <div
          onClick={() => {
            window.location.href = "#/receipt";
          }}
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          我的收货地址<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span style={font}>查看</span>
        </div>
        <div 
          onClick={() => {
            this.setState({ modal1: true });
          }}
          style={{
            display:'none',
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          我的二维码名片<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span style={font} className="iconfont">
            &#xe617;
          </span>
        </div>
        <div
          onClick={() =>
            operation([
              { text: "男", onPress: () => this.update("sex", true) },
              { text: "女", onPress: () => this.update("sex", false) }
            ])
          }
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          性别<span
            style={{
              color: "#dedede",
              marginTop: "-0.1rem",
              fontSize: "1.2rem",
              marginRight: "3%",
              float: "right"
            }}
            className="iconfont"
          >
            &#xe620;
          </span>
          <span style={font}>{this.state.userInfo.sex ? "男" : "女"}</span>
        </div>
        <div
          style={{
            marginBottom: "1%",
            lineHeight: "3rem",
            paddingLeft: "5%",
            background: "white"
          }}
        >
          手机号
          <span style={font}>{this.state.userInfo.phone}</span>
        </div>
        <div
          onClick={this.logout.bind(this)}
          style={{
            width: "100%",
            bottom: 0,
            position: "fixed",
            textAlign: "center",
            background: "#ff0303",
            color: "white",
            lineHeight: "2.5rem"
          }}
        >
          退出登录
        </div>
      </div>
    );
  }
}

export default App;
