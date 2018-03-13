import React, { Component } from "react";
import { Tag, Button, Drawer, WhiteSpace, Icon, Toast } from "antd-mobile";
import DetailTag from "./detailTag.js";
import $ from "jquery";
import Help from "../../utils/help.js";

class Foot extends Component {
  state = {
    selectedTab: "redTab",
    hidden: false,
    fullScreen: false,
    open: this.props.open,
    desc: [],
    info: [],
    ischooesleibie: "",
    descAll: [],
    leibie1: [],
    leibie11: [],
    leibie12: [],
    leibie13: [],
    leibie14: [],
    chooseleibie: [],
    price: "",
    chooseid: "",
    goodsNum1: "",
    goodsNum: 1,
    message: ""
  };

  componentWillMount() {
    this.state.price = this.props.price;
    this.state.desc = this.props.desc;
    this.state.info = this.props.info;
    let desc = this.state.desc;
    let info = this.state.info;
    this.state.chooseleibie.push({
      goodsDesc1: "",
      goodsDesc2: "",
      goodsDesc3: "",
      goodsDesc4: ""
    });
    for (var i in desc) {
      this.state.descAll.push({
        goodsDesc1: desc[i].goodsDesc1,
        goodsDesc2: desc[i].goodsDesc2,
        goodsDesc3: desc[i].goodsDesc3,
        goodsDesc4: desc[i].goodsDesc4,
        goodid: desc[i].id,
        goodsNum: desc[i].goodsNum,
        price: desc[i].price
      });
      for (var i1 in desc[i].goodsDesc.split(",")) {
        let Desctureorfalse = false;
        this.state.leibie1.map(z => {
          if (desc[i].goodsDesc.split(",")[i1] === z.leixing) {
            Desctureorfalse = true;
          }
        });
        if (!Desctureorfalse) {
          this.state.leibie1.push({
            leixing: desc[i].goodsDesc.split(",")[i1],
            sub: i1
          });
        }

        if (i1 === "0") {
          let Desctureorfalse0 = false;
          this.state.leibie11.map(z => {
            if (desc[i].goodsDesc1 === z.leixing) {
              Desctureorfalse0 = true;
            }
          });
          if (!Desctureorfalse0) {
            this.state.leibie11.push({
              leixing: desc[i].goodsDesc1,
              sub: i1,
              ischoose: false
            });
          }
        } else if (i1 === "1") {
          let Desctureorfalse1 = false;
          this.state.leibie12.map(z => {
            if (desc[i].goodsDesc2 === z.leixing) {
              Desctureorfalse1 = true;
            }
          });
          if (!Desctureorfalse1) {
            this.state.leibie12.push({
              leixing: desc[i].goodsDesc2,
              sub: i1,
              ischoose: false
            });
          }
        } else if (i1 === "2") {
          let Desctureorfalse2 = false;
          this.state.leibie13.map(z => {
            if (desc[i].goodsDesc3 === z.leixing) {
              Desctureorfalse2 = true;
            }
          });
          if (!Desctureorfalse2) {
            this.state.leibie13.push({
              leixing: desc[i].goodsDesc3,
              sub: i1,
              ischoose: false
            });
          }
        } else if (i1 === "3") {
          let Desctureorfalse3 = false;
          this.state.leibie14.map(z => {
            if (desc[i].goodsDesc4 === z.leixing) {
              Desctureorfalse3 = true;
            }
          });
          if (!Desctureorfalse3) {
            this.state.leibie14.push({
              leixing: desc[i].goodsDesc4,
              sub: i1,
              ischoose: false
            });
          }
        }
      }
    }
  }

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  };

  onChooseChange = (ii, sub, leixing) => {
    if (sub === "0") {
      this.state.leibie11.map(z => {
        if (leixing === z.leixing) {
          z.ischoose = !z.ischoose;
          if (z.ischoose) {
            this.state.chooseleibie.goodsDesc1 = leixing;
          } else {
            this.state.chooseleibie.goodsDesc1 = "";
          }
        } else {
          z.ischoose = false;
        }
      });
    } else if (sub === "1") {
      this.state.leibie12.map(z => {
        if (leixing === z.leixing) {
          z.ischoose = !z.ischoose;
          if (z.ischoose) {
            this.state.chooseleibie.goodsDesc2 = leixing;
          } else {
            this.state.chooseleibie.goodsDesc2 = "";
          }
        } else {
          z.ischoose = false;
        }
      });
    } else if (sub === "2") {
      this.state.leibie13.map(z => {
        if (leixing === z.leixing) {
          z.ischoose = !z.ischoose;
          if (z.ischoose) {
            this.state.chooseleibie.goodsDesc3 = leixing;
          } else {
            this.state.chooseleibie.goodsDesc3 = "";
          }
        } else {
          z.ischoose = false;
        }
      });
    } else {
      this.state.leibie14.map(z => {
        if (leixing === z.leixing) {
          z.ischoose = !z.ischoose;
          if (z.ischoose) {
            this.state.chooseleibie.goodsDesc4 = leixing;
          } else {
            this.state.chooseleibie.goodsDesc4 = "";
          }
        } else {
          z.ischoose = false;
        }
      });
    }

    let is = false;
    this.state.descAll.map(z => {
      if (this.state.leibie1.length === 1) {
        if (z.goodsDesc1 === this.state.chooseleibie.goodsDesc1) {
          this.setState({
            price: z.price,
            chooseid: z.goodid,
            goodsNum1: z.goodsNum
          });
          is = true;
        } else if (!is && z.goodsNum > 0) {
          this.setState({
            price: "该商品已售罄",
            chooseid: "0",
            goodsNum1: "0"
          });
        }
      } else if (this.state.leibie1.length === 2) {
        if (z.goodsDesc1 === this.state.chooseleibie.goodsDesc1) {
          if (z.goodsDesc2 === this.state.chooseleibie.goodsDesc2) {
            this.setState({
              price: z.price,
              chooseid: z.goodid,
              goodsNum1: z.goodsNum
            });
            is = true;
          } else if (!is && z.goodsNum > 0) {
            this.setState({
              price: "该商品已售罄",
              chooseid: "0",
              goodsNum1: "0"
            });
          }
        }
      } else if (this.state.leibie1.length === 3) {
        if (z.goodsDesc1 === this.state.chooseleibie.goodsDesc1) {
          if (z.goodsDesc2 === this.state.chooseleibie.goodsDesc2) {
            if (z.goodsDesc3 === this.state.chooseleibie.goodsDesc3) {
              this.setState({
                price: z.price,
                chooseid: z.goodid,
                goodsNum1: z.goodsNum
              });
              is = true;
            } else if (!is && z.goodsNum > 0) {
              this.setState({
                price: "该商品已售罄",
                chooseid: "0",
                goodsNum1: "0"
              });
            }
          }
        }
      } else if (this.state.leibie1.length === 4) {
        if (z.goodsDesc1 === this.state.chooseleibie.goodsDesc1) {
          if (z.goodsDesc2 === this.state.chooseleibie.goodsDesc2) {
            if (z.goodsDesc3 === this.state.chooseleibie.goodsDesc3) {
              if (z.goodsDesc4 === this.state.chooseleibie.goodsDesc4) {
                this.setState({ price: z.price, chooseid: z.goodid });
                is = true;
              } else if (!is && z.goodsNum > 0) {
                this.setState({
                  price: "该商品已售罄",
                  chooseid: "0",
                  goodsNum1: "0"
                });
              }
            }
          }
        }
      }
    });

    this.setState({ ischooesleibie: "" });
  };

  //插入购物车
  insertcart = () => {
    if (this.state.chooseid == "0") {
      Toast.info("请选择商品");
    } else {
      console.log(this.state.chooseid, "ss");
      $.ajax({
        type: "post",
        url: "createOrder",
        data:
          "key=" +
          Help.getCookie("key") +
          "&token=" +
          Help.getCookie("token") +
          "&id=" +
          this.state.info.goodsId +
          "&goodsNum=" +
          this.state.goodsNum +
          "&descId=" +
          this.state.chooseid,
        dataType: "text",
        async: false,
        error: function(request) {
          return false;
        },
        success: function(data) {
          var result = eval("(" + data + ")");
          console.log(data);
          console.log(result);
          Help.setToken(result.key, result.token);
          if (true == result.success) {
            //createCheck = true;
            if ("11001" == result.message) {
              //alert('添加成功');
              window.location.href = "#/cart";
            } else {
              Toast.info(result.message);
            }
          } else if ((result.message = "已添加至购物车")) {
            Toast.info(result.message);
          }
        }
      });
    }
  };
  //直接购买
  shopNow = () => {
    if (this.state.chooseid === "0") {
      Toast.info("请选择商品");
    } else {
      $.ajax({
        type: "post",
        url: "shopNow",
        data:
          "key=" +
          Help.getCookie("key") +
          "&token=" +
          Help.getCookie("token") +
          "&id=" +
          this.state.info.goodsId +
          "&descId=" +
          this.state.chooseid +
          "&goodsNum=" +
          this.state.goodsNum,
        dataType: "json",
        async: false,
        error: function(request) {
          alert("系统繁忙，请稍后再试!");
          return false;
        },
        success: function(data) {
          Help.setToken(data.key, data.token);
          window.location.href = "#/payjump/orderId=" + data.data.orderId;
        }
      });
    }
  };

  //加入个人C点
  onChange = selected => {
    if (selected == true) {
      $.ajax({
        type: "post",
        url: "CStore!add",
        data:
          "key=" +
          Help.getCookie("key") +
          "&token=" +
          Help.getCookie("token") +
          "&goodsId=" +
          this.props.info.goodsId +
          "&userId=1045",
        dataType: "json",
        async: false,
        error: function(request) {
          alert("系统繁忙，请稍后再试!");
          return false;
        },
        success: function(data) {
          Help.setToken(data.key, data.token);
          Toast.info("成功加入C店");
        }
      });
    } else if (selected == false) {
      $.ajax({
        type: "get",
        url: "CStore!del",
        data:
          "key=" +
          Help.getCookie("key") +
          "&token=" +
          Help.getCookie("token") +
          "&userId=1045" +
          "&goodsId=" +
          this.props.info.goodsId,
        dataType: "json",
        async: false,
        error: function(request) {},
        success: function(data) {
          Help.setToken(data.key, data.token);
          console.log(data);
          Toast.info("从C店删除");
        }
      });
    }
  };

  upnumber = s => {
    if (this.state.goodsNum < 20) {
      this.setState({ goodsNum: this.state.goodsNum + 1, message: "" });
    } else {
      this.setState({ message: "一次最多只能买20件" });
    }
  };
  downnumber = s => {
    if (this.state.goodsNum > 1) {
      this.setState({ goodsNum: this.state.goodsNum - 1, message: "" });
    }
  };

  render() {
    let _this = this;
    const sidebar = (
      <div style={{ backgroundColor: "white", height: "80%" }}>
        <div style={{}}>
          <WhiteSpace />
          <img
            src={this.state.info.goodsImg.split(";")[0]}
            style={{
              padding: "0 0 0 5%",
              width: "20%",
              height: "20%",
              float: "left"
            }}
          />
        </div>
        <div style={{ color: "red", fontSize: "20px" }}>
          <span id="price">￥{this.state.price}</span>
        </div>
        <div style={{ color: "gray" }}>库存：{this.state.goodsNum1}</div>
        <div>
          请选择:
          {this.state.leibie1.map((item, s1) => {
            return (
              <div style={{ display: "inline-block" }}>
                {" "}
                {item.leixing}:
                {item.sub === "0" ? this.state.chooseleibie.goodsDesc1 : ""}
                {item.sub === "1" ? this.state.chooseleibie.goodsDesc2 : ""}
                {item.sub === "2" ? this.state.chooseleibie.goodsDesc3 : ""}
                {item.sub === "3" ? this.state.chooseleibie.goodsDesc4 : ""}
              </div>
            );
          })}
        </div>
        <div style={{ clear: "both", height: "400px", width: "100%" }}>
          <div style={{}}>
            {this.state.leibie1.map((item, s) => {
              let _item = item;

              return (
                <div key={s}>
                  <hr
                    style={{ border: "3 solid #ff0033", clear: "both" }}
                    width="98%"
                    SIZE="3"
                  />
                  <div>{item.leixing}</div>
                  <WhiteSpace />
                  {_item.sub === "0" &&
                    _this.state.leibie11.map((ii, i) => {
                      return (
                        <div
                          key={i}
                          onClick={this.onChooseChange.bind(
                            this,
                            ii.ischoose,
                            ii.sub,
                            ii.leixing
                          )}
                        >
                          <DetailTag
                            textcontent={ii.leixing}
                            choose={ii.ischoose}
                          />
                        </div>
                      );
                    })}
                  {_item.sub === "1" &&
                    _this.state.leibie12.map((ii, i) => {
                      return (
                        <div
                          key={i}
                          onClick={this.onChooseChange.bind(
                            this,
                            ii.ischoose,
                            ii.sub,
                            ii.leixing
                          )}
                        >
                          <DetailTag
                            textcontent={ii.leixing}
                            choose={ii.ischoose}
                          />
                        </div>
                      );
                    })}
                  {_item.sub === "2" &&
                    _this.state.leibie13.map((ii, i) => {
                      return (
                        <div
                          key={i}
                          onClick={this.onChooseChange.bind(
                            this,
                            ii.ischoose,
                            ii.sub,
                            ii.leixing
                          )}
                        >
                          <DetailTag
                            textcontent={ii.leixing}
                            choose={ii.ischoose}
                          />
                        </div>
                      );
                    })}
                  {_item.sub === "3" &&
                    _this.state.leibie14.map((ii, i) => {
                      return (
                        <div
                          key={i}
                          onClick={this.onChooseChange.bind(
                            this,
                            ii.ischoose,
                            ii.sub,
                            ii.leixing
                          )}
                        >
                          <DetailTag
                            textcontent={ii.leixing}
                            choose={ii.ischoose}
                          />
                        </div>
                      );
                    })}
                </div>
              );
            })}
            <hr
              style={{ border: "3 solid #ff0033", clear: "both" }}
              width="98%"
              SIZE="3"
            />
            <div>
              选择数量：<Icon
                type="down"
                onClick={this.downnumber.bind(this)}
              />
              <div
                style={{
                  border: "1px solid ",
                  width: "40px",
                  textAlign: "right",
                  display: "inline-block"
                }}
              >
                {this.state.goodsNum}
              </div>
              <Icon type="up" onClick={this.upnumber.bind(this)} />
              {this.state.message}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div
        style={
          this.state.open === false
            ? { width: "100%", position: "fixed", bottom: 0 }
            : {}
        }
      >
        <Drawer
          className="my-drawer"
          style={{
            minHeight: document.documentElement.clientHeight,
            zIndex: "2"
          }}
          enableDragHandle
          touch={false}
          position={"bottom"}
          contentStyle={{
            color: "#A6A6A6",
            textAlign: "center",
            paddingTop: 42
          }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange.bind(this)}
        />
        <div
          style={{ width: "100%", position: "fixed", bottom: 0, zIndex: "50" }}
          className="App"
        >
          <div style={{ width: "14%", padding: "0", float: "left" }}>
            <Tag style={{ width: "100%", height: "100%", padding: "0" }}>
              <div
                className="iconfont"
                style={{
                  color: "#ffd02d",
                  width: "100%",
                  height: "22px"
                }}
              >
                &#xe602;
              </div>
              客服
            </Tag>
          </div>

          <div style={{ width: "14%", padding: "0", float: "left" }}>
            <a href={"#/flagship/supplierId=" + this.props.supplierId}>
              <Tag style={{ width: "100%", padding: "0", height: "100%" }}>
                <div
                  className="iconfont"
                  style={{ color: "#ffd02d", width: "100%", height: "22px" }}
                >
                  &#xe62b;
                </div>
                进店
              </Tag>
            </a>
          </div>
          <div style={{ width: "14%", padding: "0", float: "left" }}>
            <Tag
              style={{ width: "100%", padding: "0", height: "100%" }}
              onChange={this.onChange}
            >
              <div
                className="iconfont"
                style={{ color: "#ffd02d", width: "100%", height: "22px" }}
              >
                &#xe62d;
              </div>
              收藏
            </Tag>
          </div>
          <div style={{ width: "29%", padding: "0", float: "left" }}>
            <Button
              style={{
                width: "100%",
                height: "100%",
                padding: "0",
                backgroundColor: "#ffd02d"
              }}
              onClick={
                this.state.open === false
                  ? this.onOpenChange.bind(this)
                  : this.insertcart.bind(this)
              }
            >
              加入购物车
            </Button>
          </div>
          <div style={{ width: "29%", padding: "0", float: "left" }}>
            <Button
              style={{
                width: "100%",
                height: "100%",
                padding: "0",
                backgroundColor: "red"
              }}
              onClick={
                this.state.open === false
                  ? this.onOpenChange.bind(this)
                  : this.shopNow.bind(this)
              }
            >
              立即购买
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Foot;
