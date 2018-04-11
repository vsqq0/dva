import React, { Component } from 'react';
import { message, Table, Button, Popconfirm, Layout, Breadcrumb } from 'antd'; // , Upload, Modal, Divider

import './index.less';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import { get, del } from '../../utils/req'; // , post, put, del
import $ from '../../utils/help';

const { Content } = Layout;

class App extends Component {
  state = {
    data: [],
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
  };

  async componentDidMount() {
    if ($.getCookie('category_id') !== '') {
      await this.categoriesReload();
    }
  }

  categoriesReload = async () => {
    let data = await get('categories/' + $.getCookie('category_id'));
    this.setState({ data: $.setKeyById(data.data.data).reverse() });
  };

  start = async () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    //发送delete请求删除数据
    await del('/cate_details/' + this.state.selectedRowKeys);
    this.deleteOneData(this.state.selectedRowKeys[0]);
    console.log(this.state.selectedRowKeys);

    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  toAddDetail = () => {
    window.location.hash = 'detail';
  };

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

  deleteDetail = async id => {
    this.setState({ loading: true });
    await del('cate_details/' + id);
    await this.categoriesReload();
    message.success('删除成功');
    this.setState({ loading: false });
  };

  render() {
    const columns = [
      {
        title: '标题一',
        dataIndex: 'title' //对应数据的name
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a
              onClick={
                (this.update = () => {
                  window.location.href = '#/detail?detailId=' + record.id;
                })
              }
            >
              修改
            </a>
            <span> | </span>
            <a onClick={this.deleteDetail.bind(this, record.id)}>删除</a>
          </span>
        )
      }
    ];

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
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
            <div>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={this.toAddDetail}>
                  新增
                </Button>
                <Button
                  type="primary"
                  disabled={!hasSelected}
                  loading={loading}
                >
                  <Popconfirm
                    title="确认删除这些数据吗?"
                    onConfirm={this.start}
                    okText="删除"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </Popconfirm>
                </Button>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `已选中 ${selectedRowKeys.length} 项` : ''}
                </span>
              </div>
              <Table
                loading={this.state.loading}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.data}
              />
            </div>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
