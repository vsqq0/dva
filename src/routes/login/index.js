import React, { Component } from 'react';
import './index.less';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class App extends Component {
  state = {
    a: 1
  };

  async componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        style={{
          margin: '0 auto',
          width: '290px',
          marginTop: '200px',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #efefff'
        }}
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
          <a style={{ fontSize: 12, padding: 10 }}>忘记密码</a>
        </FormItem>
      </Form>
    );
  }
}
const WrapApp = Form.create()(App);
export default WrapApp;
