import React, { Component } from "react";
import ReactDOM from "react-dom";
import { PullToRefresh, Toast, Flex, Icon, WhiteSpace } from "antd-mobile";
import Head from "../../components/indexHead.js";
import IndexCarousel from "./indexCarousel.js";
import Foot from "../../components/foot.js";
import Help from "../../utils/help.js";
import "./overrider.less"

class App extends Component {
  state = {
    data: ["", "", ""],
    initialHeight: 176,
    list: [],
    cate: [],
    hotActive: [],
    refreshing: false
    // height: document.documentElement.clientHeight
  };

  async componentDidMount() {

    Toast.loading("正在拼命加载中", 10);
    let hotActive = await Help.get("searchGoods!index?type=0");
    this.setState({ hotActive: hotActive.data });
    let json = await Help.get("cate!first");
    this.setState({ cate: json.data });
    var catIdList = "";
    for (var i in json.data) {
      catIdList += json.data[i].id + ",";
    }
    let catIdList1 = catIdList.substring(0, catIdList.length - 1);
    let catId = catIdList1.split(",");
    for (var j in catId) {
      let data = await Help.get("searchGoods!index?type=1&cateId=" + catId[j]);
      this.state.list.push(data.data[0].product);
    }
    Toast.hide();
  }

  jump = id => {
    window.location.href = "#/details/goodsid=" + id;
  };

  render() {
    const cartStyle = { fontSize: "0.8rem", color: "rgb(102, 102, 102)" }; //分类文字样式
    return (
      <div className="App">
        <Head
          rightContent1={
            <a
              key="0"
              style={{ color: "white", width: "5rem", marginRight: 10 }}
            >
              进入游戏
            </a>
          }
          icon={
            <a
              href="#/search"
              style={{
                borderRadius: 5,
                background: "white",
                width: "160px",
                height: "30px"
              }}
            >
              <Icon
                key="0"
                type="search"
                style={{ marginTop: 4, color: "gray", marginLeft: "16px" }}
              />
            </a>
          }
        />
        <div style={{ clear: "both" }}>
          <PullToRefresh
            distanceToRefresh={40} // ref={el => (this.ptr = el)}
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
            <IndexCarousel />
            <Flex
              style={{
                display: "none",
                background: "white",
                paddingBottom: "0.5rem"
              }}
            >
              <Flex.Item>
                <a href="#/classify" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "gold",
                      marginBottom: "0.25rem",
                      fontSize: "2rem"
                    }}
                    className="iconfont"
                  >
                    &#xe61b;
                  </div>
                  <div style={cartStyle}>分类</div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a href="#/supplierCharts" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "red",
                      marginBottom: "0.25rem",
                      fontSize: "2rem"
                    }}
                    className="iconfont"
                  >
                    &#xe775;
                  </div>
                  <div style={cartStyle}>排行榜</div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "green",
                      marginBottom: "0.25rem",
                      fontSize: "2rem"
                    }}
                    className="iconfont"
                  >
                    &#xe65d;
                  </div>
                  <div style={cartStyle}>个人推荐</div>
                </a>
              </Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <div style={{ color: "red", textAlign: "center" }}>热门活动</div>
            <WhiteSpace size="lg" />
            <Flex>
              {this.state.hotActive.map((value, index) => {
                return (
                  <Flex.Item key={index}>
                    <a href={"#/details/goodsid=" + value.id}>
                      <img style={{ width: "100%" }} src={value.name} alt="" />
                    </a>
                  </Flex.Item>
                );
              })}
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1001"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    女装/内衣
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片1.png"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片2.png"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1002"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    男装/运动
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片3.png"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片4.png"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1003"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    鞋子/箱包
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片5.png"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片6.png"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1009"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    食品/茶酒
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片11.png"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片12.png"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1010"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    生鲜/干货
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片9.png"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片10.png"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1017"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    腕表/饰品
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片7.png"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/图片8.png"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1018"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    酒店/旅游
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/jiudianlvyou.jpg"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/jiudianlvyou1.jpg"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1019"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    母婴/玩具
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/muyinwanjv.jpg"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/muyinwanjv1.jpg"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1020"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    家居建材
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/jiajvjiancai.jpg"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/jiajvjiancai1.jpg"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
              <Flex.Item>
                <a
                  style={{ background: "white", display: "block" }}
                  href="#/classifyLookup/cateid=1021"
                >
                  <div style={{ color: "#4a4a4a", margin: 5, paddingLeft: 10 }}>
                    床上用品
                  </div>
                  <div>
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/chuangshangyongpin.jpg"
                      alt=""
                    />
                    <img
                      style={{ width: "50%" }}
                      src="http://tongtai.oss-cn-shanghai.aliyuncs.com/fenlei/chuangshangyongpin1.jpg"
                      alt=""
                    />
                  </div>
                </a>
              </Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            {this.state.list.map((index, elem) => {
              if (index.length > 0) {
                return (
                  <div
                    key={elem}
                    style={{ background: "white", clear: "both" }}
                  >
                    <div style={{ lineHeight: "2rem", textAlign: "center" }}>
                      <span>-</span>
                      <span style={{ margin: "0.5rem" }}>
                        {this.state.cate[elem].name || ""}
                      </span>
                      <span>-</span>
                    </div>
                    {index.map((goods, i) => {
                      return <a key={i} style={{ display: "block", margin: "1%", background: "white", float: "left", width: "48%" }} onClick={this.jump.bind(this, goods.id)}>
                          <img alt="" style={{ width: "100%", height: "150px" }} src={goods.img} />
                          <div style={{ margin: "2px", textAlign: "left", overflow: "hidden", lineHeight: "1.5rem", height: "3rem" }}>
                            {goods.name}
                          </div>
                          <div>￥{goods.price}</div>
                        </a>;
                    })}
                    <WhiteSpace
                      style={{ background: "#f5f5f9", clear: "both" }}
                      size="lg"
                    />
                  </div>
                );
              } else {
                return "";
              }
            })}
          </PullToRefresh>
        </div>
        <Foot />
      </div>
    );
  }
}

export default App;
