import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { PullToRefresh, Toast, Flex, WhiteSpace } from 'antd-mobile';
import { Button } from 'antd';
import { get } from '../../utils/req'; // , post, put, del

class App extends Component {
  state = {};

  async componentDidMount() {
    var a = await get('categories');
    console.log(a);
    // var b = await post('categories', { name: 'lion', parent_id: '0' });
    // console.log(b);
  }

  render() {
    return (
      <div className="App">
        <Button type="primary">首页</Button>
      </div>
    );
  }
}

export default App;
