import { Table, Divider } from 'antd';
//表格字段
const columns = [{
  title: '标题一',
  dataIndex: 'title',
  key: 'title',
  render: text => <a href="#">{text}</a>,
}, {
  title: '标题二',
  dataIndex: 'title2',
  key: 'title2',
  render: text => <a href="#">{text}</a>,
}, {
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Delete</a>
      <Divider type="vertical" />
      <a href="#">Update</a>
    </span>
  ),
}];
//表格数据源，数组
const data = [{
  key: '1',
  title: 'John Brown',
  title2: 32,
  time: 'New York No. 1 Lake Park',
}, {
  key: '2',
  title: 'Jim Green',
  title2: 42,
  time: 'London No. 1 Lake Park',
}, {
  key: '3',
  title: 'Joe Black',
  title2: 32,
  time: 'Sidney No. 1 Lake Park',
}];
