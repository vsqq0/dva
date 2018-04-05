import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Layout, Breadcrumb} from 'antd'; // , Upload, Modal, Divider 
import './index.less';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import TableList from './table.js'
// import { get } from '../../utils/req'; // , post, put, del

// const { SubMenu } = Menu;
const { Content } = Layout;
//const { TextArea } = Input;

class App extends Component {
  state = {
    a: 1
  };

  async componentDidMount() {
    // var a = await get('categories');
    // console.log(a);
    // var b = await post('categories', { name: 'lion', parent_id: '0' });
    // console.log(b);
  }

  render() {
    return (
      <div>
        <Layout>
          <Head />

          <Layout>
            <LeftMenu />
            <Layout style={{ padding: '0 24px 24px' }}>
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
                <TableList/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
