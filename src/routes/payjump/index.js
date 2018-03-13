import React, { Component } from "react";
import $ from "jquery";
import { NavBar, Icon } from "antd-mobile";
import Help from "../../utils/help.js";

class CheckOrder extends Component {
  state = {
    user: "",
    order: "",
    amount: 0,
    alipay: []
  };

  componentDidMount() {
    let orderCode = "";
    let addressId = "";
    let _this = this;
    let descid = "";
    $.ajax({
      type: "get",
      url: "finduserinfo",
      data:
        "key=" + Help.getCookie("key") + "&token=" + Help.getCookie("token"),
      dataType: "json",
      async: false,
      error: function(request) {},
      success: function(data) {
        Help.setToken(data.key, data.token);
        _this.setState({ user: data });
      }
    });

    $.ajax({
      type: "get",
      url: "findOrder",
      data:
        "key=" +
        Help.getCookie("key") +
        "&token=" +
        Help.getCookie("token") +
        "&orderId=" +
        window.location.href.split("orderId=")[1], //1078
      dataType: "json",
      async: false,
      error: function(request) {},
      success: function(data) {
        descid = data.data.goodsId;
        Help.setToken(data.key, data.token);
        _this.setState({ order: data });
      }
    });

    // payId： 1是支付宝 2是微信
    $.ajax({
      type: "get",
      url: "payOrder",
      data:
        "key=" +
        Help.getCookie("key") +
        "&token=" +
        Help.getCookie("token") +
        "&payId=1&orderId=" +
        window.location.href.split("orderId=")[1] +
        "&descId=" +
        descid +
        "&addressId=0",
      dataType: "json",
      async: false,
      error: function(request) {},
      success: function(data) {
        Help.setToken(data.key, data.token);
        _this.setState({ alipay: data.data });
      }
    });
  }

  createPayment = e => {};

  render() {
    const columns = [
      {
        title: "订单号",
        dataIndex: "orderCode"
      },
      {
        title: "数量",
        dataIndex: "orderNumber"
      },
      {
        title: "单价",
        dataIndex: "price"
      },
      {
        title: "费率",
        dataIndex: "orderFee"
      }
    ];
    const { order, user } = this.state;

    let o = [];
    o.push(order.data || []);
    const defaultAddr =
      user == "" ? "" : user.data.addressList[user.data.userInfo.addressId];
    return (
      <div>
        <NavBar
          style={{
            color: "white",
            width: "100%",
            background: "rgb(255, 57, 57)"
          }}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          订单确认
        </NavBar>
        <form action="pay/alipayapi.jsp" className="alipayform" method="POST">
          <div
            style={{
              display: "none"
            }}
          >
            <input
              type="text"
              value={this.state.alipay.order_code}
              name="WIDout_trade_no"
              id="out_trade_no"
            />产品单号
            <input
              type="text"
              name="WIDsubject"
              value={this.state.alipay.goodsName}
            />产品名称(subject)，必填(建议中文，英文，数字，不能含有特殊字符)
            <input
              type="text"
              name="WIDtotal_fee"
              value={this.state.alipay.finalPrice}
            />付款金额(total_fee)，必填(格式如：1.00,请精确到分)
            <input
              type="text"
              name="WIDbody"
              value={this.state.alipay.goodDesc}
            />商品描述(body)，选填(建议中文，英文，数字，不能含有特殊字符)
          </div>
          <div
            style={{
              fontWeight: "bold"
            }}
          >
            确认收货地址
          </div>
          <div
            style={{
              marginTop: 5
            }}
          >
            <span>
              寄送至 {defaultAddr.country}
              {defaultAddr.province}
              {defaultAddr.city}
              {defaultAddr.district}
              {defaultAddr.address}
              （{user == "" ? "" : user.data.userInfo.userSalt}
              收）
            </span>
          </div>
          <div>
            <span>
              手机{defaultAddr.phone}
              默认地址
            </span>
            <a
              style={{
                color: "blue",
                float: "right"
              }}
              href="address.html"
            >
              修改收货地址
            </a>
          </div>
          <div
            style={{
              marginTop: 20,
              fontWeight: "bold"
            }}
          >
            确认订单信息
          </div>
          <div
            style={{
              marginTop: 10,
              float: "right"
            }}
          >
            <div
              style={{
                marginRight: 5
              }}
            >
              实付款：
              <font
                style={{
                  fontSize: 18,
                  color: "#f40"
                }}
              >
                ￥{order == "" ? "" : order.data.orderAmount}
              </font>
            </div>
            <input
              style={{
                float: "right"
              }}
              type="submit"
              className="tijiao"
              onClick={this.createPayment.bind(this)}
              value="提交订单"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CheckOrder;
