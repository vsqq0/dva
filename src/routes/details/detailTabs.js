import React, { Component } from 'react';
import {Toast, Tabs, WhiteSpace,Badge,NavBar,Icon,Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import DetailCarousel from './detailCarousel.js';
import Head from "../../components/indexHead";
import H from "../../utils/help.js";
import $ from 'jquery';


//
//props 属性
//info={this.state.info} 商品info【数组】
//price={this.state.price} 商品价格
// desc={this.state.desc} 商品类型【数组】
// goods_desc={this.state.xiangqing}商品详情
//carousel={this.state.carousel} 轮播图图片【数组】
// supplierId={this.state.supplierId} 商家ID
//



class DetailTabs extends Component {

  state={
    ordernum:0,
  }
  messageReload=()=>{
    $.ajax({
      type:"get",
      url:"getMessage",
      data:"goodsId="+H.hashUrl("goodsid")+"&currentPage="+0,
      dataType:"json",
      async: false,
      error: function(request) {
        Toast.info("系统繁忙，请稍后再试!");
        return false;
      },
      success: function(data) {
        console.log(data)
      }
    });
  }

  componentDidMount() {
    this.messageReload();
    for(var i in this.props.desc)
    {
      this.state.ordernum=this.state.ordernum+this.props.desc[i].orderNum
    }
  }



  render() {
    const tabs = [
      { title: <Badge text={'3'}>First Tab</Badge> },
      { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
      { title: <Badge dot>Third Tab</Badge> },
    ];

    const tabs2 = [
      { title: '商品', sub: '1' },
      { title: '详情', sub: '2' },
      { title: '评价', sub: '3' },
    ];

    return <div style={{ width: "100%", height: "100%", position: "fixed" }}>
        <Head title={"商品详情"} />

        <Tabs tabs={tabs2} tabBarActiveTextColor="rgb(247, 255, 19)" tabBarInactiveTextColor="white" tabBarBackgroundColor={"rgb(230, 0, 18)"} tabBarUnderlineStyle={{ border: "1px #ff7e37 solid" }} initialPage={0} swipeable={true} prerenderingSiblingsNumber={false} tabBarTextStyle={{ fontSize: "13px" }} onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }} onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}>
          <div style={{ display: "display", alignItems: "center", justifyContent: "center", height: "80%", backgroundColor: "#f4f4f4" }}>
            <DetailCarousel img={this.props.carousel} />

            <div>
              <span id="title" style={{ fontSize: "1.6rem" }}>
                {this.props.info.goodsName}
              </span>
            </div>

            <div>
              <span style={{ color: "red", fontSize: "2rem", padding: "0.3rem" }} id="price">
                ￥{this.props.price}
              </span>
            </div>

            <div style={{ color: "#515151" }}>
              <div style={{ float: "left", width: "33%", textAlign: "left", padding: "0.3rem" }} id="free">
                快递费:0.00
              </div>
              <div style={{ float: "left", width: "33%", textAlign: "center", padding: "0.3rem" }} id="xiaoliang">
                销量:{this.state.ordernum}笔
              </div>
              <div style={{ float: "left", width: "34%", textAlign: "right", padding: "0.3rem" }} id="adress">
                浙江温州
              </div>
            </div>
            <div style={{ fontSize: 20, backgroundColor: "white", clear: "both", padding: "0.3rem" }}>
              <WhiteSpace size="lg" />正品保证·七天兑换·极速退款
              <WhiteSpace size="lg" />
            </div>
            <WhiteSpace size="lg" />

            <div style={{ backgroundColor: "white", padding: "0.3rem" }} onClick={() => {
                this.props.footopen();
              }}>
              <WhiteSpace size="lg" />
              <span
                style={{ float: "left", textAlign: "left", width: "50%" }}
              >
                选择{this.props.desc[0].goodsDesc}
              </span>
              <span style={{ float: "left", textAlign: "right", width: "50%" }}>
                <Icon type="ellipsis" />
              </span>
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
            </div>

            <WhiteSpace size="lg" />
            <div style={{ backgroundColor: "white" }}>
              <WhiteSpace />
              <div style={{ color: "#A9A9A9" }}>商品评论()</div>
              <WhiteSpace />

              <div id="" style={{ padding: "0.3rem" }}>
                <img src="http://tongtai.oss-cn-shanghai.aliyuncs.com/product/fa41b8c725200b9f633934ab56ae8a85_1497672065000_TB2_R4en7qvpuFjSZFhXXaOgXXa_!!116499312.jpg?x-oss-process=image/resize,w_180,limit_0" style={{ float: "left", margin: "0.3rem" }} alt="头像" height="100%" width="10%" />
                <span width="80%">用户名</span>
                <WhiteSpace style={{ clear: "both" }} size="lg" />
                <div id="context">评论</div>
                <div>
                  <span id="time">2017-11-9</span>
                  <span id="goods" />
                </div>
              </div>

              <div style={{ textAlign: "center", clear: "both" }}>
                <Button inline>查看更多评价</Button>
                <WhiteSpace />
              </div>
            </div>
            <WhiteSpace size="lg" />

            <div style={{ backgroundColor: "white", padding: "0.3rem" }}>
              <div height="20%" style={{ backgroundColor: "white", height: "7%" }}>
                <img src={this.props.supplier[0].logo} style={{ float: "left" }} height="100%" width="10%" />
                <span width="90%">{this.props.supplier[0].name}</span>
              </div>

              <div style={{ clear: "both", textAlign: "center" }}>
                <WhiteSpace size="lg" />
                <Button inline style={{ marginRight: "4px" }}>
                  <div className="iconfont" style={{ color: "gray", width: "25px", height: "25px", float: "left" }}>
                    &#xe600;
                  </div> <a
                    href={"#/flagship/supplierId=" + this.props.supplierId}
                  >
                    全部商品
                  </a>
                </Button>
                <Button inline>
                  <div className="iconfont" style={{ color: "gray", width: "25px", height: "25px", float: "left" }}>
                    &#xe62b;
                  </div>
                  <a
                    href={"#/flagship/supplierId=" + this.props.supplierId}
                  >
                    进入店铺
                  </a>
                </Button>
                <WhiteSpace size="lg" />
              </div>
            </div>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
          </div>

          <div className="detaildesc">
            <div className="detaildesc" dangerouslySetInnerHTML={{ __html: this.props.goods_desc }} />

            <div style={{ height: "200px", width: "100%", textAlign: "center" }}>
              <WhiteSpace size="lg" />
              <hr style={{ border: "3 solid #ff0033", clear: "both" }} width="98%" SIZE="3" />
              <span style={{ color: "gray" }}>已到底部</span>
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "0.5rem", background: "white", padding: "1rem" }}>
              <div>
                <span className="iconfont">&#xe605;</span>
                <span>皮卡丘</span>
              </div>
              <div style={{ fontSize: "0.825rem", color: "#8c8c8c", paddingTop: "1rem", paddingBottom: "1rem" }}>
                2017
              </div>
              <div>详情</div>
            </div>
            <div style={{ marginBottom: "0.5rem", background: "white", padding: "1rem" }}>
              <div>
                <span className="iconfont">&#xe605;</span>
                <span>皮卡丘</span>
              </div>
              <div style={{ fontSize: "0.825rem", color: "#8c8c8c", paddingTop: "1rem", paddingBottom: "1rem" }}>
                2017
              </div>
              <div>详情</div>
            </div>
          </div>
        </Tabs>
      </div>;
  }
}

export default DetailTabs;