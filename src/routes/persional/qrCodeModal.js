import React, { Component } from "react";
import {
  Modal,
} from "antd-mobile";
import PropTypes from "prop-types";
import svgpath from "svgpath";
import qr from "qr-image";

export default class QrCodeModal extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,//二维码
    fontSize: PropTypes.string,//二维码大小
  };
  state = {
    modal1: false
  }
  getPath = e => {
    let qrPath = e;
    const originPath = qr.svgObject(qrPath).path; //e.target.value 为具体值
    // const scaledPath = originPath; //长和宽
    const scaledPath = svgpath(originPath)
      .scale(4, 4)
      .toString(); //长和宽
    return scaledPath;
  };
  onClose = key => () => {
    this.setState({
      [key]: false
    });
  }
  render() {
    return <div>
      <Modal style={{ color: "red" }} visible={this.state.modal1} transparent maskClosable={false} onClose={this.onClose("modal1")} title="推广二维码" footer={[{ text: "关闭", onPress: () => {
              console.log("ok");
              this.onClose("modal1")();
            } }]} wrapProps={{ onTouchStart: this.onWrapTouchStart }}>
        <div>
          <div>
            <svg style={{ marginLeft: "20%", textAlign: "center", width: "80%" }}>
              <path style={{ textAnchor: "middle" }} d={this.getPath(this.props.path)} />
            </svg>
          </div>
        </div>
      </Modal>
      <div onClick={() => {
          this.setState({ modal1: true });
        }} style={{ color:"white", fontSize: this.props.fontSize||"5rem" }} className="iconfont">
        &#xe617;
      </div>
    </div>;
  }
}
