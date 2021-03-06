import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { del } from '../../utils/req'; // , post, put, del
// import $ from '../../utils/help';
//表格字段
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
        <a
          onClick={() => {
            del('cate_details/' + record.id);
          }}
        >
          删除
        </a>
      </span>
    )
  }
];

class TableList extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
  };
  start = async () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    //发送delete请求删除数据
    await del('/cate_details/' + this.state.selectedRowKeys);
    this.props.deleteOneData(this.state.selectedRowKeys[0]);

    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  toAddDetail = () => {
    window.location.hash = 'detail';
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.toAddDetail}>
            新增
          </Button>
          <Button type="primary" disabled={!hasSelected} loading={loading}>
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.data}
        />
      </div>
    );
  }
}

export default TableList;
