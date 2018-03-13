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

const Item = List.Item;
class NewAddressWrapper extends Component {
  state = {
    addrList: [],
    defaultAddr: 0
  };

  componentDidMount() {}
  ajaxData = (values, string) => {
    let _string = "";
    let data = "";
    for (var key in values) {
      if (string !== undefined) {
        _string = string + ".";
      }
      values[key] === undefined
        ? 0
        : (data = data + "&" + _string + key + "=" + values[key]);
    }
    return data;
  };
  handleClick = () => {
    this.props.form.validateFields(async (error, value) => {
      if (error) {
        for (var i in error) {
          Toast.info(error[i].errors[0].message, 1);
        }
      } else {
        let addrData = this.ajaxData(value, "address");
        let data = await Help.get("addaddress?" + addrData);
        Help.setToken(data.key, data.token);
        Toast.info("保存成功");
        window.location.href = "#receipt";
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Head
          rightContent={
            <a onClick={this.handleClick} style={{ color: "white" }}>
              保存
            </a>
          }
          icon={
            <div
              onClick={() => {
                window.history.back();
              }}
              style={{ fontSize: "1.5rem", marginTop: "-0.5rem" }}
              className="iconfont"
            >
              &#xe631;
            </div>
          }
          title={
            <div style={{ fontSize: "1rem", color: "white" }}>收货地址</div>
          }
        />
        <List>
          <InputItem
            {...getFieldProps("consignee", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写收货人" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            收货人
          </InputItem>
          <InputItem
            {...getFieldProps("phone", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写联系电话" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            联系电话
          </InputItem>
          <InputItem
            {...getFieldProps("zipcode", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写邮编" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            邮编
          </InputItem>
          <InputItem
            {...getFieldProps("province", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写省份" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            省份
          </InputItem>
          <InputItem
            {...getFieldProps("city", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写城市" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            城市
          </InputItem>
          <InputItem
            {...getFieldProps("district", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写县区" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            县区
          </InputItem>
          <InputItem
            {...getFieldProps("address", {
              // initialValue: 'little ant',
              rules: [{ required: true, message: "请填写详细地址" }]
            })}
            clear
            onErrorClick={() => {}}
          >
            详细地址
          </InputItem>
          <div style={{ display: "none" }}>
            <InputItem
              {...getFieldProps("telphone", {
                initialValue: ""
              })}
              clear
              onErrorClick={() => {}}
            />
            <InputItem
              {...getFieldProps("country", {
                initialValue: "中国"
              })}
              clear
              onErrorClick={() => {}}
            />
          </div>
        </List>
      </div>
    );
  }
}
const NewAddress = createForm()(NewAddressWrapper);
export default NewAddress;
