import React, { Component } from 'react';
import { Spin, Popconfirm, message, Layout, Menu, Input } from 'antd';
import './index.less';
import { get, del, post } from '../../utils/req';
import $ from '../../utils/help';

const Search = Input.Search;
const { SubMenu } = Menu;
const { Sider } = Layout;

class App extends Component {
  state = {
    data: [],
    menuKey: 0,
    menuLoading: false,
    selectId: 1,
    kidCateName: ''
  };

  async componentDidMount() {
    await this.cateReload();
  }

  // 读取菜单列表
  cateReload = async () => {
    let categories = await get('categories');
    console.log($.arrayToTree(categories.data.data));
    this.setState({ data: $.arrayToTree(categories.data.data) });
  };

  // 删除菜单分类
  delCate = async id => {
    this.setState({ menuLoading: true });
    await del('/categories/' + id);
    await this.cateReload();
    message.success('删除成功');
    this.setState({ menuLoading: false });
  };

  // 添加总分类
  addCate = async (name, parentId) => {
    this.setState({ menuLoading: true });
    await post('/categories', { name: name, parent_id: parentId || 0 });
    await this.cateReload();
    message.success('添加成功');
    this.setState({ menuLoading: false });
  };


  // 设置子分类名
  setKidCateName = e => {
    const event = e;
    this.setState({ kidCateName: event.target.value });
  };

  menuSelect = e => {
    // console.log(e);
    e.domEvent.stopPropagation();
  };
  // 树结构的菜单列表
  renderMenu = data => {
    return data.map(item => {
      // this.setState({ menuKey: key });
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.id}
            title={
              <div>
                <Popconfirm
                  title={
                    <span>
                      <span> 添加{item.name}的子分类：</span>
                      <Input
                        onBlur={this.setKidCateName.bind(this)}
                        style={{ display: 'block' }}
                        placeholder="请填写子分类的名称"
                      />
                    </span>
                  }
                  onConfirm={this.addCate.bind(
                    this,
                    this.state.kidCateName,
                    item.id
                  )}
                  okText="是"
                  cancelText="否"
                >
                  <span style={{ marginRight: 5 }}>+</span>
                </Popconfirm>
                <span>{item.name || '未命名'}</span>
                <Popconfirm
                  title="确认要删除吗?"
                  onConfirm={this.delCate.bind(this, item.id)}
                  okText="是"
                  cancelText="否"
                >
                  <span style={{ float: 'right' }}>X</span>
                </Popconfirm>
              </div>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item
          // style={{ position: 'relative', overflow: 'visible' }}
          key={item.id}
        >
          <div>
            <span>{item.name || '未命名'}</span>
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <Popconfirm
                title={
                  <span>
                    <span> 添加{item.name}的子分类：</span>
                    <Input
                      onBlur={this.setKidCateName.bind(this)}
                      style={{ display: 'block' }}
                      placeholder="请填写子分类的名称"
                    />
                  </span>
                }
                onConfirm={this.addCate.bind(
                  this,
                  this.state.kidCateName,
                  item.id
                )}
                okText="是"
                cancelText="否"
              >
                <span style={{ marginRight: 5 }}>+</span>
              </Popconfirm>
              <Popconfirm
                title="确认要删除吗?"
                onConfirm={this.delCate.bind(this, item.id)}
                okText="是"
                cancelText="否"
              >
                <span>X</span>
              </Popconfirm>
            </div>
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
            onSelect={this.menuSelect}
            mode="inline"
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
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
