import React from "react";

class D3Wrapper extends React.Component {
  componentDidMount() {
    // d3.init(this.el)
  }
  componentWillUnmount() {
    // d3.destroy(this.el);
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <div ref={el => (this.el = el)} />;
  }
}

export default D3Wrapper;
