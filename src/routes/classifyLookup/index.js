import React, { Component } from 'react';
import {Grid,WhiteSpace} from 'antd-mobile';
import { Link } from 'react-router-dom';
import ClassifyLookuphead from './classsifyLookuphead.js';
import Head from '../../components/indexHead';
import $ from 'jquery';

class classifyLookup extends Component {

    state = {
        goodslist:[],
        cateid:0,
    }

    componentWillMount() {
        this.state.cateid=window.location.href.split("cateid=")[1];
        let _this=this;
        $.ajax({
            type:"POST",
            url:"searchGoods",
            data:"cateId="+window.location.href.split("cateid=")[1]+"&type=0",
            dataType:"text",
            async: false,
            error: function(request) {
                alert("系统繁忙，请稍后再试!");
                return false;
            },
            success: function(data) {
                var jsonData=eval("("+data+")");

                if(true === jsonData.success) {
                    jsonData = jsonData.data;

                    for(var i in jsonData){
                        _this.state.goodslist.push({
                            icon:jsonData[i].goodsImg,
                            text:jsonData[i].goodsName,
                            price:jsonData[i].originalPrice,
                            id:jsonData[i].goodsId,
                            orderNum:jsonData[i].orderNum,
                        });
                    }
                }
            }
        });

    }

    jump=(id)=>{
       window.location.href="#/details/goodsid="+id;
    }

    setUplist=(evl)=>{
         this.setState({
            goodslist:evl,
    });
    }


  render() {
    return (
      <div className="App">
      <div><ClassifyLookuphead setUplist={this.setUplist.bind(this)} name={"分类查询"}></ClassifyLookuphead></div>
      <WhiteSpace/>
      <WhiteSpace/>
      <WhiteSpace/>
       <WhiteSpace/>
      <WhiteSpace/>
       <WhiteSpace/>
      <WhiteSpace/>
        <Grid data={this.state.goodslist}
        onClick={_el => this.jump(_el.id)}
        columnNum={2}
        square={false}
        renderItem={dataItem => (
        <div style={{ padding: '1px' }} >
          <img src={dataItem.icon} style={{ width: '95%', height: '80%' }} alt="" />
          <div style={{ color: '#888', fontSize: '18px', marginTop: '10px' }}>
            <div style={{float:"left"}}>{dataItem.text}</div>
            <div style={{ float:"left", color:"red"}}>￥{dataItem.price}</div>
            <div style={{width:"100%",textAlign:"right",color:"gray"}}> 销量:{dataItem.orderNum}</div>
          </div>
        </div>
      )}/>
      </div>
    );
  }
}

export default classifyLookup;
