import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Button, Form, Layout, Breadcrumb, Input, Divider } from 'antd'; // , Upload, Modal
import './index.less';
// import PicturesWall from './pic.js';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import $ from '../../utils/help';
import { post, get } from '../../utils/req'; // , post, put, del
const FormItem = Form.Item;
// const { SubMenu } = Menu;
const { Content } = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    detail_id: '',
    data: [],
    file: {},
    id: window.location.href.split('detailId=')[1]
  };

  async componentDidMount() {
    //判断是新增还是修改
    var id = window.location.href.split('detailId=')[1];
    if ((id !== null) & (id !== '')) {
      this.setState({ detail_id: id });
      var data = (await get('cate_details/' + id)).data.data;
      console.log(data);
      this.setState({ data: data });
    }
  }

  addSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      console.log(values, err);
      if (!err) {
        let cate_detail = await post('cate_details', {
          category_id: $.getCookie('category_id'),
          title: '12',
          text: '12'
        });
        // this.setState({ id: cate_detail.data.data.id });
        console.log(cate_detail.data.data.id);
        let config = {
          headers: { 'Content-Type': false, 'Process-Data': false }
        };
        var form = new FormData();
        form.append('cate_detail_id', cate_detail.data.data.id);
        form.append('pic', this.state.file);
        await post('pics', form, config);
      }
    });
  };

  updateSubmit = () => {
    // let config = {
    //   headers: { 'Content-Type': false, 'Process-Data': false }
    // };
    // var form = new FormData();
    // form.append('category_id', $.getCookie('category_id'));
    // form.append('title', '12');
    // form.append('text', '12');
    // // form.append('img', this.state.file);
    // post('cate_details', form, config);
  };

  file = e => {
    console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Head />
        <LeftMenu />
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
            <Form>
              <div className="example-input">
                <span>标题：</span>
                <FormItem style={{ width: '80%' }}>
                  {getFieldDecorator('title', {
                    rules: [
                      { required: true, message: 'Please input your username!' }
                    ]
                  })(<Input placeholder="标题" style={{ width: 300 }} />)}
                </FormItem>
                副标题：<FormItem>
                  {getFieldDecorator('userName', {
                    rules: [
                      { required: true, message: 'Please input your username!' }
                    ]
                  })(<Input placeholder="副标题" style={{ width: 300 }} />)}
                </FormItem>
                上传图片： <input type="file" onChange={this.file} />
                <FormItem style={{ width: '80%' }}>
                  {getFieldDecorator('text', {
                    rules: [
                      { required: true, message: 'Please input your username!' }
                    ]
                  })(<TextArea rows={4} style={{ width: 400 }} />)}
                </FormItem>
                <Divider />
                <Input
                  placeholder="外链接"
                  style={{ width: 300 }}
                  value={this.state.data.link}
                />
                {this.state.id ? (
                  <Button
                    type="primary"
                    style={{ margin: 10, display: 'block' }}
                    onClick={this.updateSubmit}
                  >
                    修改
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ margin: 10, display: 'block' }}
                    onClick={this.addSubmit}
                  >
                    提交
                  </Button>
                )}
              </div>
            </Form>
          </Content>
        </div>
      </div>
    );
  }
}

const WrapApp = Form.create()(App);
export default WrapApp;
