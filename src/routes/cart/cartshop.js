import React, { Component } from 'react';
import { Tabs, WhiteSpace,Badge,NavBar,Icon,Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import DetailCarousel from './detailCarousel.js';

class Cartshop extends Component {

state={
    product:[],
    s:"",
    message:"",
}

componentWillMount() {
    this. setState({product:this.props.product});
}

onchoose=(ss)=>{
    this.state.product.choose=!ss;
    this.setState({s:"",});
    this.props.chooseproduct(this.state.product.choose,this.state.product.orderid);
}

upnumber=(s)=>{
  if(this.state.product.num<20)
  {
    this.state.product.num=this.state.product.num+1;
    this.state.product.amount=this.state.product.price* this.state.product.num;
    this.props.upnumber(this.state.product.num,1,this.state.product.orderid);
    this.setState({s:"",});
  }
  else {this.setState({message:"一次最多只能买20件"});}
}
downnumber=(s)=>{
  if(this.state.product.num>1)
 {
    this.state.product.num=this.state.product.num-1;
    this.state.product.amount=this.state.product.price* this.state.product.num;
    this.props.upnumber(this.state.product.num,0,this.state.product.orderid);
    this.setState({s:"",});
}
}

deleteproduct=(ss)=>{
 this.props.delect(ss);
 this.state.product.shownow=false;
 this.setState({s:"",});
}

  render() {
    return (
      <div style={this.state.product.shownow==true?{}:{display:"none"}}>
                <div style={{background:"#EEEEEE",clear:"both"}}>
                     <WhiteSpace size="xs" />
                    </div>
      <div style={{clear:"both",backgroundColor:"white",width:"100%",height:"40%",marginTop:"0.3rem",fontSize:"10px",alignitems:"center"}}>
        <div style={{float:"left" ,display:"inline-block",width:"10%",height:"5rem",textAlign:"center" ,"align-items":"center"}}>
            <div style={this.state.product.choose==false?
                {border:"1px solid black",width:"1.3rem",height:"1.3rem","margin-top": "50%","margin-left": "25%" }:
            {border:"1px solid black",width:"1.3rem",height:"1.3rem",background:"black","margin-top": "50%","margin-left": "25%" }}
                      onClick={this.onchoose.bind(this,this.state.product.choose)}>
            </div>
        </div>
        <div style={{float:"left",display:"inline-block" ,width:"25%",height:"100%"}}>
            <img style={{height:"5rem",width:"5rem"}} src={this.state.product.img}/>
        </div>
        <div style={{float:"left",display:"inline-block" ,width:"55%",height:"100%"}}>
            <div style={{width:"100%",height:"30%",fontSize:"0.8rem"}}>{this.state.product.name}</div>
              <div style={{color:"gray",marginTop:"0.3rem" ,fontSize:"0.6rem"}}>
              {
                this.state.product.desc1!==""&&this.state.product.desc1+";"
              }
              {this.state.product.desc2!==""&&this.state.product.desc2!==undefined&&  this.state.product.desc2+";"}
              {this.state.product.desc3!==""&&this.state.product.desc3!==undefined&&  this.state.product.desc3+";"}
              {this.state.product.desc4!==""&&this.state.product.desc4!==undefined&&  this.state.product.desc4+";"}
              </div>
            <div>
              <span style={{display:"inline",color:"red",marginTop:"0.3rem",width:"50%" ,fontSize:"1.5rem"}}>
              ￥{this.state.product.amount}</span>
            </div>
            <div style={{display:"inline"}}>
                数量：<Icon type="down"  onClick={this.downnumber.bind(this)} />
                <span style={{ border:"1px solid " ,fontSize:"0.8rem",width:"40px" ,textAlign:"right" ,display:"inline-block"}} >
                {this.state.product.num}
                </span>
                <Icon type="up" onClick={this.upnumber.bind(this)}/>
            </div>
        </div>
        <div style={{display:"inline-block" ,width:"10%",height:"5rem",alignitems:"center"}}>
                <div style={{color:"gray","margin-top": "50%", "margin-left": "25%"}} onClick={this.deleteproduct.bind(this,this.state.product.orderid)}>删除</div>
        </div>
    </div>
    <div style={{background:"#EEEEEE",clear:"both"}}>
    <WhiteSpace size="xs" />
    </div>
    </div>
    );
  }

}


export default Cartshop;
