import React, { Component } from 'react';
import { Layout, Breadcrumb, Input, Divider } from 'antd'; // , Upload, Modal
import './index.less'
import PicturesWall from "./pic.js";
import { get } from '../../utils/req'; // , post, put, del
import LeftMenu from '../../components/menu';
import Head from '../../components/head';

const { Content} = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    a:1
  };


  async componentDidMount() {
    // var b = await post('categories', { name: 'lion', parent_id: '0' });
    // console.log(b);
    var a = await get('categories');
    console.log(a.data);
  }

  render() {
    return (
      <div>
        <Layout>
          <Head/>
        <Layout>
        <LeftMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item><a href="">Home</a></Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <div className="example-input" >
                <Input placeholder="标题一" style={{ width: 300}}/>
                 <Divider />
                <Input placeholder="标题二" style={{ width: 300}}/>
                 <Divider />
                 <PicturesWall/>
                 <Divider />
                 <TextArea rows={4} style={{ width:400}} />
                 <Divider />
                 <Input placeholder="外链接" style={{ width: 300}}/>
                 </div>
            </Content>
        </Layout>
      </Layout>
  </Layout>
  </div>
    );
  }
}

export default App;
