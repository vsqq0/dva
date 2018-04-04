import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Input, Divider } from 'antd'; // , Upload, Modal
import './index.less';
import PicturesWall from './pic.js';
import LeftMenu from './menu';
import { get } from '../../utils/req'; // , post, put, del

// const { SubMenu } = Menu;
const { Header, Content } = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    a: 1
  };

  async componentDidMount() {
    var a = await get('categories');
    console.log(a);
    // var b = await post('categories', { name: 'lion', parent_id: '0' });
    // console.log(b);
  }

  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <LeftMenu />
            <Layout style={{ padding: '0 24px 24px' }}>
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
                  <Input placeholder="标题一" style={{ width: 300 }} />
                  <Divider />
                  <Input placeholder="标题二" style={{ width: 300 }} />
                  <Divider />
                  <PicturesWall />
                  <Divider />
                  <TextArea rows={4} style={{ width: 400 }} />
                  <Divider />
                  <Input placeholder="外链接" style={{ width: 300 }} />
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
