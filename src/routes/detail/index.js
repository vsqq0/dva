import React, { Component } from 'react';
import { Layout, Breadcrumb, Input, Divider,Button } from 'antd'; // , Upload, Modal
import './index.less';
import PicturesWall from './pic.js';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import $ from '../../utils/help';
import { post,get,put } from '../../utils/req'; // , post, put, del


const { Content } = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    detail_id:'',
    data:[],
    id:''
  };

  async componentDidMount() {
    //判断是新增还是修改
    var id=window.location.href.split("detailId=")[1];
    if(id !== null & id!==''){
      this.setState({id:id});
      this.setState({detail_id:id});
      var data=(await get('cate_details/'+id)).data.data;
      this.setState({data:data});
    }
  }

  submit = () => {
    console.log(this.state.data);
    //修改操作
    if(this.state.id !==null &this.state.id !== ''){
     put('cate_details',{
      category_id:this.state.id,
      title: this.state.data.title,
      text: this.state.data.text,
      img: this.state.data.img
     })
    }
    //增加操作
    else{
      post('cate_details', {
        category_id: $.getCookie('category_id'),
        title: this.state.data.title,
        text: this.state.data.text,
        img: this.state.data.img
      });
    }
    
    
  };
  handleChange=(event,text)=>{
    console.log(text);
    let data = Object.assign({}, this.state.data, { [text]: event.target.value })
    this.setState({
    data: data
    })
    console.log(this.state.data);
  }
  render() {
    return (
      <div>
        <Head />
        <LeftMenu />
        <div
          style={{
            overflow: 'hidden',
            background: 'gainsboro',
            padding: '0 24px 24px'
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <div className="example-input">
              <Input placeholder="标题一" style={{ width: 300 }} value={this.state.data.title} onChange={(e) => this.handleChange(e,'title')}/>
              <Divider />
              <Input placeholder="标题二" style={{ width: 300 }} value={this.state.data.title2} onChange={(e) => this.handleChange(e,'title2')}/>
              <Divider />
              <PicturesWall />
              <Divider />
              <TextArea rows={4} style={{ width: 400 }} value={this.state.data.text} onChange={(e) => this.handleChange(e,'text')}/>
              <Divider />
              <Input placeholder="外链接" style={{ width: 300 }} value={this.state.data.link} onChange={(e) => this.handleChange(e,'link')}/>
              <Button onClick={this.submit} style={{background:'#0997F7',color:'white'}}>提交</Button>
            </div>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
