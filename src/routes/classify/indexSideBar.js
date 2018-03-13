import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import IndexCarousel from './indexCarousel.js';
import { Grid } from 'antd-mobile';
import $ from 'jquery';

class indexSideBar extends Component {
  state = {
    tabs: [],
    selectedIndex: 0,
    data: [],
    data2: []
  };
  componentWillMount() {
    let _this = this;
    $.ajax({
      type: "GET",
      url: "cate",
      dataType: "json",
      async: false,
      error: function(request) {
        return false;
      },
      success: function(json) {
        for (var i in json.data) {
          _this.state.tabs.push({
            title: json.data[i].name,
            sub: i,
            choose: false
          });
          var temp = json.data[i].data;
          _this.state.data[i] = temp;
        }
        _this.state.tabs[_this.state.selectedIndex].choose = true;
        _this.setState({
          data2: _this.state.data[0],
          selectedIndex: 0
        });
      }
    });
  }

  jump = id => {
    window.location.href = "#/classifyLookup/cateid=" + id;
  };

  choosetab = sub => {
    this.state.tabs[this.state.selectedIndex].choose = false;
    this.state.tabs[sub].choose = true;
    (this.state.selectedIndex = sub),
      this.setState({
        data2: this.state.data[sub]
      });
  };
  aa=()=>{
    debugger;
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
      <div onClick={this.aa.bind(this)}>dsa</div>
        <div style={{ display: "inline-block", float: "left", width: "33%" }}>
          {this.state.tabs.map((tabs, index) => {
            return (
              <div
                style={
                  tabs.choose == false
                    ? {
                        borderBottom: "1px solid black",
                        background: "white",
                        textAlign: "center",
                        fontSize: "0.1rem",
                        height: "3rem",
                        color: "black",
                        lineHeight: "3rem"
                      }
                    : {
                        borderBottom: "1px solid black",
                        textAlign: "center",
                        fontSize: "0.1rem",
                        height: "3rem",
                        lineHeight: "3rem",
                        color: "red"
                      }
                }
                onClick={this.choosetab.bind(this, tabs.sub)}
              >
                {tabs.title}
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "inline-block",
            background: "#e5e3e3",
            float: "left",
            width: "67%"
          }}
        >
          {this.state.data2.map((data2, index) => {
            return (
              <div>
                <div
                  style={{
                    borderTop: "1px solid black",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    width: "100%"
                  }}
                  onClick={this.jump.bind(this, data2.id)}
                >
                  <p>{data2.name}</p>
                </div>
                {data2.data.map((data3, index) => {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "33%",
                        textAlign: "center"
                      }}
                      onClick={this.jump.bind(this, data3.id)}
                    >
                      <p>
                        <img src={data3.icon} />
                      </p>
                      <span>{data3.name}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export default indexSideBar;