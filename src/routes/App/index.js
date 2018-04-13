import React, { Component } from 'react';
// import { Layout, Breadcrumb, Input, Divider } from 'antd'; // , Upload, Modal
import './index.less';
import LeftMenu from '../../components/menu';
import Head from '../../components/head';
import { connect } from 'dva';

class App extends Component {
  state = {
    a: 1
  };

  async componentDidMount() {
    console.log(this.props);
    this.props.dispatch({
      type: 'example/querySuccess',
      payload: {} // 参数
    });
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Head />
        <LeftMenu />
        <div style={{ overflow: 'hidden', padding: '0 24px 24px' }}>
          das{this.props.example.total}
        </div>
      </div>
    );
  }
}

export default connect(({ example, store }) => {
  return { example, store };
})(App);
