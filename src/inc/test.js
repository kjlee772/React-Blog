import React, { Component } from 'react';
import querystring from 'query-string';

class test extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const qry = querystring.parse(this.props.location.search);

    return (
      <div>
        <h3> My name is {qry.name} </h3>
      </div>
    );
  }
}

export default test;