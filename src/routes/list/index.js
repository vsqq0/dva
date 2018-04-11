import React, { Component } from 'react';
import { message, Table, Button, Popconfirm, Layout } from 'antd'; // , Upload, Modal, Divider

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
    loading: false,
    categoryName: $.getCookie('categoryName'),
    selectId: $.getCookie('selectId')
  };

  async componentDidMount() {
    if ($.getCookie('category_id') !== '') {
      await this.categoriesReload();
    }
  }

  categoriesReload = async () => {
    let data = await get('/categories/' + $.getCookie('category_id'));
    console.log(data);
    this.setState({ data: $.setKeyById(data.data.data).reverse() });
  };

  delAll = async e => {
    this.setState({ loading: true });
    //发送delete请求删除数据
    await this.state.selectedRowKeys.map(async id => {
      await del('/cate_details/' + id);
    });
    this.setState({
      selectedRowKeys: [],
      loading: false
    });
    message.success('删除成功');
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  toAddDetail = () => {
    window.location.hash = 'detail';
  };

  getCateData = (data, record) => {
    this.setState({
      data: data.reverse()
    });
  };

  deleteDetail = async id => {
    this.setState({ loading: true });
    await del('/cate_details/' + id);
    await this.categoriesReload();
    message.success('删除成功');
    this.setState({ loading: false });
  };

  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '副标题',
        dataIndex: 'subtitle'
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
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange
    // };
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
                  style={{ display: 'none' }}
                  type="primary"
                  disabled={!hasSelected}
                  loading={loading}
                >
                  <Popconfirm
                    title="确认删除这些数据吗?"
                    onConfirm={this.delAll.bind(this)}
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
                // rowSelection={rowSelection}
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
