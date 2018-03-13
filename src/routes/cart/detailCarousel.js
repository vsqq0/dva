import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';


class DetailCarousel extends Component
{
  state = {
    data: ['', '', ''],
    carousel: [],
    initialHeight: 176,
  }

    componentDidMount() {
        this.setState({
            carousel:this.props.img,
        });
    }

    render() {

    return (
        <Carousel
          style={{background:"white",margin:'0px !important'}}
          className="my-carousel"
          autoplay={true}
          infinite={true}
          selectedIndex={0}
          swipeSpeed={35}

        >
        {
          this.state.carousel.map(( ii ) => {
            return (
                <img
                  style={{width:'100%',height:'50%'}}
                  src={ii.pic}
                  alt=""/>
            )
          })
        }
        </Carousel>
    );
  }
}

export default DetailCarousel;