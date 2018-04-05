import React, { Component } from 'react';
import { Spin, Popconfirm, message, Layout, Menu, Input } from 'antd';
// import './index.less';
import { get, del, post } from '../utils/req';
import $ from '../utils/help';

const Search = Input.Search;
const { SubMenu } = Menu;
const { Sider } = Layout;

class App extends Component {
  state = {
    data: [],
    menuKey: 0,
    menuLoading: false
  };

  async componentDidMount() {
    await this.cateReload();
  }

  cateReload = async () => {
    var a = await get('categories');
    this.setState({ data: $.arrayToTree(a.data.data) });
  };

  delCate = async id => {
    this.setState({ menuLoading: true });
    await del('/categories/' + id);
    await this.cateReload();
    message.success('删除成功');
    this.setState({ menuLoading: false });
  };

  addCate = async (name, parentId) => {
    this.setState({ menuLoading: true });
    await post('/categories', { name: name, parent_id: parentId || 0 });
    await this.cateReload();
    message.success('添加成功');
    this.setState({ menuLoading: false });
  };


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
            <Popconfirm
              title="确认要删除吗?"
              onConfirm={this.delCate.bind(this, item.id)}
              // onCancel={this.cancel}
              okText="是"
              cancelText="否"
            >
              <span style={{ float: 'right' }}>X</span>
            </Popconfirm>
          </div>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <Sider style={{ background: '#fff' }}>
        <div style={{ padding: 15 }}>
          <Search
            placeholder="添加总分类"
            onSearch={this.addCate}
            enterButton="添加"
          />
        </div>
        <Spin spinning={this.state.menuLoading}>
          <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {this.renderMenu(this.state.data)}
          </Menu>
        </Spin>
      </Sider>
    );
  }
}

export default App;
