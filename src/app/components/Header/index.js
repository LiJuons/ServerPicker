import React from 'react';
import { Link } from 'react-router-dom';
import pickerIcon from '../../../assets/picker.ico';
import './Header.css';

const Header = (props) => (
  <div className="navBar">

    <div className="navBar-title">
      <Link to="/">
        Server Picker
        <img src={pickerIcon} alt="Picker icon"
          style={{ width: 30, "marginLeft": 10, "marginBottom": -5 }}
        />
      </Link>
    </div>

    <div className="navBar-item-list">

      <div className="navBar-item">
        <Link to="/">
          Servers
        </Link>
      </div>

      <div className="navBar-item">
        <Link to="/">
          Search
        </Link>
      </div>

    </div>

  </div>
);

export default Header;
