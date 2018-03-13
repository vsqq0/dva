import React, { Component } from 'react';

export default class DetailTag extends Component {

state={

}

render() {
    return(
        <div
        style={this.props.choose===false ? {border:"1px solid gray",padding:"3px",float:"left",margin:"5px"}:
        {border:"1px solid blue",color:"blue", float:"left",margin:"5px",padding:"3px"}}
        >{this.props.textcontent}</div>
        )
}

}
