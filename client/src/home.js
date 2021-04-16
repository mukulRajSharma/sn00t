import React from "react";
import "./App.css";
import "devextreme/dist/css/dx.material.orange.light.css";
import GridComponent from "./gridComponent";

class Port extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  render() {
    const { items } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <img
            src="https://i.ibb.co/RSk7Fzs/sn00t2-lanczos3.png"
            alt="sn00t2-lanczos3"
            border="0"
          />
        </div>
        <GridComponent />
      </div>
    );
  }
}

export default Port;
