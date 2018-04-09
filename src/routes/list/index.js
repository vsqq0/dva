import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd'; // , Upload, Modal, Divider
import { Upload, message, Button, Icon } from 'antd';

import './index.less';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import TableList from './table.js';
import { get, put, post } from '../../utils/req'; // , post, put, del
import $h from '../../utils/help';
import $ from 'jquery';

const { Content } = Layout;

class App extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    if ($h.getCookie('category_id') !== '') {
      let data = await get('categories/' + $h.getCookie('category_id'));
      this.setState({ data: $h.setKeyById(data.data.data) });
    }
  }
  deleteOneData = id => {
    // todo delete data
    let data = this.state.data.filter((o, i) => {
      if (o.id !== id) {
        return o;
      }
      return false;
    });
    console.log(data);
    this.setState({ data: data });
  };
  getCateData = data => {
    this.setState({ data: data });
  };

  a = e => {
    // e.preventDefault();
    let config = {
      headers: { 'Content-Type': false, 'Process-Data': false }
    };
    // console.log(e, e.target);
    var form = new FormData();
    form.append('names', 12);
    form.append('img', e.target.files[0]);
    console.log(e, e.target, e.target.files[0], 111, form.get('img'));
    // this.ajax('post', '/cate_details', form);
    post('cate_details', form, config);
  };
  render() {
    return (
      <div>
        <Head />
        <Upload
          name="file"
          action="cate_details"
          // headers= {authorization: 'authorization-text'}
        >
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <input type="file" onChange={this.a} />

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
            <TableList
              deleteOneData={this.deleteOneData}
              data={this.state.data}
            />
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
