import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd'; // , Upload, Modal, Divider
import './index.less';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import TableList from './table.js';
import { get } from '../../utils/req'; // , post, put, del
import $ from '../../utils/help';

const { Content } = Layout;

class App extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    if ($.getCookie('category_id') !== '') {
      let data = await get('categories/' + $.getCookie('category_id'));
      this.setState({ data: $.setKeyById(data.data.data) });
    }
  }
  getCateData = data => {
    // console.log(this.state, data);
    this.setState({ data: data });
  };
  render() {
    return (
      <div>
        <Head />

        <LeftMenu getCateData={this.getCateData} />
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
