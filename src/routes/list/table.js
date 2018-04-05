import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
//表格字段
const columns = [{
  title: '标题一',
  dataIndex: 'title',//对应数据的name
}, {
  title: '标题二',
  dataIndex: 'title2',
}, {
  title: '操作时间',
  dataIndex: 'time',
}];
//填充表格的数据
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    title: `Edward King ${i}`,
    title2: 32,
    time: `London, Park Lane no. ${i}`,
  });
}

class TableList extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    //发送delete请求删除数据
    console.log(this.state.selectedRowKeys);

    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
        <Button
            type="primary"
            //onClick={ }
          >
            新增
          </Button>
          <Button
            type="primary"
            disabled={!hasSelected}
            loading={loading}
          >
            <Popconfirm title="确认删除这些数据吗?" onConfirm={this.start}  okText="删除" cancelText="取消">
                  <a >删除</a>
            </Popconfirm>
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选中 ${selectedRowKeys.length} 项` : ''}
          </span>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default TableList;