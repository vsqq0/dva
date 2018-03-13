import React, { Component } from "react";
import { Toast, Steps, WingBlank, WhiteSpace } from "antd-mobile";
import Head from "../../components/indexHead.js";
import Help from "../../utils/help.js";
import _ from 'lodash';
const Step = Steps.Step;


class LogisticsWrapper extends Component {
  state = {
    logisticsData: [],
    expressCode: "",
    company:"",
    aa:[],
    success:false
  };

  async componentDidMount() {
    let data = await Help.get("getLogistics", { orderId: Help.hashUrl('orderId') });
    if (data.message === '11001') {
      this.setState({
        logisticsData: _.dropRight(data.data.traces.split("#")),
        expressCode: data.data.expressCode,
        company: data.data.company,
        success: true,
      });
    }
  }
  render() {
    return <div style={{ background: "white" }}>
        <Head title={"物流查询"} />
        <WingBlank size="lg">
          {this.state.success ? <div>
              <div style={{ lineHeight: "2.5rem" }}>
                <div>物流公司：{this.state.company}</div>
                <div style={{ borderBottom: "solid #c4d2ff 1px" }}>
                  物流单号：{this.state.expressCode}
                </div>
                <div>物流信息：</div>
              </div>
              <WhiteSpace />
              <Steps size="lg" current={this.state.logisticsData.length - 1}>
                {this.state.logisticsData.map((value, i) => {
                  return <Step title={value.split("=")[0]} description={value.split("=")[1]} />;
                })}
              </Steps>
            </div> : <div style={{ color: "gray", padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "5rem" }} className="iconfont">
                &#xe61c;
              </div>
              <div>暂无物流信息</div>
            </div>}
        </WingBlank>
      </div>;
  }
}
// const Logistics = createForm()(LogisticsWrapper);
// export default Logistics;
export default LogisticsWrapper;
