import React, { Component } from "react";

import "./Divider.css";

class Divider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <hr className="divider"></hr>
  }
}

export default Divider;
