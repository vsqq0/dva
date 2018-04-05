import React, { Component } from 'react';
import { Table, Popconfirm, message, Layout, Input } from 'antd';
import './index.less';
import { get, del, post } from '../../utils/req';
import $ from '../../utils/help';

const Search = Input.Search;
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
    let data = categories.data.data.map((o, i) => {
      o.key = o.id;
      return o;
    });
    console.log($.arrayToTree(data), data);
    this.setState({ data: $.arrayToTree(data) });
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

  render() {
    const columns = [
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <a style={{ fontSize: '14px' }}>{text}</a>
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span style={{ fontSize: '12px' }}>
            <Popconfirm
              title={
                <span>
                  <span> 添加{record.name}的子分类：</span>
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
                record.id
              )}
              okText="是"
              cancelText="否"
            >
              <a>添加</a>
            </Popconfirm>
            <span style={{ padding: 3 }}>|</span>
            <Popconfirm
              title="确认要删除吗?"
              onConfirm={this.delCate.bind(this, record.id)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
    return (
      <Sider style={{ background: '#fff' }}>
        <div style={{ padding: 15 }}>
          <Search
            placeholder="添加总分类"
            onSearch={this.addCate}
            enterButton="添加"
          />
        </div>
        <Table
          indentSize={10}
          size="small"
          pagination={false}
          loading={this.state.menuLoading}
          columns={columns}
          // rowSelection={{ type: 'radio' }}
          dataSource={this.state.data}
        />
      </Sider>
    );
  }
}

export default App;