import React, { Component } from 'react';
import $ from "jquery";
import Ordershop from './ordershop';
import {WhiteSpace,NavBar, Icon,Button,Toast,Tabs} from 'antd-mobile';
import Head from '../../components/indexHead';
import Help from "../../utils/help.js";

export default class Order extends Component {
 state = {
    order:0,
    pay:0,
    orderList: [],
    initialPage:[],
    pageNo:1,
    current: 'mail',
    loading:false,
    pageCurrent:1,
  }
//分页查询
  orderReload=(orderState,payState,setPageNo)=>{
    let _this=this;
    _this.setState({
      loading:true,
    });
    $.ajax({
      type:"get",
      url:"findorderlist",
      data:"key="+Help.getCookie("key")+"&token="+Help.getCookie("token")+"&order_state="+orderState+"&pay_state="+payState+"&pageNo="+setPageNo,
      dataType:"json",
      async: false,
      error: function(request) {
        console.log(request);
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
        let lastData = data.data.pop();
        let pageNo = lastData["pageNum"];
        let orderList = lastData[setPageNo];
        for (var i in orderList) {
          let img="";//定义图片
          let orderName="";//定义名字
          let goodsid1="";//商品ID
          let supplierid="";
          let supplierName="";
          let supplierLogo="";
          for (var orderId in data.data[0]) {
            img = data.data[0][orderList[i].orderId].split(";#;")[0];
            orderName = data.data[0][orderList[i].orderId].split(";#;")[1];
            goodsid1=data.data[0][orderList[i].orderId].split(";#;")[2];
            supplierid=data.data[0][orderList[i].orderId].split(";#;")[3];
            supplierName=data.data[0][orderList[i].orderId].split(";#;")[4];
            supplierLogo=data.data[0][orderList[i].orderId].split(";#;")[5];
          }
          orderList[i].img=img;
          orderList[i].orderName=orderName;
          orderList[i].goodsid1=goodsid1;
          orderList[i].supplierid=supplierid;
          orderList[i].supplierName=supplierName;
          orderList[i].supplierLogo=supplierLogo;
        }
        orderList.map(function(index, elem) {
          index.key=elem;
          index.pic="";
        })
        _this.state.pageNo=pageNo;
        _this.state.orderList=orderList;
        _this.setState({
          //pageNo: pageNo,
          //orderList: orderList,
          loading:false,
        });
      }
    });
  }

  componentDidMount() {
    this.orderReload(0,0,1);
  }

//分页选择
  pageChange=(page,e)=>{
    this.orderReload(this.state.order,this.state.pay,page);
    this.setState({
      pageCurrent:page
    });
  }
//选择订单种类
  orderClick=(order)=>{
    this.state.pageCurrent=1;
    let order_state;
    let pay_state;
    switch(order.key)
    {
      case "all":
      order_state=12;
      pay_state=12;
      break;

      case "waitpay":
      order_state=0;
      pay_state=0;
      break;

      case "waitset":
      order_state=1;
      pay_state=9;
      break;

      case "waitget":
      order_state=4;
      pay_state=9;
      break;

      case "done":
      order_state=2;
      pay_state=9;
      break;
    }
    this.setState({order: order_state,pay: pay_state})
    this.orderReload(order_state,pay_state,1);
  }

  //删除订单
  onDelete=(orderId)=>{
    $.ajax({
      type:"post",
      url:"delOrder",
      data:"key="+Help.getCookie("key")+"&token="+Help.getCookie("token")+"&orderId="+orderId,
      dataType:"json",
      async: false,
      error: function(request) {
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
      }
    });
    this.orderReload(this.state.order,this.state.pay,1);
  }

  handleChange=(value)=> {
    console.log(`selected ${value}`);
  }



  render() {

    let div=(record)=>{
      const order=record.orderState;
      const pay=record.payState;
      if (true) {//order==0 && pay==0
        return (
          <span>
            <a  href={"checkOrder.html?"+record.orderId} style={{marginRight: 5}}>去付款</a>
            <a style={{marginRight: 5}}>取消订单</a>
          </span>
        )
      }else if(false){//order==9 && pay==1
        return (
            <span style={{marginRight: 5}}>待发货</span>
        )
      }else if(false){//order==9 && pay==4
        return (
            <a style={{marginRight: 5}}>收货</a>
        )
      }
    }

     const columns = [{
        title: '商品信息',
        dataIndex: 'img',
        render: (text, record,i) => {
          return(
          <span>
            <img style={{width:60,height:60}} src={record.img}/>
          </span>
        )},
      }, {
        title: '商品名',
        dataIndex: 'orderName',
      }, {
        title: '订单号',
        dataIndex: 'orderCode',
      }, {
        title: '商家',
        dataIndex: 'goodsId',
      }, {
        title: '单价',
        dataIndex: 'price',
      }, {
        title: '数量',
        dataIndex: 'orderNumber',
      }, {
        title: '订单费率',
        dataIndex: 'orderFee',
      }, {
        title: '总金额',
        dataIndex: 'orderAmount',
      }, {
        title: '收货人',
        dataIndex: 'userId',
      }, {
        title: '操作',
        dataIndex: 'Action',
        render: (text, record,i) => {
          //onClick={this.toDetail.bind(this,record.orderId)}
          debugger;
          return(
          <span>
              <a style={{marginRight: 5}} href={"orderSearchDetail.html?"+record.orderId} >详情</a>
              <a style={{marginRight: 5}} onClick={this.like.bind(this,record.goodsId)} href="#" >喜欢</a>
              <a style={{marginRight: 5}} onClick={this.onDelete.bind(this,record.orderId)} href="">删除</a>
            {
              div(record)
            }
          </span>
        )},
      }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
  };

  const tabs2 = [
      { title: '全部', key: 'all' },
      { title: '待付款', key: 'waitpay' },
      { title: '待发货', key: 'waitset' },
      { title: '待收货', key: 'waitget' },
      { title: '待评价', key: 'done' },
    ];


    return <div>
        <div id="head" style={{ position: "fixed", top: "0px", width: "100%" }}>
          <Head title="我的订单" />
          <Tabs tabs={tabs2} tabBarUnderlineStyle={{ border: "#ff7e37 solid" }} tabBarTextStyle={{ fontSize: "0.9rem" }} initialPage={1} onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }} onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
              this.orderClick(tab);
            }} />
        </div>
        <div style={{ height: "90px", width: "100%" }} />
        {this.state.orderList.map((product, index) => {
          console.log("product11", product);
          return product != undefined && <div key={index}>
                <Ordershop product={product} onDelete={this.onDelete.bind(this)} />
              </div>;
        })}
      </div>;
  }
}
