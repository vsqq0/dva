import React, { Component } from 'react';
import { Layout, Menu, Input } from 'antd';
import './index.less';
import { get } from '../../utils/req';
import $ from '../../utils/help';

const { SubMenu } = Menu;
const { Sider } = Layout;

class App extends Component {
  state = {
    data: [],
    menuKey: 0
  };

  async componentDidMount() {
    // var b = await post('categories', { name: 'tiger', parent_id: '16' });
    // console.log(b);
    var a = await get('categories');
    console.log(a);
    this.setState({ data: $.arrayToTree(a.data.data) });
  }

  renderMenu = data => {
    return data.map(item => {
      // this.setState({ menuKey: key });
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.id} title={<span>{item.name || '未命名'}</span>}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id}>
          <div>
            <span>{item.name || '未命名'}</span>
            <span style={{ float: 'right' }}>X</span>
          </div>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Sider style={{ background: '#fff' }}>
        <Input placeholder="添加总分类" />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {this.renderMenu(this.state.data)}
        </Menu>
      </Sider>
    );
  }
}

export default App;
