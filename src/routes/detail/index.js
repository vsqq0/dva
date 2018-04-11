import React, { Component } from 'react';
import { message, Button, Form, Layout, Breadcrumb, Input } from 'antd'; // , Upload, Modal
// import ReactDOM from 'react-dom';
import './index.less';
// import PicturesWall from './pic.js';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import $ from '../../utils/help';
import { post, get, put, del } from '../../utils/req'; // , post, put, del

const FormItem = Form.Item;
const { Content } = Layout;
const { TextArea } = Input;

class App extends Component {
  state = {
    data: [],
    file: {},
    pics: [],
    selectId: $.getCookie('selectId'),
    id: window.location.href.split('detailId=')[1]
  };

  async componentDidMount() {
    //判断是新增还是修改
    if (this.state.id) {
      await this.cateDetailReload();
    }
  }

  cateDetailReload = async () => {
    var data = await get('cate_details/' + this.state.id);
    console.log(data);
    this.setState({ pics: data.data.pics, data: $.filterNull(data.data.data) });
  };

  addSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let cate_detail = await post('cate_details', {
          category_id: $.getCookie('category_id'),
          ...values
        });
        let config = {
          headers: { 'Content-Type': false, 'Process-Data': false }
        };
        var form = new FormData();
        form.append('cate_detail_id', cate_detail.data.data.id);
        form.append('pic', this.state.file);
        await post('pics', form, config);
        message.success('添加成功');
        window.location.hash = 'list';
      }
    });
  };

  updateSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await put('cate_details/' + this.state.id, $.filterNull(values));
        let config = {
          headers: { 'Content-Type': false, 'Process-Data': false }
        };
        var form = new FormData();
        form.append('cate_detail_id', this.state.id);
        form.append('pic', this.state.file);
        await post('pics', form, config);
        message.success('修改成功');
        await this.cateDetailReload();
      }
    });
  };

  delPic = async () => {
    await del('pics/' + this.state.pics[0].id);
    this.setState({ pics: [] });
    message.success('删除成功');
  };

  file = e => {
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
                    initialValue: this.state.data.title,
                    rules: [
                      {
                        required: false,
                        message: 'Please input your username!'
                      }
                    ]
                  })(<Input placeholder="标题" style={{ width: 300 }} />)}
                </FormItem>
                副标题：<FormItem>
                  {getFieldDecorator('subtitle', {
                    initialValue: this.state.data.subtitle,
                    rules: [
                      {
                        required: false,
                        message: 'Please input your username!'
                      }
                    ]
                  })(<Input placeholder="副标题" style={{ width: 300 }} />)}
                </FormItem>
                {this.state.pics.length > 0 ? (
                  <div>
                    <img
                      style={{
                        padding: 10,
                        height: '100px',
                        width: '100px'
                      }}
                      src={this.state.pics[0].pic.url}
                      alt={this.state.pics[0].id}
                    />
                    <Button onClick={this.delPic}>删除图片</Button>
                  </div>
                ) : (
                  <div style={{ padding: 10 }}>
                    上传图片： <input type="file" onChange={this.file} />
                  </div>
                )}
                内容：<FormItem style={{ width: '80%' }}>
                  {getFieldDecorator('text', {
                    initialValue: this.state.data.text,
                    rules: [
                      {
                        required: false,
                        message: 'Please input your username!'
                      }
                    ]
                  })(<TextArea rows={4} style={{ width: 400 }} />)}
                </FormItem>
                外链接：
                <FormItem style={{ width: '80%' }}>
                  {getFieldDecorator('link', {
                    initialValue: this.state.data.link,
                    rules: [
                      {
                        required: false,
                        message: 'Please input your username!'
                      }
                    ]
                  })(<Input placeholder="外链接" style={{ width: 300 }} />)}
                </FormItem>
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
