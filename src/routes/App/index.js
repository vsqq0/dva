import React, { Component } from 'react';
import { Layout, Breadcrumb, Input, Divider } from 'antd'; // , Upload, Modal
import './index.less';
import { get } from '../../utils/req'; // , post, put, del
import LeftMenu from '../../components/menu';
import Head from '../../components/head';

const { Content } = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    a: 1
  };

  async componentDidMount() {
    var a = await get('/categories');
    console.log(a.data);
  }

  render() {
    return (
      <div>
        <Head />
        <LeftMenu />
        <div style={{ overflow: 'hidden', padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <a href="">Home</a>
            </Breadcrumb.Item>
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
              <Input placeholder="标题一" style={{ width: 300 }} />
              <Divider />
              <Input placeholder="标题二" style={{ width: 300 }} />
              <Divider />
              <Divider />
              <TextArea rows={4} style={{ width: 400 }} />
              <Divider />
              <Input placeholder="外链接" style={{ width: 300 }} />
            </div>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
