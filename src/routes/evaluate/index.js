import React, { Component } from 'react';
import {TextareaItem , SearchBar,Button, Checkbox, Toast, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import { createForm } from 'rc-form';
import Head from '../../components/indexHead.js';
import Help from "../../utils/help.js";
const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
class EvaluateWrapper extends Component {

  state = {
    check:[{name:'差评'},{name:'好评'}],
    checked:1,
  }

  componentDidMount() {

  }

  Check=(i)=>{
    this.setState({checked:i});
  }

  hashUrl=(key)=>{
    return window.location.hash.split(key)[1].split("/")[0].split("=")[1];
  }

  handleClick=()=>{
    this.props.form.validateFields((error, value) => {
      $.ajax({
        type:"post",
        url:"leavingMessage",
        data:"key="+Help.getCookie("key")+"&token="+Help.getCookie("token")+"&goodsId="+this.hashUrl("goodsId")+"&message="+value.message+"&orderId="+this.hashUrl("orderId")+"&state="+this.state.checked,
        dataType:"json",
        async: false,
        error: function(request) {
          Toast.info("系统繁忙，请稍后再试!");
          return false;
        },
        success: function(data) {
          Help.setToken(data.key, data.token);
          Toast.info("设置成功",1);
        }
      });
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Head rightContent={<a onClick={this.handleClick} style={{color:"white"}}>发布</a>} icon={<div onClick={()=>{window.history.back()}} style={{fontSize: '1.5rem',marginTop: '-0.5rem'}} className="iconfont">&#xe631;</div>} title={<div style={{fontSize: '1rem',color:"white"}}>评价</div>}></Head>
        <List>
          {
            this.state.check.map((item,i) => {
              let checked = i == this.state.checked;
              return(
                <CheckboxItem key={i} checked={checked} onChange={this.Check.bind(this,i)}>
                  {item.name}
                </CheckboxItem>
              )
            })
          }
          <TextareaItem
            {...getFieldProps('message', {
              initialValue: '',
            })}
            placeholder="宝贝满足你的期待吗？说说他的优点和美中不足的地方吧"
            rows={8}
            count={250}
          />
        </List>
      </div>
    );
  }
}
const Evaluate = createForm()(EvaluateWrapper);
export default Evaluate;
