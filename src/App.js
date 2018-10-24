import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Adopt Me!</h1>
        <Pet name="Nicky" animal="Dog" breed="Mixed" />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
