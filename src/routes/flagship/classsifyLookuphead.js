import React, { Component } from 'react';
import {NavBar, Icon} from 'antd-mobile';
import Head from '../../components/indexHead';
import $ from 'jquery';

class ClassifyLookuphead extends Component {

    state = {
        goodslist:[],
        paixuName:'',
    }

    componentWillMount() {
        this.setState({paixuName:"价格↓",})
    }

    price=()=>{
        if(this.state.paixuName==="价格↓")
        {console.log("价格↓");
        this.setState({
            paixuName:"价格↑",
        });
        let type=2;
        this.props.reload(type,1)
    }

        else
        {console.log("价格↑");
    this.setState({
            paixuName:"价格↓",
        })
    let type=-2;
    this.props.reload(type,1)}

    }

    orderNum=()=>{
        console.log("销量↓")
        let type=1;
        this.props.reload(type,1)
    }

    times=()=>{
        let type=3;
        this.props.reload(type,1)
    }

  render() {
    return <div style={{ width: "100%", position: "fixed", zIndex: "2" }}>
        <Head title="分类查询" />

        <div style={{ width: "100%", background: "white" }}>
          <div style={{ width: "33%", height: "2rem", background: "white", float: "left", textAlign: "center", lineHeight: "2rem" }} onClick={this.price.bind(this)}>
            {this.state.paixuName}
          </div>
          <div style={{ width: "33%", height: "2rem", background: "white", float: "left", textAlign: "center", lineHeight: "2rem" }} onClick={this.orderNum.bind(this)}>
            销量↓
          </div>
          <div style={{ width: "34%", height: "2rem", background: "white", float: "left", textAlign: "center", lineHeight: "2rem" }} onClick={this.times.bind(this)}>
            新品
          </div>
        </div>
      </div>;
  }
}

export default ClassifyLookuphead;
