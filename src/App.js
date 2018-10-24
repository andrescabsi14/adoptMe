import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

// Remove key access
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    petfinder.pet
      .find({
        output: "full",
        location: "Ann Arbor, MI"
      })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets
        });
      });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Adopt Me!</h1>
        <pre>
          <code>{JSON.stringify(this.state, null, 4)}</code>
        </pre>
        {/* <Pet name="Nicky" animal="Dog" breed="Mixed" /> */}
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
