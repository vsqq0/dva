import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Checkbox, Toast, List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import help from '../../utils/help.js';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class RegisterWrapper extends Component {

  state = {
    time:"获取验证码",
    hasError: false,
    value: '',
    uphone:"",
  }

  componentDidMount() {
    this.setState({uphone: window.location.hash.split("uphone=")[1] });
  }



  onChange = (value) => {

  }

  handleClick = () => {
    this.props.form.validateFields(async(error, value) => {
      if(error){
        for (var i in error) {
          Toast.info(error[i].errors[0].message,1);
        }
      }else if(value.password!==value.password2){
        Toast.info('密码填写不一致',1);
      }
      else{
        let data = await help.get("register?" + "user.phone=" + value.phone + "&user.password=" + window.hex_md5(value.password) + "&code=" + value.code + "&uphone=" + this.state.uphone);
        if (data.success==true) {
          Toast.info('注册成功', 3);
          /**/
          let result = await help.get(
            "login?user.phone=" +
              value.phone +
              "&user.password=" +
              window.hex_md5(value.password)
          );
          if (true == result.success && "11001" == result.message) {
            help.setCookie("key", result.key);
            help.setCookie("token", result.token);
            help.setCookie("user", value.phone);
            help.setCookie("level", result.data.level);
            help.setCookie("phone", value.phone, 31536000); //记住手机号一年
            Toast.info("登录成功");
            window.location.href = "#/";
          }
          /**/
          // window.location.href="#/login";
        }
        else{Toast.info('注册失败',1);}
      }
    });

  }

  getVCode=async()=>{
    if (typeof this.state.time =="number") {return;}
    let time=60;
    this.setState({time: 60});
    this.timer = setInterval(
      () => {
        time=time-1;
        this.setState({time: time})
        console.log(time);
        if (time==0) {
          clearInterval(this.timer);
          this.setState({time: "重新获取"})
        }
      },
      1000
    );
    let data =await help.get("checkCode?"+"phone="+this.props.form.getFieldsValue().phone+"&type=1")
  }

  render() {
    const { getFieldProps } = this.props.form;
    return <div className="register">
        <img style={{ zIndex: "-1", position: "fixed", width: "100%", height: document.documentElement.clientHeight }} src="http://tongtai.oss-cn-shanghai.aliyuncs.com/pic/%E6%B3%A8%E5%86%8C.jpg" />
        <div onClick={() => {
            window.history.back();
          }} style={{ lineHeight: "3.4rem", textAlign: "center", fontSize: "1.4rem", color: "white" }}>
          <a style={{ left: 0, position: "absolute", lineHeight: "3rem", marginLeft: "10px", fontSize: "2rem", color: "white" }} className="iconfont">
            &#xe631;
          </a>同台会员
        </div>
        <div
          style={{
            lineHeight: "5rem",
            color: "white",
            textAlign: "center",
            fontSize: "2.45rem"
          }}
        >
          注册
        </div>
        <List style={{ margin: "0 auto", width: "90%" }}>
          <InputItem {...getFieldProps("phone", {
              rules: [
                { required: true, message: "请输入手机号!" },
                { pattern: /^1\d{10}$/, message: "请输入正确手机号" }
              ]
            })} clear type="number" placeholder="请输入手机号">
            <div style={{  fontSize: "1.5rem" }} className="iconfont">
              &#xe616;
            </div>
          </InputItem>
          <InputItem {...getFieldProps("code", {
              rules: [{ required: true, message: "请输入验证码!" }]
            })} clear type="number"  placeholder="请输入验证码">
            <div style={{ width: "7rem" }}>
                <div onClick={this.getVCode.bind(this)} style={{width: '4rem',textAlign: 'center',fontSize:'0.8rem', padding: "0.5rem", color: "white", borderRadius: "100px", backgroundColor: "rgba(43, 43, 43, 0.8)" }}>
                  {this.state.time}
                </div>
              </div>
          </InputItem>
          <InputItem {...getFieldProps("password", {
              rules: [
                {
                  pattern: /^[a-zA-Z0-9]\w{7,27}$/,
                  message: "密码必须不能小于8位 包含英文字母"
                },
                { required: true, message: "请输入密码!" }
              ]
            })} clear type="password" placeholder="请输入密码">
            <div style={{  fontSize: "1.5rem" }} className="iconfont">
              &#xe6a1;
            </div>
          </InputItem>
          <InputItem {...getFieldProps("password2", {})} clear type="password" placeholder="请再次输入密码">
            <div style={{  fontSize: "1.5rem" }} className="iconfont">
              &#xe6a1;
            </div>
          </InputItem>
          <InputItem value={this.state.uphone} clear type="phone" placeholder="推荐人手机号(可不填)">
            <div style={{  fontSize: "1.5rem" }} className="iconfont">
              &#xe60d;
            </div>
          </InputItem>
          <div>
            <AgreeItem defaultChecked="true" data-seed="logId" onChange={e => console.log("checkbox", e)}>
              <span style={{ textAlign: "center", fontSize: "0.8rem" }}>
                我已阅读并同意《同台网用户服务条款》
              </span>
            </AgreeItem>
          </div>
        </List>
        <div style={{ background: "#817c86", margin: "1rem auto 0 auto", borderRadius: "100px", lineHeight: "2rem", width: "50%", color: "white", textAlign: "center" }} onClick={this.handleClick}>
          立即注册
        </div>
      </div>;
  }
}

const Register = createForm()(RegisterWrapper);

export default Register;
