import React from "react";

const ColorCircle = () => {
  return (
    <div>
      <select className="color-dropdown">
        <option value="101" data-color="#6d6d6d" selected="selected" />
        <option value="102" data-color="#60508E" />
        <option value="103" data-color="#66B8C6" />
        <option value="104" data-color="#F1C486" />
        <option value="105" data-color="#F6AE7F" />
        <option value="106" data-color="#F1876E" />
        <option value="107" data-color="#91BD70" />
        <option value="108" data-color="#CE84AD" />
        <option value="109" data-color="#FFE070" />
        <option value="110" data-color="#99D1E9" />
      </select>
      <div className="dropdown dropdown-color-selector">
        <a
          data-toggle="dropdown"
          href="#"
          aria-expanded="false"
        >
          <span
            className="color-code-circle"
            style={{ backgroundColor: "#6d6d6d" }}
          />
        </a>
        <ul className="dropdown-menu dropdown-caret">
          <li>
            <a
              className="color-btn selected"
              href="#"
              data-color="#6d6d6d"
              data-value="101"
              title="grey"
              style={{ backgroundColor: "#6d6d6d" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#60508E"
              data-value="102"
              title="darklavender"
              style={{ backgroundColor: "#60508E" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#66B8C6"
              data-value="103"
              title="moonstoneblue"
              style={{ backgroundColor: "#66B8C6" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#F1C486"
              data-value="104"
              title="palegold"
              style={{ backgroundColor: "#F1C486" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#F6AE7F"
              data-value="105"
              title="verylighttangelo"
              style={{ backgroundColor: "#F6AE7F" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#F1876E"
              data-value="106"
              title="salmon"
              style={{ backgroundColor: "#F1876E" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#91BD70"
              data-value="107"
              title="pistachio"
              style={{ backgroundColor: "#91BD70" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#CE84AD"
              data-value="108"
              title="middlepurple"
              style={{ backgroundColor: "#CE84AD" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#FFE070"
              data-value="109"
              title="mellowyellow"
              style={{ backgroundColor: "#FFE070" }}
            />
          </li>
          <li>
            <a
              className="color-btn"
              href="#"
              data-color="#99D1E9"
              data-value="110"
              title="lightcornflowerblue"
              style={{ backgroundColor: "#99D1E9" }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ColorCircle;
