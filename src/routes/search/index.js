import React, { Component } from 'react';
import { SearchBar,Button, Checkbox, Toast, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import { createForm } from 'rc-form';
class SearchWrapper extends Component {

  state = {

  }

  componentDidMount() {
  }



  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <div onClick={()=>{window.history.back()}} style={{float: 'left',lineHeight: '3.25rem',width: '3rem',textAlign: 'center',fontSize: '1.5rem',marginTop: '-0.5rem'}} className="iconfont">&#xe631;</div><SearchBar placeholder="Search" maxLength={8} />
      </div>
    );
  }
}
const Search = createForm()(SearchWrapper);
export default Search;
