import React, { Component } from "react";
import { WhiteSpace, NavBar, Icon, Button, Toast } from "antd-mobile";
import Cartshop from "./cartshop.js";
import Head from "../../components/indexHead";
import Foot from "../../components/foot.js";
import $ from "jquery";
import Help from "../../utils/help.js";

class Order extends Component {
  state = {
    product: [],
    s: "",
    summoney: 0,
    choose: false,
    choosenum: 0,
    chooseproduct1: {}
  };

  async componentDidMount() {
    Toast.loading("正在拼命加载中", 10);
    await this.updata1();
    Toast.hide();
  }
  updata1 = async () => {
    let result = await Help.get("findCart");
    Help.setToken(result.key, result.token);
    for (var i in result.data) {
      let da = result.data[i];
      this.state.product.push({
        desc1: da.desc1,
        desc2: da.desc2,
        desc3: da.desc3,
        desc4: da.desc4,
        descid: da.desc_id,
        goodsid: da.goods_id,
        name: da.name,
        img: da.img,
        num: da.num,
        orderid: da.order_id,
        price: da.price,
        amount: da.amount,
        choose: false,
        shownow: true
      });
    }
    this.setState({ s: "" });
  };

  deleteproduct = orderId => {
    var key = Help.getCookie("key");
    var token = Help.getCookie("token");
    $.ajax({
      type: "POST",
      url: "clearCart",
      data: "key=" + key + "&token=" + token + "&orderId=" + orderId,
      dataType: "text",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(data) {
        var result = eval("(" + data + ")");
        if (true == result.success) {
          Help.setToken(result.key, result.token);
        }
      }
    });
    this.state.product.map(product => {
      if (product.orderid == orderId) {
        product.shownow = false;
        product.choose = false;
      }
    });
  };

  onchoose = () => {
    this.state.product.map(product => {
      if (product.choose == false && this.state.choose == false) {
        this.state.summoney = this.state.summoney + product.amount;
        this.state.choosenum++;
      } else if (product.choose == false && this.state.choose == true) {
      } else if (product.choose == true && this.state.choose == false) {
      } else {
        this.state.summoney = this.state.summoney - product.amount;
        this.state.choosenum--;
      }
      product.choose = !this.state.choose;
    });
    this.setState({
      choose: !this.state.choose
    });
  };

  upnumber = (num, amount, orderId) => {
    this.state.product.map(product => {
      if (product.orderid == orderId) {
        if (product.choose == true) {
          if (amount == 1) {
            this.state.summoney = this.state.summoney + product.price;
            //product.amount=amount;
          } else if (amount == 0) {
            this.state.summoney = this.state.summoney - product.price;
          }
        } else {
          product.num = num;
        }
        this.setState({ s: "" });
      }
    });
  };

  chooseproduct = (choose, orderId) => {
    this.state.product.map(product => {
      if (product.orderid == orderId) {
        if (product.choose) {
          this.setState({ summoney: this.state.summoney + product.amount });
          this.state.choosenum++;
        } else {
          this.setState({
            summoney: this.state.summoney - product.amount,
            choose: false
          });
          this.state.choosenum--;
        }
      }
    });
  };

  allCount = () => {
    if ("" == this.state.summoney || 0 == this.state.summoney) {
      Toast.info("请选择商品");
      return false;
    }

    let _state = this.state; // chooseproduct1
    this.setState({
      chooseproduct1: {}
    });
    this.state.product.map(product => {
      if (product.choose) {
        _state.chooseproduct1[product.orderid] = product.num;
      }
    });
    console.log(this.state.chooseproduct1);
    console.log(JSON.stringify(this.state.chooseproduct1));

    var key = Help.getCookie("key");
    var token = Help.getCookie("token");
    $.ajax({
      type: "POST",
      url: "createPayment",
      data:
        "key=" +
        key +
        "&token=" +
        token +
        "&input=" +
        JSON.stringify(this.state.chooseproduct1),
      dataType: "text",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(data) {
        var result = eval("(" + data + ")");
        if (true == result.success) {
          Help.setToken(result.key, result.token);
          //跳转支付页面
          window.location.href = "#/Order";
        }
      }
    });
  };

  render() {
    return (
      <div style={{ background: "gray", height: "100%" }}>
        <Head title={"购物车"} />
        <div style={{ background: "white" }}>
          {this.state.product.map((product, index) => {
            return (
              <div>
                <Cartshop
                  product={product}
                  key={index}
                  delect={this.deleteproduct.bind(this)}
                  upnumber={this.upnumber.bind(this)}
                  chooseproduct={this.chooseproduct.bind(this)}
                />
                <div style={{ background: "#EEEEEE" }}>
                  <WhiteSpace size="lg" />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ background: "white" }}>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
        </div>
        <div
          style={{
            width: "100%",
            background: "#FEFEFE",
            color: "black",
            position: "fixed",
            bottom: "50px",
            height: "45px",
            padding: "0",
            fontSize: "10px"
          }}
        >
          <div
            style={{
              width: "61.8%",
              height: "100%",
              display: "inline-block",
              lineHeight: "1.3rem",
              float: "left"
            }}
          >
            <div
              style={
                this.state.choose == false
                  ? {
                      border: "1px solid black",
                      width: "1.1rem",
                      display: "inline-block",
                      height: "1.1rem",
                      marginLeft: "5%",
                      marginTop: "5%"
                    }
                  : {
                      border: "1px solid black",
                      display: "inline-block",
                      width: "1.1rem",
                      height: "1.1rem",
                      background: "black",
                      marginLeft: "5%",
                      marginTop: "5%"
                    }
              }
              onClick={this.onchoose.bind(this)}
            />
            <span style={{ marginTop: "5%", fontSize: "1.2rem" }}>全选</span>
            <div
              style={{
                textAlign: "right",
                display: "inline-block",
                width: "60%",
                fontSize: "1.1rem"
              }}
            >
              合计:<span style={{ color: "red", fontSize: "1.5rem" }}>
                ￥{this.state.summoney}
              </span>
            </div>
          </div>
          <div
            style={{ width: "38.2%", float: "left", display: "inline-block" }}
          >
            <Button
              style={{
                width: "100%",
                height: "100%",
                padding: "0",
                backgroundColor: "red",
                display: "inline-block",
                color: "white",
                fontSize: "1.8rem"
              }}
              onClick={this.allCount.bind(this)}
            >
              结算({this.state.choosenum})
            </Button>
          </div>
          <Foot selectedTab="4" />
        </div>
      </div>
    );
  }
}

export default Order;
