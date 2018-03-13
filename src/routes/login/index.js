import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Toast, List, InputItem } from "antd-mobile";
import { createForm } from "rc-form";
import Help from "../../utils/help.js";
import hex_md5 from "../../utils/md5.js"
// import { log } from "util";

// var crypto = require("crypto");
// var https = require("https");
// var qs = require("querystring");

class LoginWrapper extends Component {
  state = {};

  async componentDidMount() {
    
  }

  handleClick = () => {
    this.props.form.validateFields(async (error, value) => {
      if (error) {
        for (var key in error) {
          Toast.info(error[key].errors[0].message, 1);
        }
      } else {
        let result = await Help.get(
          "login?user.phone=" +
            value.phone +
            "&user.password=" +
            hex_md5(value.password)
        );
        if (true == result.success && "11001" == result.message) {
          Help.setCookie("key", result.key);
          Help.setCookie("token", result.token);
          Help.setCookie("user", value.phone);
          Help.setCookie("level", result.data.level);
          Help.setCookie("phone", value.phone, 31536000); //记住手机号一年
          Toast.info("登录成功");
          window.location.href = "#";
        } else Toast.info("用户名密码不正确，请重新输入!", 1);
      }
    });
  };
  //<form id="form" method="post" action='+this.state.action&biz_content=this.state.biz'><input type="submit" value="立即支付" style="display:none;" /></form>  
  
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login">
        <img
          style={{
            zIndex: "-1",
            position: "fixed",
            width: "100%",
            height: document.documentElement.clientHeight
          }}
          src="http://tongtai.oss-cn-shanghai.aliyuncs.com/pic/背景图1.jpg"
        />
        <div
          style={{
            lineHeight: "3.4rem",
            textAlign: "center",
            fontSize: "1.4rem",
            color: "white"
          }}
        >
          <a
            href="#"
            style={{
              left: 0,
              position: "absolute",
              lineHeight: "3rem",
              marginLeft: "10px",
              fontSize: "2rem",
              color: "white"
            }}
            className="iconfont"
          >
            &#xe623;
          </a>同台会员
        </div>

        <div
          style={{
            paddingBottom: "5%",
            lineHeight: "10rem",
            textAlign: "center",
            fontSize: "6rem",
            color: "white",
            paddingTop: "5%"
          }}
          className="iconfont"
        >
          &#xe64e;
        </div>
        <List style={{ margin: "0 auto", width: "80%" }}>
          <InputItem
            {...getFieldProps(
              "phone",
              { initialValue: Help.getCookie("phone") || "" },
              { rules: [{ required: true, message: "请输入手机号!" }] }
            )}
            clear
            type="number"
            placeholder="请输入手机号"
          >
            <div style={{ fontSize: "1.5rem" }} className="iconfont">
              &#xe616;
            </div>
          </InputItem>
          <InputItem
            {...getFieldProps("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })}
            clear
            type="password"
            placeholder="请输入密码"
          >
            <div style={{ fontSize: "1.5rem" }} className="iconfont">
              &#xe6a1;
            </div>
          </InputItem>
        </List>
        <div
          style={{
            border: "solid 1px #a3a3a3",
            background: "rgba(129, 124, 134,0.9)",
            margin: "2rem auto 0 auto",
            borderRadius: "100px",
            lineHeight: "2rem",
            width: "50%",
            color: "white",
            textAlign: "center"
          }}
          onClick={this.handleClick}
        >
          登录
        </div>
        <a
          href="#register"
          style={{
            display: "block",
            border: "1px solid white",
            background: "rgba(129, 124, 134,0.2)",
            margin: "2rem auto 0 auto",
            borderRadius: "100px",
            lineHeight: "2rem",
            width: "50%",
            color: "white",
            textAlign: "center"
          }}
        >
          去注册
        </a>
      </div>
    );
  }
}
const Login = createForm()(LoginWrapper);
export default Login;
