import React, { Component } from 'react';
import { SearchBar,Button, Checkbox, Toast, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import { createForm } from 'rc-form';
import Head from '../../components/indexHead.js';
import Help from "../../utils/help.js";
class ChooseAdress extends Component {

  state = {
    addrList:[],
    defaultAddr:0,
  }

  componentDidMount() {
    this.addrListReload();
  }

  //选择地址
  chooseadress=(addressid)=>{
window.location.href="#orderdetails/orderid="+window.location.href.split("orderId=")[1]+"/addressId="+addressid
  }


  addrListReload=()=>{
    let _this = this;
    $.ajax({
      type:"get",
      url:"finduserinfo",
      data:"key="+ Help.getCookie("key")+"&token="+ Help.getCookie("token"),
      dataType:"json",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
        _this.setState({
          userInfo: data.data.userInfo,
          addrList: data.data.addressList,//[]
          addrListLoading: false,//true
          defaultAddr:data.data.userInfo.addressId,//[]
          account: data.data.payWayInfo.account,
        })
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Head rightContent={<a href="#newAddress" style={{color:"white"}}>新增</a>} icon={<div onClick={()=>{window.history.back()}} style={{fontSize: '1.5rem',marginTop: '-0.5rem'}} className="iconfont">&#xe631;</div>} title={<div style={{fontSize: '1rem',color:"white"}}>收货地址</div>}></Head>
        {this.state.addrList.map((item,i) => {
          let dom=i==this.state.defaultAddr?<span href="">[默认地址]</span>:<span></span>;
          return(
            <div style={{marginBottom: '0.25rem',background: 'white', padding: '1rem',}}
            onClick={this.chooseadress.bind(this,item.addressId)}>
              <div style={{paddingBottom:'0.5rem'}}>{item.consignee}<span style={{float: 'right'}}>{item.phone}</span></div>
                {item.country} {item.province} {item.city} {item.district}
              <div style={{paddingTop:'0.5rem'}}>{dom}</div>
            </div>
          )
        })}
      </div>
    );
  }
}
const chooseAdress = createForm()(ChooseAdress);
export default chooseAdress;
