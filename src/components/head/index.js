import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
// import { get } from '../utils/req';
// import $ from '../utils/help';

const { Header } = Layout;
// const { SubMenu } = Menu;

class App extends Component {
  state = {};

  async componentDidMount() {}

  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item>返回</Menu.Item>
          <Menu.Item key="2">消息管理</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default App;
