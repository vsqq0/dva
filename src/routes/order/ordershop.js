import React, { Component } from "react";
import $ from "jquery";
import { WhiteSpace } from "antd-mobile";
import Help from "../../utils/help.js";
class Ordershop extends Component {
  state = {
    product: [],
    s: "",
    message: ""
  };

  componentDidMount() {
    this.setState({ product: this.props.product });

  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      product: nextProps.product
    });
  };

  //跳到详情页
  toDetail = orderId => {
    window.location.href = "#/orderdetails/orderid=" + orderId;
  };

  //跳到旗舰店
  toShopDetail = supplierId => {
    window.location.href = "#/flagship/supplierId=" + supplierId;
  };

  //加入个人C店
  like = id => {
    $.ajax({
      type: "post",
      url: "CStore!add",
      data:
        "key=" +
        Help.getCookie("key") +
        "&token=" +
        Help.getCookie("token") +
        "&goodsId=" +
        id +
        "&userId=1045",
      dataType: "json",
      async: false,
      error: function(request) {
        alert("系统繁忙，请稍后再试!");
        return false;
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
        alert("成功加入C店");
      }
    });
  };
  //去付款
  topay = orderId => {
    window.location.href = "#/payjump/orderId=" + orderId;
  };
  render() {
    return <div style={{ clear: "both" }}>
        <div style={{ width: "100%", height: "2.5rem" }}>
          <div style={{ background: "white", float: "left", display: "inline-block", lineHeight: "2rem", width: "77%", height: "2rem", fontSize: "1.2rem" }} onclick={this.toShopDetail.bind(this, this.state.product.supplierid)}>
            <div style={{ display: "inline-block", float: "left", width: "10%", height: "2rem", textAlign: "center" }}>
              <img src={this.state.product.supplierLogo} style={{ width: "80%", height: "80%" }} />
            </div>
            <div style={{ display: "inline-block", float: "left", fontSize: "1rem" }}>
              {this.state.product.supplierName}
            </div>
          </div>

          <div style={{ width: "23%", float: "left", display: "inline-block", paddingTop: "0.625rem", textAlign: "right", color: "red", fontSize: "1rem" }}>
            {this.state.product.orderState === 0 && this.state.product.payState === 0 && "未付款"}
            {this.state.product.orderState === 1 && this.state.product.payState === 9 && "待发货"}
            {this.state.product.orderState === 4 && this.state.product.payState === 9 && "已发货"}
            {this.state.product.orderState === 2 && this.state.product.payState === 9 && "订单已完成"}
            {this.state.product.orderState === 3 && this.state.product.payState === 0 && "订单失败"}
            {this.state.product.orderState === 3 && this.state.product.payState === 9 && "退单成功"}
          </div>
        </div>

        <div style={{ width: "100%", height: "50%", clear: "both", float: "left", background: "#DDDDDD", marginTop: "0.3rem", fontSize: "10px", alignitems: "center" }} onClick={this.toDetail.bind(this, this.state.product.orderId)}>
          <div style={{ clear: "both" }}>
            <WhiteSpace />
          </div>
          <div style={{ float: "left", display: "inline-block", width: "30%", height: "100%" }}>
            <img style={{ height: "5rem", width: "5rem", paddingBottom: "0.8rem", paddingLeft: "0.8rem", paddingRight: "0.8rem", paddingTop: "0.2rem" }} src={this.state.product.img} />
          </div>
          <div style={{ float: "left", display: "inline-block", width: "60%", height: "100%" }}>
            <div style={{ width: "100%", height: "2rem", fontSize: "0.9rem", overflow: "hidden" }}>
              {this.state.product.orderName}
            </div>
          </div>
          <div style={{ float: "left", display: "inline-block", width: "10%", height: "100%" }}>
            <div
              style={{
                width: "100%",
                height: "3.5rem",
                fontSize: "0.8rem"
              }}
            >
              ￥{this.state.product.price}
            </div>
            <div style={{ display: "inline-block", color: "gray", width: "50%", textAlign: "right" }}>
              X{this.state.product.orderNumber}
            </div>
          </div>
        </div>
        <div style={{ width: "95%", height: "2rem", clear: "both", borderTop: "2px solid #eeeeee", textAlign: "right", lineHeight: "2rem" }}>
          共{this.state.product.orderNumber}件商品 合计￥{this.state.product.orderAmount}元
        </div>
        {this.state.product.orderState == 0 && this.state.product.payState == 0 && <div style={{ width: "96%", height: "2rem", clear: "both", paddingRight: "1rem", borderTop: "2px solid #eeeeee", textAlign: "right", lineHeight: "2rem" }}>
              <span style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", padding: "0.15rem", marginRight: "0.5rem" }} onClick={this.props.onDelete.bind(this, this.state.product.orderId)}>
                删除订单
              </span>

              <span style={{ width: "6rem", border: "1px solid red", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem", marginRight: "0.5rem", color: "red" }} onClick={this.toDetail.bind(this, this.state.product.orderId)}>
                去付款
              </span>
            </div>}

        {this.state.product.orderState == 1 && this.state.product.payState == 9 && <div style={{ width: "96%", height: "2rem", clear: "both", padding: "0.5rem", borderTop: "2px solid #eeeeee", textAlign: "right", lineHeight: "2rem" }}>
              <span style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem", marginRight: "0.5rem" }}>
                退货
              </span>
              <span style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem", marginRight: "0.5rem" }}>
                催单
              </span>
            </div>}

        {this.state.product.orderState == 4 && this.state.product.payState == 9 && <div style={{ width: "96%", height: "2rem", clear: "both", padding: "0.5rem", borderTop: "2px solid #eeeeee", textAlign: "right", lineHeight: "2rem" }}>
              <a href={"#logistics/orderId=" + this.state.product.orderId} style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", padding: "0.15rem", marginRight: "0.5rem" }}>
                查看物流
              </a>
              <span style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", padding: "0.15rem", marginRight: "0.5rem" }}>
                确认收货
              </span>
            </div>}

        {this.state.product.orderState == 2 && this.state.product.payState == 9 && <div style={{ width: "96%", height: "2rem", clear: "both", padding: "0.5rem", borderTop: "2px solid #eeeeee", textAlign: "right", lineHeight: "2rem" }}>
              <span style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", padding: "0.15rem", marginRight: "0.5rem" }} onClick={this.props.onDelete.bind(this, this.state.product.orderId)}>
                删除订单
              </span>
              <span style={{ width: "6rem", border: "1px solid black", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", padding: "0.15rem", marginRight: "0.5rem" }} onClick={this.like.bind(this, this.state.product.goodsId)}>
                加入C店
              </span>
              <span onClick={() => {
                  window.location.href = "#evaluate/goodsId=" + this.state.product.goodsid1 + "/orderId=" + this.state.product.orderId;
                }} style={{ width: "6rem", border: "1px solid red", height: "2rem", lineHeight: "2rem", "border-radius": "30px", textAlign: "center", paddingLeft: "0.5rem", paddingRight: "0.5rem", color: "red", marginRight: "0.5rem" }}>
                评价
              </span>
            </div>}

        <div style={{ background: "#DDDDDD", clear: "both" }}>
          <WhiteSpace />
        </div>
      </div>;
  }
}

export default Ordershop;
