import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Foot from '../../components/foot.js';
import Head from '../../components/indexHead.js';
import SideBar from './indexSideBar.js';
import IndexCarousel from './indexCarousel.js';
import IndexTabs from './indexTabs.js';

class Classify extends Component {
  render() {
    return (
      <div className="App">
        <Head></Head>
        <SideBar></SideBar>
        <div style={{width:"100%",height:"2rem"}}></div>
        <Foot></Foot>
      </div>
    );
  }
}

export default Classify;
