import React from "react";
import $ from 'jquery';

class ColorCircle extends React.Component {
  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.state = {
      color: 'rgb(109, 109, 109)'
    }
  }

  getColor(event) {
    this.setState({
      color: event.target.style.backgroundColor
    })
    this.props.saveColor(event.target.style.backgroundColor);
  }

  render() {
        // <select className="color-dropdown" value={this.state.currentColor} onChange={this.getColor.bind(this)}>
        //   <option value="101" data-color="#6d6d6d" />
        //   <option value="102" data-color="#60508E" />
        //   <option value="103" data-color="#66B8C6" />
        //   <option value="104" data-color="#F1C486" />
        //   <option value="105" data-color="#F6AE7F" />
        //   <option value="106" data-color="#F1876E" />
        //   <option value="107" data-color="#91BD70" />
        //   <option value="108" data-color="#CE84AD" />
        //   <option value="109" data-color="#FFE070" />
        //   <option value="110" data-color="#99D1E9" />
        // </select>

    let circleColor = {
      backgroundColor: this.state.color
    }
    return (
      <div>
        <div className="dropdown dropdown-color-selector">
          <a
            data-toggle="dropdown"
            href="#"
            aria-expanded="false"
          >
            <span
              className="color-code-circle"
              style={circleColor}
            />
          </a>
          <ul className="dropdown-menu dropdown-caret">
            <li>
              <a
                className="color-btn selected"
                href="#"
                title="grey"
                style={{ backgroundColor: "#6d6d6d" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="darklavender"
                style={{ backgroundColor: "#60508E" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="moonstoneblue"
                style={{ backgroundColor: "#66B8C6" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="palegold"
                style={{ backgroundColor: "#F1C486" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="verylighttangelo"
                style={{ backgroundColor: "#F6AE7F" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="salmon"
                style={{ backgroundColor: "#F1876E" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="pistachio"
                style={{ backgroundColor: "#91BD70" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="middlepurple"
                style={{ backgroundColor: "#CE84AD" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="mellowyellow"
                style={{ backgroundColor: "#FFE070" }}
                onClick={this.getColor}
              />
            </li>
            <li>
              <a
                className="color-btn"
                href="#"
                title="lightcornflowerblue"
                style={{ backgroundColor: "#99D1E9" }}
                onClick={this.getColor}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default ColorCircle;
