import React, { Component } from "react";
import {
  SearchBar,
  Button,
  Checkbox,
  Toast,
  List,
  InputItem,
  WhiteSpace
} from "antd-mobile";
import $ from "jquery";
import { createForm } from "rc-form";
import Head from "../../components/indexHead.js";
import Help from "../../utils/help.js";

class ReceiptWrapper extends Component {
  state = {
    addrList: [],
    defaultAddr: 0
  };

  componentDidMount() {
    this.addrListReload();
  }

  //设置默认收货地址
  updateuserinfo = async addressId => {
    let data = await Help.get('updateuserinfo?&user.addressId='+addressId);
    Help.setToken(data.key, data.token);
    Toast.info("设置成功", 1);
    await this.addrListReload();
  };
  
  addrListReload = async addressId => {
    let data = await Help.get("finduserinfo");
    Help.setToken(data.key, data.token);
    this.setState({
      userInfo: data.data.userInfo,
      addrList: data.data.addressList, //[]
      addrListLoading: false, //true
      defaultAddr: data.data.userInfo.addressId, //[]
      account: data.data.payWayInfo.account
    });
  };

  deleteaddress = async (addressId, e) => {
    let data = await Help.get('deleteaddress?&addressId=' +addressId);
    Help.setToken(data.key, data.token);
    Toast.info("删除成功", 1);
    await this.addrListReload();
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Head
          rightContent={
            <a key="0" href="#newAddress" style={{ color: "white" }}>
              新增
            </a>
          }
          title={"收货地址"}
        />
        {this.state.addrList.map((item, i) => {
          let dom = i == this.state.defaultAddr ? <span>
                <span className="iconfont">&#xe63d;</span> 默认地址
              </span> : <span onClick={this.updateuserinfo.bind(this, i)}>
                <span className="iconfont">&#xe63e;</span> 设为默认
              </span>;
          return <div key={i} style={{ marginBottom: "0.25rem", background: "white", padding: "1rem" }}>
              <div style={{ paddingBottom: "0.5rem" }}>
                {item.consignee}
                <span style={{ float: "right" }}>{item.phone}</span>
              </div>
              {item.country} {item.province} {item.city} {item.district}
              <div style={{ paddingTop: "0.5rem" }}>
                {dom}
                <span onClick={this.deleteaddress.bind(this, item.addressId)} style={{ float: "right" }}>
                  <span className="iconfont">&#xe732;</span>删除
                </span>
              </div>
            </div>;
        })}
      </div>
    );
  }
}
const Receipt = createForm()(ReceiptWrapper);
export default Receipt;
