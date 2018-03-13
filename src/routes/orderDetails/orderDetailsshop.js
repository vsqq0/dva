import React, { Component } from 'react';
import { Tabs, WhiteSpace,Badge,NavBar,Icon,Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import DetailCarousel from './detailCarousel.js';

export default class OrderDetails extends Component{
    state={
    product:[],
    s:"",
    message:"",
}

componentDidMount() {
    this.setState({product:this.props.product});

}


     render() {
        return(
            <div style={{clear:"both",background:"white"}}>

      <div style={{width:"100%",height:"2.5rem"}}>
      <div style={{width:"75%",display:"inline-block",paddingTop:"0.625rem"}}>（图片）商店名</div>
      <div style={{width:"23%",display:"inline-block",paddingTop:"0.625rem",textAlign:"right",color:"red",fontSize:"1rem"}}>
      {
        this.state.product.orderState===0&&this.state.product.payState===0&&"未付款"
        }{
            this.state.product.orderState===1&&this.state.product.payState===9&&"待发货"
        }{
            this.state.product.orderState===4&&this.state.product.payState===9&&"已发货"

      }
        {this.state.product.orderState===2&&this.state.product.payState===9&&"订单已完成"}
      {
         this.state.product.orderState===3&&this.state.product.payState===0&&"订单失败"
      }
      {
         this.state.product.orderState===3&&this.state.product.payState===9&&"退单成功"
      }</div>
      </div>


      <div style={{width:"100%",height:"50%",float:"left",background:"#DDDDDD",marginTop:"0.3rem",fontSize:"10px",alignitems:"center"}}>
      <div style={{clear:"both"}}>
                     <WhiteSpace  />
                </div>
        <div style={{float:"left",display:"inline-block" ,width:"30%",height:"100%"}}>
            <img style={{height:"5rem",width:"5rem",paddingBottom:"0.8rem",paddingLeft:"0.8rem",paddingRight:"0.8rem",paddingTop:"0.2rem"}} src={this.state.product.img}/>
        </div>
        <div style={{float:"left",display:"inline-block" ,width:"60%",height:"100%",}}>
            <div style={{width:"100%",height:"2rem",fontSize:"0.9rem",overflow:"hidden"}}>{this.state.product.orderName}</div>

        </div>
        <div style={{float:"left",display:"inline-block" ,width:"10%",height:"100%"}}>
            <div style={{width:"100%",height:"3.5rem",fontSize:"0.8rem"}}>￥{this.state.product.price}</div>
            <div style={{display:"inline-block",color:"gray",width:"50%",textAlign:"right"}}>X{this.state.product.orderNumber}
            </div>


        </div>
    </div>
    <div style={{width:"95%",height:"2rem",clear:"both",borderTop:"2px solid #eeeeee",textAlign:"right",lineHeight:"2rem"}}>
    共{this.state.product.orderNumber}件商品    合计￥{this.state.product.orderAmount}元
    </div>
    </div>
        )
     }
}