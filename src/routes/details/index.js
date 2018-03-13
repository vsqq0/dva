import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import DetailTabs from "./detailTabs.js";
import Foot from "./detailFoot.js";
import Head from "../../components/indexHead";
import $ from "jquery";

class Details extends Component {
  state = {
    carousel: [],
    info: [],
    desc: {},
    goods_desc: {},
    price: "",
    supplierId: "",
    open: false,
    supplier: []
  };

  componentWillMount() {
    if (window.location.href.split("goodsid=")[0] == window.location.href) {
      window.location.href = "#/";
    } else {
      this.find();
      this.findSuppliy();
    }
  }

  find = () => {
    let _this = this;
    $.ajax({
      type: "GET",
      url: "findGoods",
      data: "goodsId=" + window.location.href.split("goodsid=")[1],
      dataType: "json",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(json) {
        let info = json.data[0].info[0];
        let desc = json.data[0].desc;
        _this.state.info = info;
        _this.state.desc = desc;
        let minprice = desc[0].price;
        let maxprice = desc[0].price;
        for (var s in desc) {
          if (desc[s].price < minprice) {
            minprice = desc[s].price;
          } else if (desc[s].price > maxprice) {
            maxprice = desc[s].price;
          }
        }
        if (minprice == maxprice) {
          _this.state.price = desc[0].price;
        } else {
          _this.state.price = minprice + "-" + maxprice;
        }
        _this.state.GoodsName = info.goodsName;

        let img = info.goodsImg.split(";");

        for (var i in img) {
          _this.state.carousel.push({ pic: img[i] });
        }
      }
    });

    $.ajax({
      type: "GET",
      url: "findGoods!InfoDesc",
      data: "goodsId=" + window.location.href.split("goodsid=")[1],
      dataType: "text",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(data) {
        var result = JSON.parse(data);
        var dt = result.data;
        _this.state.goods_desc = dt[0].goodsDesc;
        _this.state.supplierId = dt[0].supplierId;
      }
    });
  };

  findSuppliy = () => {
    let _this = this;
    $.ajax({
      type: "GET",
      url: "findGoods!GetProductInfo",
      data: "goodsId=" + window.location.href.split("goodsid=")[1],
      dataType: "text",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(data) {
        var result = JSON.parse(data);
        _this.state.supplier.push({
          logo: result.data[0].logo,
          name: result.data[0].name
        });
      }
    });
  };

  footopen = () => {
    console.log(this.state.open);
    this.refs.getSwordButton.onOpenChange();
  };

  render() {
    return (
      <div className="details">
        <DetailTabs
          info={this.state.info}
          price={this.state.price}
          desc={this.state.desc}
          goods_desc={this.state.goods_desc}
          carousel={this.state.carousel}
          supplierId={this.state.supplierId}
          supplier={this.state.supplier}
          footopen={this.footopen.bind(this)}
        />
        <Foot
          info={this.state.info}
          desc={this.state.desc}
          price={this.state.price}
          supplierId={this.state.supplierId}
          ref="getSwordButton"
          open={this.state.open}
        />
      </div>
    );
  }
}

export default Details;
