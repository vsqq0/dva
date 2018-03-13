import React, { Component } from 'react';
import $ from "jquery";
import Orderdetailsshop from './orderDetailsshop.js';
import {WhiteSpace,NavBar ,Button,Toast,Tabs,Icon} from 'antd-mobile';
import Help from "../../utils/help.js";

export default class OrderDetails extends Component {

   state = {
    user: "",
    order:"",
    receiptAddr:"",
    adress:"",
    adressconfirm:false,
    addressId:"",
    orderid:"",
    isaddress:false,
  }

  componentWillMount() {
    let _this = this;
    this.state.orderid=window.location.href.split("orderid=")[1].split("/")[0];
     // 获取订单详细信息
    $.ajax({
      type:"get",
      url:"findOrder",
      data:"key="+Help.getCookie("key")+"&token="+Help.getCookie("token")+"&orderId="+_this.state.orderid,//1078
      dataType:"json",
      async: false,
      error: function(request) {
      },
      success: function(data) {
        Help.setToken(data.key, data.token);
         _this.state.order= data.data;
      }
    });

  /*  if( _this.state.order.addressId!=0 && _this.state.order.payState!=0  )
    {
        console.log("订单不等于0，即查询订单的地址,除未付款")
    }*/


    if(window.location.href.split("addressId=")[0]!=window.location.href)
    {
        this.state.addressId=window.location.href.split("addressId=")[1].split("/")[0];
    }


    // 获取用户详细信息
    $.ajax({
      type:"get",
      url:"finduserinfo",
      data:"key="+Help.getCookie("key")+"&token="+Help.getCookie("token"),
      dataType:"json",
      async: false,
      error: function(request) {
      },
      success: function(data) {
        let addressList=data.data.addressList
        Help.setToken(data.key, data.token);
        if(window.location.href.split("addressId=")[0]!=window.location.href)
        {//地址栏有地址
            for(var i in addressList){
                if(addressList[i].addressId==_this.state.addressId)
                {
                    _this.setState({
                        user: addressList[i],
                        isaddress:true,
                    })
                }
            }
        }
        else if(data.data.userInfo.addressId!=0)
        {
            for(var i in addressList){
                if(addressList[i].addressId==data.data.userInfo.addressId)
                {
                    _this.setState({
                        user: addressList[i],
                        isaddress:true,
                        addressId:data.data.userInfo.addressId,
                    })
                }
            }
        }
        else {

        }
      }
    })



  }
  //去付款
    topay=()=>{
        window.location.href="#/payjump/orderId="+this.state.order.orderId;
    }
    //选择地址
    chooseAdress=()=>{
        window.location.href="#/chooseadress/orderId="+this.state.order.orderId;
    }
    //添加地址
    AddAdress=()=>{
        window.location.href="#/newAddress/orderId="+this.state.order.orderId;
    }


    adressconfirm=()=>{
        let _this = this;
        // 提交订单地址
    $.ajax({
      type:"post",
      url:"orderadress",
      data:"orderId="+_this.state.orderid+"&addressId="+_this.state.addressId,//1078
      dataType:"json",
      async: false,
      error: function(request) {
      },
      success: function(data) {
        if(data.success)
        {
            this.setState({
                adressconfirm:!this.state.adressconfirm,
            })

        }
      }
    });


        this.setState({
            adressconfirm:!this.state.adressconfirm,
        })
    }

 render() {
    const _state=this.state;
    const {order,user}=this.state;
    const addressList=this.state.user;
        return (
        <div>
         <div id="head" style={{width:"100%"}}>
         <NavBar
        mode="light"
        style={{ color:"white", background:"rgb(255, 57, 57)"}}
        icon={<Icon type="left" onClick={()=>{window.history.back()}} />}
        onLeftClick={() => console.log('onLeftClick')}>订单详情
        </NavBar>
        </div>
        <div style={{height:"5rem",width:"100%",textAlign:"center"}}>
        {
            _state.order.orderState===0&&_state.order.payState===0&&"未付款"
        }
        {
            _state.order.orderState===1&&_state.order.payState===9&&"待发货"
        }
        {
            _state.order.orderState===4&&_state.order.payState===9&&"已发货"
        }
        {
            _state.order.orderState===2&&_state.order.payState===9&&"订单已完成"
        }
        {
            _state.order.orderState===3&&_state.order.payState===0&&"订单失败"
        }
        {
            _state.order.orderState===3&&_state.order.payState===9&&"退单成功"
        }
        </div>
        <div style={{width:"100%",height:"5rem",background:"#f6f1f1",color:"#666666",paddingTop:"1rem"}} onClick={this.chooseAdress.bind(this)}>
            <div style={{float:"left",display:"inline-block",width:"10%",lineHeight:"4rem",textAlign:"center"}}>

            <div className="iconfont">&#xe635;</div>
            </div>
            <div style={{float:"left",display:"inline-block",width:"90%",height:"100%"}}>
            <div >


            { this.state.isaddress==false?<div style={{width:"55%",display:"inline-block",lineHeight:"4rem",textAlign:"center",height:"4rem"}}
            onClick={this.AddAdress.bind(this)}>去添加收货地址
            {_state.order.orderState===0&&_state.order.payState===0&&<div className="iconfont" style={{float:"right",textAlign:"right"}}>
            &#xe618;</div>}</div>
            :
            <div>
            <div style={{width:"55%",display:"inline-block",height:"2rem"}}>收货人：{addressList.consignee} </div>
            <div style={{width:"40%",display:"inline-block",height:"2rem",textAlign:"right",marginRight:"5%",fontSize:"1.1rem"}}>
            {addressList.phone}</div>

            <div style={{width:"100%",display:"inline-block",height:"2rem"}} >
            收货地址：{addressList.country} {addressList.province} {addressList.city} {addressList.district} {addressList.address}

               { _state.order.orderState===0&&_state.order.payState===0&&<div className="iconfont" style={{float:"right",textAlign:"right"}}>&#xe618;</div>}

             </div>
             </div>
            }

            </div>

            </div>
        </div>
        <div style={{clear:"both"}}>
         <div style={{clear:"both"}}></div>
            <div style={this.state.adressconfirm==false?{width:"100%",hright:"3rem",textAlign:"center",background:"white",
            borderTop:"2px solid gray",fontSize:"1.5rem",lineHeight:"3rem",borderBottom:"2px solid gray","border-radius":"30px"}
            :
            {width:"100%",hright:"3rem",lineHeight:"3rem",textAlign:"center",background:"gray",borderTop:"2px solid black",fontSize:"1.5rem",
            borderBottom:"2px solid black","border-radius":"30px"}} onClick={this.state.adressconfirm==false?this.adressconfirm.bind(this):console.log("已确认收货地址")}>
            {this.state.adressconfirm==false?"请确认收货地址":"已确认收货地址"}
            </div>
        <WhiteSpace />
        <WhiteSpace/>
        <WhiteSpace/>
        </div>

        <Orderdetailsshop product={_state.order}></Orderdetailsshop>

        <div style={{width:"100%",borderTop:"1px solid #eeeeee",fontSize:"1.5rem",textAlign:"center",height:"2rem",background:"white"}}>商家信息</div>

        <div>
         <WhiteSpace/>
        <WhiteSpace/>
        </div>

            <div style={{background:"white",color:"#666666",fontSize:"12px"}}>
            <p style={{paddingLeft:"0.8rem"}}>订单号:{_state.order.orderCode}</p>
            <p style={{paddingLeft:"0.8rem"}}>同台交易号:{_state.order.orderId}</p>
            <p style={{paddingLeft:"0.8rem"}}>创建时间:{_state.order.createTime}</p>
            </div>


        <div style={{lineHeight:"3rem",height:"3rem"}}>
        <WhiteSpace/>
        <WhiteSpace/>
        </div>

        <div style={{width:"100%",background:"#FEFEFE",color:"black",position:"fixed",bottom:"0px",height:"3rem",lineHeight:"3rem",
            padding:"0",fontSize:"10px" }}>
            {
                _state.order.orderState==0&& _state.order.payState==0&&
                <div style={{width:"100%",height:"2rem",clear:"both", padding: "0.5rem",fontSize:"1rem", borderTop:"2px solid #eeeeee",textAlign:"right",lineHeight:"2rem"}}>
                <span style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                padding:"0.15rem",marginRight:"1rem"}}>删除订单</span>
                <span style={this.state.adressconfirm==false?{width:"6rem",border:"1px solid gray",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                paddingLeft:"0.5rem",paddingRight:"0.5rem",marginRight:"1rem",color:"gray"}:
                {width:"6rem",border:"1px solid red",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                paddingLeft:"0.5rem",paddingRight:"0.5rem",marginRight:"1rem",color:"red"}}
                onClick={this.state.adressconfirm==false?console.log("请先确认地址"):this.topay.bind(this)}>去付款</span>
                </div>
            }

            {
                _state.order.orderState==1&&  _state.order.payState==9&&
                <div style={{width:"100%",height:"2rem",clear:"both", padding: "0.5rem",fontSize:"1rem", borderTop:"2px solid #eeeeee",textAlign:"right",lineHeight:"2rem"}}>
                <span style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                paddingLeft:"0.5rem",paddingRight:"0.5rem",marginRight:"1rem"}}>退货</span>
                <span style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                paddingLeft:"0.5rem",paddingRight:"0.5rem",marginRight:"1rem"}}>催单</span>
                </div>
            }

            {
                _state.order.orderState==4&& _state.order.payState==9&&
                <div style={{width:"100%",height:"2rem",clear:"both", padding: "0.5rem",fontSize:"1rem", borderTop:"2px solid #eeeeee",textAlign:"right",lineHeight:"2rem"}}>
                <a href="#logistics" style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                padding:"0.15rem",marginRight:"1rem"}}>查看物流</a>
                <span style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                paddingLeft:"0.5rem",paddingRight:"0.5rem",marginRight:"1rem"}}>退货</span>
                <span style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                padding:"0.15rem",marginRight:"1rem"}}>确认收货</span>
                </div>
            }

            {
                _state.order.orderState==2&& _state.order.payState==9&&
                <div style={{width:"100%",height:"2rem",clear:"both", padding: "0.5rem",fontSize:"1rem", borderTop:"2px solid #eeeeee",textAlign:"right",lineHeight:"2rem"}}>
                <span style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                padding:"0.15rem",marginRight:"1rem"}}>删除订单</span>
                <span href={'#logistics'} style={{width:"6rem",border:"1px solid black",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                padding:"0.15rem",marginRight:"1rem"}}>查看物流</span>
                <span style={{width:"6rem",border:"1px solid red",height:"2rem",lineHeight:"2rem","border-radius":"30px",textAlign:"center",
                paddingLeft:"0.5rem",paddingRight:"0.5rem",marginRight:"1rem",color:"red"}}>评价</span>
                </div>
            }
        </div>

        </div>
        )
    }


}