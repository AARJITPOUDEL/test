import React, { Component } from "react";
import { render } from "react-dom";
import "./App.css";
import { Resizable } from "re-resizable";
import Draggable from "react-draggable";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      rotation: 0,
    };
  }

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleRotationChange = (event) => {
    this.setState({
      rotation: parseInt(event.target.value),
    });
  };

  render() {
    const { image, rotation } = this.state;
    return (
      <div>
        <input type="file" accept="image/*" onChange={this.handleImageUpload} />
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={rotation}
          onChange={this.handleRotationChange}
        />
        <Draggable>
          <Resizable
            defaultSize={{
              width: 200,
              height: 360,
            }}
            style={{
              position: "relative",
              background: image ? `url(${image})` : "",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: `rotate(${rotation}deg)`,
            }}
            lockAspectRatio={true}
          >
            <div></div>
          </Resizable>
        </Draggable>
      </div>
    );
  }
}

render(<App />, document.querySelector("#root"));
