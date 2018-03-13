import React, { Component } from "react";
import { NavBar, Icon, Tabs, WhiteSpace, Badge } from "antd-mobile";
import PropTypes from "prop-types";
import Help from '../utils/help.js';

class IndexHead extends Component {
  static propTypes = {
    title: PropTypes.string,//中间文字
    icon: PropTypes.object, // 左边图标
    rightContent: PropTypes.object, // 右边按钮1
    rightContent1: PropTypes.object, // 从右边数 按钮2
    backgroundColor: PropTypes.string //背景
  };
  state = {};
  render() {
    let rightContent = Help.getCookie("user") == "" || Help.getCookie("user") == "undefined" ? <a key="1" href="#login" style={{ width: "2.5rem", color: "white", fontSize: "1rem" }}>
          登录
        </a> : <a href="#/persional" key="2" style={{ color: "white" }} className="iconfont">
          &#xe605;
        </a>;
    const background = this.props.backgroundColor || "rgb(230, 0, 18)";
    return (
      <div>
        <div style={{ height: "45px" }} />
        <div
          style={{ width: "100%", position: "fixed", top: 0, zIndex: "999" }}
        >
          <NavBar
            style={{ color: "white", background: background }}
            mode="light"
            icon={
              this.props.icon || (
                <div
                  key="0"
                  onClick={() => {
                    window.history.back();
                  }}
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    marginTop: "-0.5rem"
                  }}
                  className="iconfont"
                >
                  &#xe631;
                </div>
              )
            }
            rightContent={[
              this.props.rightContent1 || "",
              this.props.rightContent || rightContent
            ]}
          >
            {
              <div style={{ fontSize: "1rem", color: "white" }}>
                {this.props.title || ""}
              </div>
            }
          </NavBar>
        </div>
      </div>
    );
  }
}

export default IndexHead;
