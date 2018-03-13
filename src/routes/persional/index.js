import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Toast,
  List,
  Button,
  Modal,
  Grid,
  Flex,
  Card,
  Carousel,
  WingBlank,
  WhiteSpace,
  InputItem
} from "antd-mobile";
import { createForm } from "rc-form";
import Foot from "../../components/foot.js";
import Head from "../../components/indexHead.js";
import Help from "../../utils/help.js";
import QrCodeModal from "./qrCodeModal";
import svgpath from "svgpath";
import qr from "qr-image";
import $ from "jquery";

const alert = Modal.alert;
const prompt = Modal.prompt;

class PersionalWrapper extends Component {
  state = {
    userInfo: [],
    userReferrerNum: 0,
    number: 0,
    tiXianCuoWu: "",
    vipform: "",
    action: "",
    biz: "",
    account: ""
  };

  async componentDidMount() {
    Toast.loading("正在拼命加载中", 10);
    await this.userReload();
    Help.getCookie("level") == "1" ? 0 : await this.createVipOrder();
    Toast.hide();
  }

  createVipOrder = async () => {

    let json = await Help.get("createLevel?");
    Help.setToken(json.key, json.token);
    this.setState({
      out_trade_no: json.data.level_code,
      name: json.data.levelName,
      money: json.data.levelPrice,
      body: json.data.levelDesc
    });
    let data = await Help.get("phoneAlipay", {
      out_trade_no: json.data.level_code,
      subject: json.data.levelName,
      total_amount: json.data.levelPrice,
      body: json.data.levelDesc
    });
    Help.setToken(data.key, data.token);
    this.setState({
      action: data.data.split('"')[5],
      biz: data.data.split('"')[11]
    });
    return json;
  };

  userReload = async () => {
    let data = await Help.get("finduserinfo?");
    Help.setToken(data.key, data.token);
    this.setState({
      userInfo: data.data.userInfo,
      addrList: data.data.addressList, //[]
      addrListLoading: false, //true
      defaultAddr: data.data.userInfo.addressId, //[]
      account: data.data.payWayInfo.account,
      userReferrerNum: data.data.userReferrerNum
    });
    return data;
  };

  getMoney = async value => {
    if (this.state.account == "" || this.state.account == "undefined") {
      Toast.info("请去设置支付宝账号", 1);
      return;
    }
    if (this.state.userInfo.userMoney < value) {
      Toast.info("对不起您的余额不足", 1);
      return;
    }
    let data = await Help.get("translatecash?amount=" + value + "&type=" + 1);
    Help.setToken(data.key, data.token);
    if (data.data.alipay_fund_trans_toaccount_transfer_response.msg == "Success") {
      Toast.info("提现成功", 1);
    } else {
      Toast.info(data.data.alipay_fund_trans_toaccount_transfer_response.sub_msg, 1);
    }
    this.setState({ visible: false });
    await this.userReload();
  };

  handleNumberChange = e => {
    const number = e.target.value;
    if (isNaN(number)) {
      return;
    }
    this.setState({ number });
  };

  alipayVip = async params => {};
  a = params => {};

  render() {
    let { getFieldProps } = this.props.form;
    const listStyle = {
      paddingLeft: "5%",
      marginTop: "1%",
      marginBottom: "1%",
      lineHeight: "3rem",
      background: "white",
      textAlign: "left",
      display: "block",
      clear: "both"
    };
    let vipColor =
      Help.getCookie("level") != "0"
        ? "rgb(211, 216, 6)"
        : "rgb(128, 128, 128)";
    let vipDom =
      Help.getCookie("level") != "0" ? (
        ""
      ) : (
        <a
          onClick={() =>
            alert("成为合伙人", vipForm, [
              {
                text: "支付宝支付",
                onPress: async () => {
                  //todo use js
                  if (Help.isWeixin()) {
                    //Help.isWeixin()
                    let action =
                      $("#form")[0].action.split("&sign=")[0] +
                      "&return_url=" +
                      $("#form")[0].action.split("&return_url=")[1];
                    let sign = $("#form")[0]
                      .action.split("&sign=")[1]
                      .split("&")[0];
                    Help.setCookie("action", action);
                    Help.setCookie("sign", sign);
                    window.location.href = "demo_post.htm#"; //+ action
                  } else {
                    $("#form")[0].submit();
                  }
                }
                },
                {
                  text: "微信支付",
                  onPress: async () => {
                    //ajax
                    window.location.href = "wxauthorize";
                  }
                },
                {
                  text: "取消",
                  onPress: () => console.log("cancel")
                },
            ])
          }
          style={listStyle}
        >
          成为合伙人
        </a>
      );
    const vipForm = (
      <form
        target="_blank"
        ref={o => {
          this.vipSubmit = o;
        }}
        action="pay/alipayapi.jsp"
        className="alipayform"
        method="POST"
      >
        <div
          style={{
            display: "none"
          }}
        >
          <input
            type="text"
            name="WIDout_trade_no"
            id="out_trade_no"
            value={this.state.out_trade_no}
          />"产品单号:"
          <input
            type="text"
            name="WIDsubject"
            value={this.state.name}
          />"产品名称:"，必填(建议中文，英文，数字，不能含有特殊字符)
          <input
            type="text"
            name="WIDtotal_fee"
            value={this.state.money}
          />"付款金额:"必填(格式如：1.00,请精确到分)
          <input
            type="text"
            name="WIDbody"
            value={this.state.body}
          />"商品描述:"选填(建议中文，英文，数字，不能含有特殊字符)
          <input type="submit" className="tijiao" value="去付款" />
        </div>
        <div>成为合伙人需要1000元</div>
        <div>合伙人返利是普通会员的10倍</div>
      </form>
    );

    return (
      <div>
        {
          <Head
            icon={
              <a href="#persionalConfig" style={{ color: "white" }}>
                设置
              </a>
            }
            title={"个人信息"}
          />
        }
        <div
          style={{
            color: "white",
            width: "100%",
            height: "8rem",
            background:
              "url(http://tongtai.oss-cn-shanghai.aliyuncs.com/pic/个人中心.png) no-repeat"
          }}
        >
          <div
            style={{
              paddingTop: "2%"
            }}
          >
            <a
              href="#persionalConfig"
              style={{
                color: "white",
                float: "left",
                marginLeft: "5%",
                fontSize: "5rem"
              }}
              className="iconfont"
            >
              &#xe64e;
            </a>
            <div
              onClick={() => {
                console.log(this);
              }}
              style={{
                marginTop: "8%",
                marginLeft: "5%",
                float: "left"
              }}
            >
              <div
                style={{
                  fontSize: "1.25rem"
                }}
              >
                {this.state.userInfo.userName}
                <span
                  style={{
                    padding: "0.2rem",
                    fontSize: "1.4rem",
                    color: vipColor
                  }}
                  className="iconfont"
                >
                  &#xe62a;
                </span>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                marginRight: "5%",
                float: "right",
                marginTop: "0%"
              }}
            >
              <div
                style={{
                  display: "none"
                }}
              >
                推荐二维码
              </div>
              <QrCodeModal
                path={
                  "http://www.zjttmall.com/web.html#/register/uphone=" +
                  this.state.userInfo.phone
                }
              />
            </div>
          </div>
        </div>
        <Flex
          style={{
            fontSize: "1.15rem",
            lineHeight: "2rem",
            background: "white"
          }}
        >
          <Flex.Item>
            <div
              style={{
                textAlign: "center"
              }}
            >
              <span
                style={{
                  color: "#d81e06",
                  fontSize: "1.5rem"
                }}
                className="iconfont"
              >
                &#xe627;
              </span>
              <span
                style={{
                  fontSize: "1rem"
                }}
              >
                推荐
              </span>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div
              style={{
                textAlign: "center"
              }}
            >
              <span
                style={{
                  color: "#d81e06",
                  fontSize: "1.5rem"
                }}
                className="iconfont"
              >
                &#xe62e;
              </span>
              <span
                style={{
                  fontSize: "1rem"
                }}
              >
                余额
              </span>
            </div>
          </Flex.Item>
          <Flex.Item>
            <div
              style={{
                textAlign: "center"
              }}
            >
              <span
                style={{
                  color: "#d81e06",
                  fontSize: "1.5rem"
                }}
                className="iconfont"
              >
                &#xe629;
              </span>
              <span
                style={{
                  fontSize: "1rem"
                }}
              >
                积分
              </span>
            </div>
          </Flex.Item>
        </Flex>
        <Flex
          style={{
            fontSize: "1.15rem",
            lineHeight: "2rem",
            background: "white"
          }}
        >
          <Flex.Item>
            <div
              style={{
                textAlign: "center"
              }}
            >
              {this.state.userReferrerNum}
            </div>
          </Flex.Item>
          <Flex.Item>
            <div
              style={{
                textAlign: "center"
              }}
            >
              {this.state.userInfo.userMoney}元
            </div>
          </Flex.Item>
          <Flex.Item>
            <div
              style={{
                textAlign: "center"
              }}
            >
              {this.state.userInfo.frozenMoney}
            </div>
          </Flex.Item>
        </Flex>
        <a href="#order" style={listStyle}>
          我的订单
        </a>
        <a
          onClick={() =>
            prompt("请输入提现金额(元)", <div />, [
              {
                text: "取消",
                onPress: () => console.log("cancel")
              },
              {
                text: "提现",
                onPress: value =>
                  new Promise(resolve => {
                    if (isNaN(value)) {
                      Toast.info("请输入正确格式的金额", 0.8);
                      return;
                    }
                    if (value.indexOf(".") > -1) {
                      Toast.info("金额必须是整数", 0.8);
                      return;
                    }
                    this.getMoney(value);
                    resolve();
                  })
              }
            ])
          }
          style={listStyle}
        >
          提现
        </a>
        {vipDom}
        <div
          style={{
            display: "none",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            background: "white"
          }}
        >
          <Flex
            justify="center"
            style={{
              fontSize: "1.15rem",
              lineHeight: "5rem"
            }}
          >
            <Flex.Item>
              <a
                style={{
                  display: "block",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    color: "#d81e06",
                    fontSize: "4rem"
                  }}
                  className="iconfont"
                >
                  &#xe603;
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: "2rem"
                  }}
                >
                  个人C店
                </div>
              </a>
            </Flex.Item>
            <Flex.Item>
              <a
                style={{
                  display: "block",
                  textAlign: "center"
                }}
                href="#/order"
              >
                <div
                  style={{
                    color: "#faa00c",
                    fontSize: "4rem"
                  }}
                  className="iconfont"
                >
                  &#xe626;
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: "2rem"
                  }}
                >
                  我的订单
                </div>
              </a>
            </Flex.Item>
          </Flex>
          <Flex
            style={{
              marginTop: "0.5rem",
              fontSize: "1.15rem",
              lineHeight: "5rem"
            }}
          >
            <Flex.Item>
              <a
                style={{
                  display: "block",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    color: "#9da3ed",
                    fontSize: "4rem"
                  }}
                  className="iconfont"
                >
                  &#xe622;
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: "2rem"
                  }}
                >
                  我的收藏
                </div>
              </a>
            </Flex.Item>
            <Flex.Item>
              <a
                style={{
                  display: "block",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    color: "#d81e06",
                    fontSize: "4rem"
                  }}
                  className="iconfont"
                >
                  &#xe604;
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: "2rem"
                  }}
                >
                  红包
                </div>
              </a>
            </Flex.Item>
          </Flex>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<form id="form" method="post" action=' +
              this.state.action +
              "&biz_content=" +
              this.state.biz +
              '><input type="submit" value="立即支付" style="display:none;" /></form>'
          }}
        />
        <Foot selectedTab="5" />
      </div>
    );
  }
}
const Persional = createForm()(PersionalWrapper);
export default Persional;
