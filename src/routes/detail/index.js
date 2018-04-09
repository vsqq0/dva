import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Layout, Breadcrumb, Input, Divider } from 'antd'; // , Upload, Modal
import './index.less';
import PicturesWall from './pic.js';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import $ from '../../utils/help';
import { post,get } from '../../utils/req'; // , post, put, del

// const { SubMenu } = Menu;
const { Content } = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    detail_id:'',
    data:[]
  };

  async componentDidMount() {
    // var a = await get('categories');
    // console.log(a);
    // var b = await post('categories', { name: 'lion', parent_id: '0' });
    // console.log(b);
    //判断是新增还是修改
    var id=window.location.href.split("detailId=")[1];
    if(id !=null & id!=''){
      this.setState({detail_id:id});
      var data=(await get('cate_details/'+id)).data.data;
      this.setState({data:data});
    }
  }

  submit = () => {
    post('cate_details', {
      category_id: $.getCookie('category_id'),
      title: '12',
      text: '321',
      img: '454'
    });
  };

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
              <a onClick={this.submit}>提交</a>

              <Input placeholder="标题一" style={{ width: 300 }} value={this.state.data.title} />
              <Divider />
              <Input placeholder="标题二" style={{ width: 300 }} value={this.state.data.title2}/>
              <Divider />
              <PicturesWall />
              <Divider />
              <TextArea rows={4} style={{ width: 400 }} value={this.state.data.text}/>
              <Divider />
              <Input placeholder="外链接" style={{ width: 300 }} value={this.state.data.link}/>
            </div>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
