import React, {Component} from 'react';
import {
  SearchBar,
  Button,
  Checkbox,
  Toast,
  List,
  InputItem,
  WhiteSpace
} from 'antd-mobile';
import {createForm} from 'rc-form';
import Head from '../../components/indexHead.js';
import Foot from '../../components/foot.js';
import Help from "../../utils/help.js";
class supplierCharts extends Component {
  state = {
    supplierList: [],
    defaultAddr: 0
  };

  async componentDidMount() {
    Toast.loading("正在拼命加载中", 10);
    await this.top100();
    Toast.hide();
  }
  top100 = async() => {
    let json = await Help.get("getPointList?");
    let top100 = {};
    for (let i in json.data) {
      for (let j in json.data[i]) {
        for (let k in json.data[i][j]) 
          this.state.supplierList.push({name: json.data[i][j][k].name,
            icon: json.data[i][j][k].logo,
            supplierId: json.data[i][j][k].supplierId
          });
        }
      }
    this.setState({defaultAddr: 0});
  };

  supplierjump = id => {
    console.log("dian");
    window.location.href = "#/flagship/supplierId=" + id;
  };

  render() {
    return (
      <div style={{
        width: "100%"
      }}>
        <Head title={"排行榜"}/> {this
          .state
          .supplierList
          .map((supplier, index) => {
            return (
              <div key={index} style={{
                width: "100%"
              }}>
                <div
                  style={{
                  width: "100%",
                  background: "white",
                  lineHeight: "3rem",
                  height: "3rem"
                }}
                  onClick={this
                  .supplierjump
                  .bind(this, supplier.supplierId)}>
                  <img
                    src={supplier.icon}
                    style={{
                    width: "2rem",
                    height: "2rem",
                    marginTop: "0.5rem",
                    marginLeft: "1.5rem",
                    marginRight: "0.8rem",
                    float: "left"
                  }}/> {supplier.name}
                </div>
                <div
                  style={{
                  width: "100%",
                  height: "3px"
                }}/>
              </div>
            );
          })}
        <Foot selectedTab="2"/>

      </div>
    );
  }
}
export default supplierCharts;
