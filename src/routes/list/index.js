import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Layout, Breadcrumb } from 'antd'; // , Upload, Modal, Divider
import './index.less';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import TableList from './table.js';
import { get } from '../../utils/req'; // , post, put, del

// const { SubMenu } = Menu;
const { Content } = Layout;
//const { TextArea } = Input;

class App extends Component {
  state = {
    data:[]
  };

  async componentDidMount() {
    var id=window.location.href.split("?")[1];
    var data=await get('cate_details', { category_id: id });//获取分类详情列表
    this.setState({data:data});
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
            <TableList data={this.state.data} />
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
