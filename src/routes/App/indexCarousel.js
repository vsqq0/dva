import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Card, Carousel, WingBlank, Flex, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

class IndexCarousel extends Component {

    state = {
      data: ['', '', ''],
      carousel: [],
      selectedIndex:0,
    }

    componentDidMount() {
      setTimeout(() => {
        this.getPointList();
      }, 100);
    }

    getPointList=()=>{
      let _this = this;
      $.ajax({
        type:"GET",
        url:"getPointList",
        dataType:"json",
        async: false,
        error: function(request) {
            return false;
        },
        success: function(json) {
          for(var i in json.data){
            for(var j in json.data[i]){
              if(json.data[i][j][0]!==undefined){
                //大轮播
                _this.state.carousel.push({supplierId: json.data[i][j][0].supplierId, pic: json.data[i][j][0].carousel});
              }
            }
          }
        }
      });
      _this.setState({a:""});
    }

  render() {

    return (
      <div>
        <Carousel
          style={{height:'140px',background:"white",margin:'0px !important'}}
          autoplay={true}
          infinite={true}
          selectedIndex={this.state.selectedIndex}
          swipeSpeed={35}
        >
        {
          this.state.carousel.map(( ii ) => {
            return (
              <a href={"#/flagship/supplierId="+ii.supplierId} key={ii} >
                <img
                  style={{width:'100%',height:'140px'}}
                  src={ii.pic}
                  alt=""
                  onLoad={() => {
                    // fire window resize event to change height
                    // window.dispatchEvent(new Event('resize'));
                    // this.setState({
                    //   initialHeight: null,
                    // });
                  }}
                />
              </a>
            )
          })
        }
        </Carousel>
      </div>
    );
  }
}

export default IndexCarousel;
