import React, {Component} from 'react';
import {NavBar, Icon, Tabs, WhiteSpace, Badge} from 'antd-mobile';

class IndexTabs extends Component {

  state = {
    page: this.props.page
  }

  toChang = (index) => {
    if (index == 0) {
      window.location.href = "#/classify";
    }
    if (index == 1) {
      window.location.href = "#/";
    }
  }
  render() {
    const tabs2 = [
      {
        title: <Badge>
          分类
        </Badge>,
        sub: "0"
      }, {
        title: <Badge>
          品牌
        </Badge>,
        sub: "1"
      }, {
        title: <Badge>
          排行榜
        </Badge>,
        sub: "2"
      }, {
        title: <Badge>
          个人推荐</Badge>,
        sub: "3"
      }
    ];

    return (
      <Tabs
        tabs={tabs2}
        tabBarActiveTextColor="rgb(247, 255, 19)"
        tabBarInactiveTextColor="white"
        tabBarBackgroundColor={"rgb(255, 57, 57)"}
        tabBarUnderlineStyle={{
        border: '1px #ff7e37 solid'
      }}
        initialPage={this.state.page}
        tabBarTextStyle={{
        fontSize: '13px'
      }}
        onChange=
        { (tab, index) => { console.log('onChange', index, tab); } }
        onTabClick=
        { (tab, index) => { console.log('onTabClick', index, tab); this.toChang(index) } }></Tabs>
    );
  }
}

export default IndexTabs;