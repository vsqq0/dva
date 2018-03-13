import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import PropTypes from "prop-types";
// import help from '../help';

class Foot extends Component {
  static propTypes = {
    selectColor: PropTypes.string //选中时原始颜色 rgb(230, 0, 18)
  };
  state = {
    selectedTab: this.props.selectedTab || "1", //string number
    hidden: false,
    fullScreen: false
  };

  href = url => {
    window.location.href = url;
  };

  render() {
    //黄色"#ffd02d" 红色"rgb(255, 15, 15)"
    const color = "#5D656B"; //文字颜色
    let selectColor = this.props.selectColor || "rgb(230, 0, 18)";
    const backgroundColor = "white"; //背景颜色
    const iconfont = "1.2rem"; //icon大小
    return <div>
        <div style={{ height: "50px" }} />
        <div style={{ width: "100%", position: "fixed", bottom: 0, zIndex: "999" }}>
          <div>
            <TabBar unselectedTintColor={color} tintColor={selectColor} barTintColor={backgroundColor} hidden={this.state.hidden}>
              <TabBar.Item title="首页" key="1" onPress={this.href.bind(this, "#")} icon={<div className="iconfont" style={{ fontSize: iconfont, color: color, width: "22px", height: "22px" }}>
                    &#xe607;
                  </div>} selectedIcon={<div className="iconfont" style={{ fontSize: iconfont, color: selectColor, width: "22px", height: "22px" }}>
                    &#xe607;
                  </div>} selected={window.location.hash == "#/"} data-seed="logId" />
              <TabBar.Item onPress={this.href.bind(this, "#/supplierCharts")} icon={<div className="iconfont" style={{ fontSize: iconfont, color: color, width: "22px", height: "22px" }}>
                    &#xe775;
                  </div>} selectedIcon={<div className="iconfont" style={{ fontSize: iconfont, color: selectColor, width: "22px", height: "22px" }}>
                    &#xe775;
                  </div>} title="排行榜" key="2" selected={window.location.hash == "#/supplierCharts"} data-seed="logId1" />
              <TabBar.Item onPress={this.href.bind(this, "#/Cshop")} icon={<div className="iconfont" style={{ fontSize: iconfont, color: color, width: "22px", height: "22px" }}>
                    &#xe624;
                  </div>} selectedIcon={<div className="iconfont" style={{ fontSize: iconfont, color: selectColor, width: "22px", height: "22px" }}>
                    &#xe624;
                  </div>} title="我的C店" key="3" selected={window.location.hash == "#/Cshop"} />
              <TabBar.Item onPress={this.href.bind(this, "#/cart")} icon={<div className="iconfont" style={{ fontSize: iconfont, color: color, width: "22px", height: "22px" }}>
                    &#xe606;
                  </div>} selectedIcon={<div className="iconfont" style={{ fontSize: iconfont, color: selectColor, width: "22px", height: "22px" }}>
                    &#xe606;
                  </div>} title="购物车" key="4" selected={window.location.hash == "#/cart"} />
              <TabBar.Item onPress={this.href.bind(this, "#/persional")} icon={<div className="iconfont" style={{ fontSize: iconfont, color: color, width: "22px", height: "22px" }}>
                    &#xe605;
                  </div>} selectedIcon={<div className="iconfont" style={{ fontSize: iconfont, color: selectColor, width: "22px", height: "22px" }}>
                    &#xe605;
                  </div>} title="我的同台" key="5" selected={window.location.hash == "#/persional"} />
            </TabBar>
          </div>
        </div>
      </div>;
  }
}

export default Foot;
