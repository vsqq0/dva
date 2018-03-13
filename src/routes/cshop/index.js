import React, { Component } from "react";
import { WhiteSpace, Flex, PullToRefresh, Toast } from "antd-mobile";
import Head from "../../components/indexHead";
import Foot from "../../components/foot";

import help from "../../utils/help.js";

class Page extends Component {
  state = {
    refreshing: false,
    data: [],
    maxpage: 0,
    page: 0,
    pageSize: 0
  };

  async componentWillMount() {
    Toast.loading("正在拼命加载中", 10);
    await this.goodsReload();
    Toast.hide();
  }

  goodsReload = async () => {
      let data = await help.get("CStore!findByPage?&page=" + 0);
      help.setToken(data.key, data.token);
      this.setState({
        data: data.data.pageDate[0].list,
        maxpage: data.data.maxpage,
        page: data.data.page,
        pageSize: data.data.pageSize
      });
      console.log(data);
      
  };

  render() {//
    return (
      <div>
        <Head title="我的C店" />
        <PullToRefresh
          distanceToRefresh={40}
          style={{
            height: document.documentElement.clientHeight - 95,
            overflow: "auto"
          }}
          direction={"up"}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
        >
          <div style={{ background: "white", clear: "both" }}>
            {this.state.data.map((index, i) => {
              return (
                <a
                  href={"#details/goodsid="+index.goodsId}  
                  key={i}
                  style={{
                    display: "block",
                    margin: "1%",
                    background: "white",
                    float: "left",
                    width: "48%"
                  }}
                >
                  <img
                    alt=""
                    style={{ width: "100%", height: "150px" }}
                    src={index.goodsImg}
                  />
                  <div
                    style={{
                      margin: "2px",
                      textAlign: "left",
                      overflow: "hidden",
                      lineHeight: "1.5rem",
                      height: "3rem"
                    }}
                  >
                    {index.goodsName}
                  </div>
                  <div>￥{index.resalePrice}</div>
                </a>
              );
            })}
            <WhiteSpace
              style={{ background: "#f5f5f9", clear: "both" }}
              size="lg"
            />
          </div>
        </PullToRefresh>
        <Foot />
      </div>
    );
  }
}

export default Page;
