import React, { Component } from "react";
import { Grid, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";
import ClassifyLookuphead from "./classsifyLookuphead";
import $ from "jquery";
import help from "../../utils/help.js";

class flagship extends Component {
  state = {
    goodslist: [],
    cateid: 0,
    paixv: [{ name: "销量" }, { name: "价格" }, { name: "新品" }],
    upRow: 1, //0 按新品排 1价格 2销量
    pageNum: 1, //总页数
    pageNo: 1, //当前页
    logo: "",
    supplierName: "",
    size: 0,
    ss: []
  };

  componentWillMount() {
    let _this = this;
    _this.reload(this.state.upRow, 1);
    $.ajax({
      type: "get",
      url: "supplierStore!simpleInfo",
      data: "supplierId=" + window.location.href.split("supplierId=")[1],
      dataType: "json",
      async: false,
      error: function(request) {},
      success: function(data) {
        _this.setState({
          logo: data.data.logo,
          supplierName: data.data.name
        });
      }
    });
  }

  reload = (type, page) => {
    let _this = this;
    $.ajax({
      type: "get",
      url: "supplierStore",
      data:
        "supplierId=" +
        window.location.href.split("supplierId=")[1] +
        "&type=" +
        type +
        "&page=" +
        page,
      dataType: "json",
      async: false,
      error: function(request) {},
      success: function(data) {
        let jsonData = data.data.pageDate;
        for (var i in jsonData) {
          _this.state.ss.push({
            icon: jsonData[i].goodsImg,
            text: jsonData[i].goodsName,
            price: jsonData[i].resalePrice,
            id: jsonData[i].goodsId,
            orderNum: jsonData[i].orderNum
          });
        }
        _this.setState({
          goodslist: _this.state.ss,
          pageNum: data.data.maxpage,
          size: data.data.size,
          ss: []
        });
      }
    });
  };

  jump = id => {
    window.location.href = "#/details/goodsid=" + id;
  };

  setUplist = evl => {
    this.setState({
      goodslist: evl
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <ClassifyLookuphead
            reload={this.reload.bind(this)}
            setUplist={this.setUplist.bind(this)}
            name={"旗舰店"}
          />
        </div>
        <div style={{ height: "5rem", width: "100%" }} />
        <div style={{ width: "100%", height: "2rem", fontSize: "1.2rem" }}>
          <div
            style={{
              display: "inline-block",
              float: "left",
              width: "10%",
              height: "2rem",
              lineHeight: "2rem",
              textAlign: "center"
            }}
          >
            <img
              src={this.state.logo}
              style={{ width: "80%", height: "80%" }}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              float: "left",
              lineHeight: "2rem"
            }}
          >
            {this.state.supplierName}
          </div>
        </div>
        <Grid
          data={this.state.goodslist}
          onClick={_el => this.jump(_el.id)}
          columnNum={2}
          square={false}
          renderItem={dataItem => (
            <div style={{ padding: "1px" }}>
              <img
                src={dataItem.icon}
                style={{ width: "95%", height: "80%" }}
                alt=""
              />
              <div
                style={{ color: "#888", fontSize: "18px", marginTop: "10px" }}
              >
                <div
                  style={{
                    textAlign: "left",
                    overflow: "hidden",
                    lineHeight: "1.5rem",
                    height: "3rem",
                    float: "left"
                  }}
                >
                  {dataItem.text}
                </div>
                <div style={{ float: "left", color: "red" }}>
                  ￥{dataItem.price}
                </div>
                <div
                  style={{ width: "100%", textAlign: "right", color: "gray" }}
                >
                  销量:{dataItem.orderNum}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default flagship;
